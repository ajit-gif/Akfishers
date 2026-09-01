<?php
declare(strict_types=1);
require __DIR__ . '/../_bootstrap.php';

require_method('GET', 'POST');
$admin = require_admin($db);

$STATUSES = ['confirmed', 'packed', 'out', 'delivered', 'cancelled'];

if (method() === 'GET') {
    $status = $_GET['status'] ?? '';
    $sql = 'SELECT * FROM orders';
    $args = [];
    if (in_array($status, $STATUSES, true)) { $sql .= ' WHERE status = ?'; $args[] = $status; }
    $sql .= ' ORDER BY id DESC LIMIT 300';
    $stmt = $db->prepare($sql);
    $stmt->execute($args);

    $rows = array_map(function ($r) {
        return [
            'id'            => $r['public_id'],
            'placedOn'      => date('j M Y, g:i A', strtotime($r['created_at'])),
            'name'          => $r['cust_name'],
            'phone'         => phone_display($r['cust_phone']),
            'email'         => $r['cust_email'],
            'address'       => $r['address_text'],
            'pincode'       => $r['pincode'],
            'items'         => json_decode($r['items_json'], true) ?: [],
            'subtotal'      => (int)$r['subtotal'],
            'discount'      => (int)$r['discount'],
            'coupon'        => $r['coupon'],
            'deliveryCharge'=> (int)$r['delivery_charge'],
            'total'         => (int)$r['total'],
            'payment'       => $r['payment'],
            'deliveryDate'  => $r['delivery_date'],
            'slot'          => $r['delivery_slot'],
            'status'        => $r['status'],
            'registered'    => $r['user_id'] !== null,
        ];
    }, $stmt->fetchAll());

    ok(['orders' => $rows]);
}

/* ---- POST { op:"status", id, status } ---- */
require_same_origin();
$in = body_json();
if (($in['op'] ?? '') !== 'status') fail(400, 'bad_request', 'Unknown operation.');

$id  = strtoupper(str_field($in['id'] ?? '', 20));
$new = str_field($in['status'] ?? '', 20);
if (!preg_match('/^AKF-\d{6}$/', $id))       fail(400, 'validation', 'Invalid order id.');
if (!in_array($new, $STATUSES, true))        fail(400, 'validation', 'Invalid status.');

$stmt = $db->prepare('UPDATE orders SET status = ?, updated_at = ? WHERE public_id = ?');
$stmt->execute([$new, gmdate('Y-m-d H:i:s'), $id]);
if ($stmt->rowCount() === 0) {
    // maybe the status was already that value; verify the order exists
    $chk = $db->prepare('SELECT 1 FROM orders WHERE public_id = ?');
    $chk->execute([$id]);
    if (!$chk->fetchColumn()) fail(404, 'not_found', 'Order not found.');
}
error_log('[akf-admin] ' . ($admin['phone'] ?? '?') . ' set ' . $id . ' -> ' . $new);
ok(['id' => $id, 'status' => $new]);
