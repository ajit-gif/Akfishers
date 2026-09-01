<?php
declare(strict_types=1);
require __DIR__ . '/../_bootstrap.php';

require_method('GET');
$u = current_user($db);
$isAdmin = $u && ($u['role'] ?? 'customer') === 'admin';
ok(['admin' => $isAdmin ? ['name' => $u['full_name'] ?: 'Admin'] : null]);
