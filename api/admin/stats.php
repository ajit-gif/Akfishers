<?php
declare(strict_types=1);
require __DIR__ . '/../_bootstrap.php';

require_method('GET');
require_admin($db);

$one = fn(string $sql, array $a = []) => (function () use ($db, $sql, $a) {
    $s = $db->prepare($sql); $s->execute($a); return $s->fetchColumn();
})();

$activeStatuses = "('confirmed','packed','out','delivered')";

ok(['stats' => [
    'ordersTotal'  => (int)$one('SELECT COUNT(*) FROM orders'),
    'ordersOpen'   => (int)$one("SELECT COUNT(*) FROM orders WHERE status IN ('confirmed','packed','out')"),
    'revenue'      => (int)$one("SELECT COALESCE(SUM(total),0) FROM orders WHERE status IN $activeStatuses"),
    'customers'    => (int)$one('SELECT COUNT(DISTINCT cust_phone) FROM orders'),
    'registered'   => (int)$one("SELECT COUNT(*) FROM users"),
    'last7'        => (int)$one('SELECT COUNT(*) FROM orders WHERE created_at >= ?', [gmdate('Y-m-d H:i:s', time() - 7 * 86400)]),
]]);
