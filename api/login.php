<?php
declare(strict_types=1);
require __DIR__ . '/_bootstrap.php';

require_method('POST');
require_same_origin();
rate_limit($db, 'login', $CFG['limits']['login']['max'], $CFG['limits']['login']['window']);

$in    = body_json();
$idRaw = str_field($in['identifier'] ?? ($in['phone'] ?? ($in['email'] ?? '')), 190);
$pass  = is_string($in['password'] ?? null) ? $in['password'] : '';

if ($idRaw === '' || $pass === '') {
    fail(400, 'validation', 'Enter your mobile number / email and password.');
}

$phone = normalize_phone($idRaw);
$email = strpos($idRaw, '@') !== false ? normalize_email($idRaw) : null;

$genericFail = function () use ($db, $phone, $email) {
    record_attempt($db, 'login', $phone ?: ($email ?: null), false);
    // Deliberately vague — do not reveal whether the account exists.
    fail(401, 'invalid_credentials', 'Incorrect mobile number / email or password.');
};

if ($phone === null && !$email) $genericFail();

$stmt = $db->prepare(
    'SELECT u.id, u.public_id, u.phone, u.email, u.password_hash, u.status,
            u.failed_logins, u.locked_until, COALESCE(p.full_name, "") AS full_name
       FROM users u
       LEFT JOIN user_profiles p ON p.user_id = u.id
      WHERE ' . ($phone !== null ? 'u.phone = ?' : 'u.email = ?') . ' LIMIT 1'
);
$stmt->execute([$phone !== null ? $phone : $email]);
$u = $stmt->fetch();

if (!$u || $u['status'] !== 'active') {
    // Still burn a bcrypt cycle to keep timing uniform.
    password_verify($pass, '$2y$10$0000000000000000000000000000000000000000000000000000O');
    $genericFail();
}

if ($u['locked_until'] !== null && strtotime($u['locked_until']) > time()) {
    record_attempt($db, 'login', $u['phone'], false);
    header('Retry-After: ' . max(1, strtotime($u['locked_until']) - time()));
    fail(429, 'account_locked', 'Too many failed attempts. Try again in a few minutes.');
}

if (!password_verify($pass, $u['password_hash'])) {
    $fails = (int)$u['failed_logins'] + 1;
    $lock  = $CFG['lockout'];
    if ($fails >= (int)$lock['threshold']) {
        $db->prepare('UPDATE users SET failed_logins = ?, locked_until = ? WHERE id = ?')
           ->execute([$fails, gmdate('Y-m-d H:i:s', time() + (int)$lock['minutes'] * 60), $u['id']]);
    } else {
        $db->prepare('UPDATE users SET failed_logins = ? WHERE id = ?')->execute([$fails, $u['id']]);
    }
    $genericFail();
}

/* success */
if ((int)$u['failed_logins'] !== 0 || $u['locked_until'] !== null) {
    $db->prepare('UPDATE users SET failed_logins = 0, locked_until = NULL WHERE id = ?')->execute([$u['id']]);
}
if (password_needs_rehash($u['password_hash'], PASSWORD_DEFAULT)) {
    $db->prepare('UPDATE users SET password_hash = ? WHERE id = ?')
       ->execute([password_hash($pass, PASSWORD_DEFAULT), $u['id']]);
}

record_attempt($db, 'login', $u['phone'], true);
issue_session($db, (int)$u['id']);

ok(['user' => user_public($u)]);
