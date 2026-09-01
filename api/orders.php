<?php
declare(strict_types=1);
require __DIR__ . '/_bootstrap.php';

require_method('GET', 'POST');

$SLOTS = ['7 AM – 11 AM', '11 AM – 3 PM', '3 PM – 7 PM', '7 PM – 10 PM'];

function order_row_public(array $r, bool $withToken = false): array {
    $o = [
        'id'            => $r['public_id'],
        'status'        => $r['status'],
        'date'          => date('j M Y', strtotime($r['created_at'])),
        'deliveryDate'  => $r['delivery_date'],
        'slot'          => $r['delivery_slot'],
        'payment'       => $r['payment'],
        'address'       => $r['address_text'],
        'subtotal'      => (int)$r['subtotal'],
        'discount'      => (int)$r['discount'],
        'coupon'        => $r['coupon'],
        'deliveryCharge'=> (int)$r['delivery_charge'],
        'total'         => (int)$r['total'],
        'items'         => json_decode($r['items_json'], true) ?: [],
    ];
    if ($withToken) $o['trackToken'] = $r['track_token'];
    return $o;
}

/* ================= GET  — this user's orders ================= */
if (method() === 'GET') {
    $u = require_user($db);
    $stmt = $db->prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC LIMIT 100');
    $stmt->execute([(int)$u['id']]);
    ok(['orders' => array_map(fn($r) => order_row_public($r), $stmt->fetchAll())]);
}

/* ================= POST  — place an order (guest OR logged in) ================= */
require_same_origin();
rate_limit($db, 'order', 12, 3600);
$in = body_json();

$cat  = load_catalog();
$prod = $cat['products'];

/* -- customer -- */
$name  = str_field($in['name'] ?? '', 120);
$phone = normalize_phone($in['mobile'] ?? ($in['phone'] ?? ''));
$email = normalize_email($in['email'] ?? '');
$flat     = str_field($in['flat'] ?? '', 120);
$building = str_field($in['building'] ?? '', 160);
$area     = str_field($in['area'] ?? '', 160);
$pin      = preg_replace('/\D+/', '', (string)($in['pincode'] ?? ''));
$slot     = str_field($in['slot'] ?? '', 40);
$date     = str_field($in['deliveryDate'] ?? '', 10);
$pay      = ($in['payment'] ?? '') === 'cod' ? 'Cash On Delivery' : 'Online Payment';
$couponIn = strtoupper(str_field($in['coupon'] ?? '', 32));

$errors = [];
if (mb_strlen($name) < 2)                       $errors['name']   = 'Enter your full name.';
if ($phone === null)                            $errors['mobile'] = 'Enter a valid 10-digit mobile number.';
if ($email === false)                           $errors['email']  = 'Enter a valid email address.';
if ($flat === '' || $building === '' || $area === '') $errors['address'] = 'Enter your full delivery address.';
$zone = delivery_zone((string)$pin);
if (!preg_match('/^\d{6}$/', (string)$pin))      $errors['pincode'] = 'Enter a valid 6-digit pincode.';
elseif (!$zone)                                  $errors['pincode'] = 'Sorry, we don\'t deliver to this pincode yet.';
if (!in_array($slot, $SLOTS, true))             $errors['slot']   = 'Choose a delivery slot.';
if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
    $errors['deliveryDate'] = 'Choose a delivery date.';
} else {
    // Sanity bound only — the checkout UI enforces the "1 day in advance" rule
    // in the customer's own timezone; the server just rejects nonsense dates.
    $ts    = strtotime($date . ' 12:00:00 UTC');
    $today = strtotime('today 00:00:00 UTC');
    if ($ts === false || $ts < $today || $ts > strtotime('+30 days', $today)) {
        $errors['deliveryDate'] = 'Please choose a delivery date within the next few weeks.';
    }
}

/* -- items: rebuild + reprice entirely from the server catalogue -- */
$rawItems = $in['items'] ?? [];
$items = [];
$subtotal = 0;
if (!is_array($rawItems) || count($rawItems) === 0 || count($rawItems) > 50) {
    $errors['items'] = 'Your cart is empty or invalid.';
} else {
    foreach ($rawItems as $it) {
        $id = is_array($it) ? (string)($it['id'] ?? '') : '';
        $p  = $prod[$id] ?? null;
        if (!$p) { $errors['items'] = 'One of the items is no longer available.'; break; }
        $w   = (int)($it['weight'] ?? 0);
        $cut = str_field($it['cut'] ?? '', 40);
        $qty = (int)($it['qty'] ?? 0);
        if (!in_array($w, $p['weights'], true))       { $errors['items'] = 'Invalid weight selected.'; break; }
        if ($p['cuts'] && !in_array($cut, $p['cuts'], true)) { $errors['items'] = 'Invalid cut selected.'; break; }
        if ($qty < 1 || $qty > 20)                    { $errors['items'] = 'Quantity must be between 1 and 20.'; break; }
        $line = (int) round($p['price'] * ($w / 1000) * $qty);
        $subtotal += $line;
        $items[] = ['id' => $id, 'name' => $p['name'], 'weight' => $w, 'cut' => $cut, 'qty' => $qty, 'price' => $line];
    }
}

if ($errors) {
    send(400, ['ok' => false, 'error' => 'validation', 'message' => 'Please check your order details.', 'fields' => $errors]);
}

/* -- coupon (re-validated server-side) -- */
$discount = 0; $couponCode = null;
if ($couponIn !== '' && isset($cat['coupons'][$couponIn])) {
    $c = $cat['coupons'][$couponIn];
    if ($subtotal >= (int)($c['min'] ?? 0)) {
        $discount = $c['type'] === 'percent'
            ? (int) round($subtotal * (int)$c['value'] / 100)
            : min((int)$c['value'], $subtotal);
        $couponCode = $couponIn;
    }
}

/* -- delivery + total (server-authoritative) -- */
$freeMin  = (int)($cat['free_delivery_min'] ?? 999);
$delivery = ($subtotal - $discount) >= $freeMin ? 0 : zone_charge($db, $zone['id']);
$total    = $subtotal - $discount + $delivery;

$addressText = $flat . ', ' . $building . ', ' . $area . ', ' . ($zone['name']) . ', ' . $pin;

$me = current_user($db);
$userId = $me ? (int)$me['id'] : null;

/* -- insert (retry on the tiny chance of a public_id collision) -- */
$token = bin2hex(random_bytes(16));
$now   = gmdate('Y-m-d H:i:s');
$pid   = null;
for ($try = 0; $try < 5; $try++) {
    $candidate = order_public_id();
    try {
        $db->prepare(
            'INSERT INTO orders
             (public_id, user_id, track_token, cust_name, cust_phone, cust_email, address_text, pincode,
              items_json, subtotal, discount, coupon, delivery_charge, total, payment,
              delivery_date, delivery_slot, status, created_at, updated_at)
             VALUES (?,?,?,?,?,?,?,?, ?,?,?,?,?,?,?, ?,?, \'confirmed\', ?, ?)'
        )->execute([
            $candidate, $userId, $token, $name, $phone, $email ?: null, $addressText, $pin,
            json_encode($items, JSON_UNESCAPED_UNICODE), $subtotal, $discount, $couponCode, $delivery, $total, $pay,
            $date, $slot, $now, $now,
        ]);
        $pid = $candidate;
        break;
    } catch (PDOException $e) {
        if ($e->getCode() === '23000' && $try < 4) continue;   // collision — try another id
        throw $e;
    }
}
if ($pid === null) fail(500, 'server_error', 'Could not place the order. Please try again.');

record_attempt($db, 'order', $phone, true);

ok(['order' => [
    'id'            => $pid,
    'trackToken'    => $token,
    'status'        => 'confirmed',
    'subtotal'      => $subtotal,
    'discount'      => $discount,
    'coupon'        => $couponCode,
    'deliveryCharge'=> $delivery,
    'total'         => $total,
    'deliveryDate'  => $date,
    'slot'          => $slot,
    'payment'       => $pay,
    'address'       => $addressText,
    'items'         => $items,
]]);
