<?php
declare(strict_types=1);
require __DIR__ . '/_bootstrap.php';

require_method('GET', 'POST');
$u = require_user($db);
$uid = (int)$u['id'];

function addr_public(array $r): array {
    return [
        'id'       => (int)$r['id'],
        'label'    => $r['label'],
        'flat'     => $r['flat'],
        'building' => $r['building'],
        'area'     => $r['area'],
        'city'     => $r['city'],
        'state'    => $r['state'],
        'pincode'  => $r['pincode'],
        'is_default' => (int)$r['is_default'] === 1,
    ];
}

function list_addresses(PDO $db, int $uid): array {
    $stmt = $db->prepare('SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC, id DESC');
    $stmt->execute([$uid]);
    return array_map('addr_public', $stmt->fetchAll());
}

if (method() === 'GET') {
    ok(['addresses' => list_addresses($db, $uid)]);
}

/* ---- POST: { op: "add" | "delete" | "default", ... } ---- */
require_same_origin();
$in = body_json();
$op = $in['op'] ?? 'add';

if ($op === 'delete' || $op === 'default') {
    $id = (int)($in['id'] ?? 0);
    if ($id <= 0) fail(400, 'validation', 'Missing address id.');
    if ($op === 'delete') {
        $db->prepare('DELETE FROM addresses WHERE id = ? AND user_id = ?')->execute([$id, $uid]);
    } else {
        $db->beginTransaction();
        $db->prepare('UPDATE addresses SET is_default = 0 WHERE user_id = ?')->execute([$uid]);
        $db->prepare('UPDATE addresses SET is_default = 1 WHERE id = ? AND user_id = ?')->execute([$id, $uid]);
        $db->commit();
    }
    ok(['addresses' => list_addresses($db, $uid)]);
}

// op = add
$label    = str_field($in['label'] ?? 'Home', 40) ?: 'Home';
$flat     = str_field($in['flat'] ?? '', 120);
$building = str_field($in['building'] ?? '', 160);
$area     = str_field($in['area'] ?? '', 160);
$pincode  = preg_replace('/\D+/', '', (string)($in['pincode'] ?? ''));

$errors = [];
if ($flat === '')     $errors['flat']     = 'Enter your flat / house number.';
if ($building === '') $errors['building'] = 'Enter your building / society.';
if ($area === '')     $errors['area']     = 'Enter your area / locality.';
if (!preg_match('/^\d{6}$/', (string)$pincode)) $errors['pincode'] = 'Enter a valid 6-digit pincode.';
elseif (!delivery_zone((string)$pincode))       $errors['pincode'] = 'We don\'t deliver to this pincode yet.';
if ($errors) send(400, ['ok' => false, 'error' => 'validation', 'message' => 'Please fix the errors below.', 'fields' => $errors]);

// how many does this user already have?
$stmt = $db->prepare('SELECT COUNT(*) FROM addresses WHERE user_id = ?');
$stmt->execute([$uid]);
$existing = (int)$stmt->fetchColumn();
if ($existing >= 15) fail(409, 'limit', 'You have reached the maximum number of saved addresses.');
$isDefault = $existing === 0 ? 1 : 0;   // first one becomes the default

$db->prepare(
    'INSERT INTO addresses (user_id, label, flat, building, area, city, state, pincode, is_default, created_at)
     VALUES (?,?,?,?,?,\'Mumbai\',\'Maharashtra\',?,?,?)'
)->execute([$uid, $label, $flat, $building, $area, $pincode, $isDefault, gmdate('Y-m-d H:i:s')]);

ok(['addresses' => list_addresses($db, $uid)]);
