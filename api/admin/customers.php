<?php
declare(strict_types=1);
require __DIR__ . '/../_bootstrap.php';

require_method('GET');
require_admin($db);

/* Registered accounts, with their order activity. */
$sql = 'SELECT u.id, u.public_id, u.phone, u.email, u.role, u.status, u.created_at,
               COALESCE(p.full_name, "") AS full_name,
               (SELECT COUNT(*)               FROM orders o WHERE o.user_id = u.id) AS orders_count,
               (SELECT COALESCE(SUM(o.total),0) FROM orders o
                  WHERE o.user_id = u.id AND o.status IN ("confirmed","packed","out","delivered")) AS spent,
               (SELECT MAX(o.created_at)       FROM orders o WHERE o.user_id = u.id) AS last_order
          FROM users u
          LEFT JOIN user_profiles p ON p.user_id = u.id
         ORDER BY u.id DESC
         LIMIT 500';

$users = array_map(function ($r) {
    return [
        'id'         => $r['public_id'],
        'name'       => $r['full_name'] !== '' ? $r['full_name'] : '(no name)',
        'phone'      => phone_display((string)$r['phone']),
        'email'      => $r['email'],
        'role'       => $r['role'],
        'status'     => $r['status'],
        'joined'     => date('j M Y', strtotime($r['created_at'])),
        'orders'     => (int)$r['orders_count'],
        'spent'      => (int)$r['spent'],
        'lastOrder'  => $r['last_order'] ? date('j M Y', strtotime($r['last_order'])) : null,
    ];
}, $db->query($sql)->fetchAll());

/* Guest customers (orders with no account) — grouped by phone. */
$guests = array_map(function ($r) {
    return [
        'name'      => $r['cust_name'],
        'phone'     => phone_display((string)$r['cust_phone']),
        'email'     => $r['cust_email'],
        'orders'    => (int)$r['orders_count'],
        'spent'     => (int)$r['spent'],
        'lastOrder' => date('j M Y', strtotime($r['last_order'])),
    ];
}, $db->query(
    'SELECT cust_phone, MAX(cust_name) AS cust_name, MAX(cust_email) AS cust_email,
            COUNT(*) AS orders_count,
            SUM(CASE WHEN status IN ("confirmed","packed","out","delivered") THEN total ELSE 0 END) AS spent,
            MAX(created_at) AS last_order
       FROM orders
      WHERE user_id IS NULL
      GROUP BY cust_phone
      ORDER BY last_order DESC
      LIMIT 500'
)->fetchAll());

ok(['users' => $users, 'guests' => $guests]);
