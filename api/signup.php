<?php
declare(strict_types=1);
require __DIR__ . '/_bootstrap.php';

require_method('POST');
require_same_origin();
rate_limit($db, 'signup', $CFG['limits']['signup']['max'], $CFG['limits']['signup']['window']);

$in = body_json();

$name  = str_field($in['name'] ?? '', 120);
$phone = normalize_phone($in['phone'] ?? '');
$pass  = is_string($in['password'] ?? null) ? $in['password'] : '';
$email = normalize_email($in['email'] ?? '');

$errors = [];
if (mb_strlen($name) < 2)                    $errors['name']     = 'Enter your full name.';
if ($phone === null)                         $errors['phone']    = 'Enter a valid 10-digit Indian mobile number.';
if (strlen($pass) < 8)                       $errors['password'] = 'Password must be at least 8 characters.';
if (strlen($pass) > 200)                     $errors['password'] = 'Password is too long.';
if ($email === false)                        $errors['email']    = 'Enter a valid email address.';
if ($errors) {
    record_attempt($db, 'signup', $phone, false);
    send(400, ['ok' => false, 'error' => 'validation', 'message' => 'Please fix the errors below.', 'fields' => $errors]);
}

$hash = password_hash($pass, PASSWORD_DEFAULT);
$now  = gmdate('Y-m-d H:i:s');

try {
    $db->beginTransaction();

    $pid = new_public_id();
    $stmt = $db->prepare(
        'INSERT INTO users (public_id, phone, email, password_hash, status, created_at, updated_at)
         VALUES (?,?,?,?,\'active\',?,?)'
    );
    $stmt->execute([$pid, $phone, $email ?: null, $hash, $now, $now]);
    $userId = (int)$db->lastInsertId();

    $db->prepare('INSERT INTO user_profiles (user_id, full_name, created_at, updated_at) VALUES (?,?,?,?)')
       ->execute([$userId, $name, $now, $now]);

    $db->commit();
} catch (PDOException $e) {
    if ($db->inTransaction()) $db->rollBack();
    if ($e->getCode() === '23000') {
        // unique constraint — phone or email already registered.
        record_attempt($db, 'signup', $phone, false);
        $isEmail = $email && stripos($e->getMessage(), 'email') !== false;
        fail(409, 'account_exists', $isEmail
            ? 'That email is already registered. Try logging in instead.'
            : 'An account with that mobile number already exists. Please log in.');
    }
    throw $e;
}

record_attempt($db, 'signup', $phone, true);
issue_session($db, $userId);

ok(['user' => user_public([
    'public_id' => $pid, 'phone' => $phone, 'email' => $email ?: '', 'full_name' => $name,
])]);
