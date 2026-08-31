<?php
declare(strict_types=1);
require __DIR__ . '/_bootstrap.php';

require_method('POST');
require_same_origin();

$token = $_COOKIE[COOKIE_NAME] ?? '';
if (preg_match('/^[a-f0-9]{64}$/', $token)) {
    try {
        $db->prepare('DELETE FROM sessions WHERE token_hash = ?')->execute([hash('sha256', $token)]);
    } catch (Throwable $e) { error_log('[akf-api] logout: ' . $e->getMessage()); }
}
clear_session_cookie();
ok(['user' => null]);
