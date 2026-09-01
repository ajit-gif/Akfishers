<?php
declare(strict_types=1);
require __DIR__ . '/../_bootstrap.php';

require_method('GET', 'POST');
require_admin($db);

function zones(PDO $db): array {
    $rows = $db->query('SELECT zone_id, name, charge FROM delivery_zones ORDER BY charge, name')->fetchAll();
    return array_map(fn($r) => [
        'id' => $r['zone_id'], 'name' => $r['name'], 'charge' => (int)$r['charge'],
    ], $rows);
}

if (method() === 'GET') ok(['zones' => zones($db)]);

require_same_origin();
$in = body_json();
if (($in['op'] ?? '') !== 'charge') fail(400, 'bad_request', 'Unknown operation.');

$zid    = str_field($in['id'] ?? '', 24);
$charge = (int)($in['charge'] ?? -1);
if ($charge < 0 || $charge > 999) fail(400, 'validation', 'Charge must be between 0 and 999.');

$stmt = $db->prepare('UPDATE delivery_zones SET charge = ?, updated_at = ? WHERE zone_id = ?');
$stmt->execute([$charge, gmdate('Y-m-d H:i:s'), $zid]);
if ($stmt->rowCount() === 0) {
    $chk = $db->prepare('SELECT 1 FROM delivery_zones WHERE zone_id = ?');
    $chk->execute([$zid]);
    if (!$chk->fetchColumn()) fail(404, 'not_found', 'Zone not found.');
}
ok(['zones' => zones($db)]);
