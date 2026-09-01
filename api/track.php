<?php
declare(strict_types=1);
require __DIR__ . '/_bootstrap.php';

require_method('GET');
rate_limit($db, 'track', 30, 900);

$id    = strtoupper(trim((string)($_GET['id'] ?? '')));
$token = trim((string)($_GET['token'] ?? ''));
$phone = normalize_phone($_GET['phone'] ?? '');

if (!preg_match('/^AKF-\d{6}$/', $id)) fail(400, 'validation', 'Enter a valid order number.');

$stmt = $db->prepare('SELECT * FROM orders WHERE public_id = ? LIMIT 1');
$stmt->execute([$id]);
$o = $stmt->fetch();

/* Must prove ownership: correct track token OR the phone on the order.
   Constant-ish comparison; generic error either way (no order enumeration). */
$authorised = $o && (
    ($token !== '' && hash_equals((string)$o['track_token'], $token)) ||
    ($phone !== null && hash_equals((string)$o['cust_phone'], $phone))
);
if (!$authorised) fail(404, 'not_found', 'No order found with those details.');

$steps = ['confirmed' => 0, 'packed' => 1, 'out' => 2, 'delivered' => 3];
ok(['order' => [
    'id'           => $o['public_id'],
    'status'       => $o['status'],
    'step'         => $steps[$o['status']] ?? 0,
    'placedOn'     => date('j M Y', strtotime($o['created_at'])),
    'deliveryDate' => $o['delivery_date'],
    'slot'         => $o['delivery_slot'],
    'payment'      => $o['payment'],
    'total'        => (int)$o['total'],
    'items'        => json_decode($o['items_json'], true) ?: [],
]]);
