<?php
declare(strict_types=1);
require __DIR__ . '/_bootstrap.php';

require_method('GET');

$u = current_user($db);
ok(['user' => $u ? user_public($u) : null]);
