<?php
declare(strict_types=1);
require __DIR__ . '/_bootstrap.php';

require_method('GET', 'POST');
$u = require_user($db);

if (method() === 'GET') {
    ok(['user' => user_public($u)]);
}

/* ---- POST: update profile (name, email) ---- */
require_same_origin();
$in = body_json();

$name  = str_field($in['name'] ?? '', 120);
$email = normalize_email($in['email'] ?? '');   // null = clear, false = invalid, string = set

$errors = [];
if (mb_strlen($name) < 2) $errors['name']  = 'Enter your full name.';
if ($email === false)     $errors['email'] = 'Enter a valid email address.';

/* Phone is the login identifier and is not editable here (would need re-verification). */
if (isset($in['phone'])) {
    $newPhone = normalize_phone($in['phone']);
    if ($newPhone !== null && $newPhone !== $u['phone']) {
        $errors['phone'] = 'Mobile number cannot be changed here — contact support.';
    }
}
if ($errors) {
    send(400, ['ok' => false, 'error' => 'validation', 'message' => 'Please fix the errors below.', 'fields' => $errors]);
}

$now = gmdate('Y-m-d H:i:s');
try {
    $db->beginTransaction();

    $db->prepare('UPDATE users SET email = ?, updated_at = ? WHERE id = ?')
       ->execute([$email ?: null, $now, $u['id']]);

    // profile row may not exist for very old accounts — upsert defensively
    $stmt = $db->prepare('UPDATE user_profiles SET full_name = ?, updated_at = ? WHERE user_id = ?');
    $stmt->execute([$name, $now, $u['id']]);
    if ($stmt->rowCount() === 0) {
        $db->prepare('INSERT INTO user_profiles (user_id, full_name, created_at, updated_at) VALUES (?,?,?,?)')
           ->execute([$u['id'], $name, $now, $now]);
    }

    $db->commit();
} catch (PDOException $e) {
    if ($db->inTransaction()) $db->rollBack();
    if ($e->getCode() === '23000') {
        fail(409, 'email_taken', 'That email is already used by another account.');
    }
    throw $e;
}

ok(['user' => user_public([
    'public_id' => $u['public_id'], 'phone' => $u['phone'],
    'email' => $email ?: '', 'full_name' => $name,
])]);
