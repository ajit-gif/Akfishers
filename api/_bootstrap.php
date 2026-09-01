<?php
/**
 * AK Fishers API — shared bootstrap.
 * Loaded by every endpoint. Handles config, DB, security headers, helpers.
 */

declare(strict_types=1);

/* ------------------------------------------------------------------ *
 *  Error handling — log server-side, never leak to the client
 * ------------------------------------------------------------------ */
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');

/* ------------------------------------------------------------------ *
 *  Config — prefer a file ABOVE the web root
 * ------------------------------------------------------------------ */
$CFG = null;
$candidates = array_filter([
    getenv('AKF_CONFIG') ?: null,        // explicit override (env var), if set
    __DIR__ . '/../../akf-config.php',   // ~/domains/akfishers.com/akf-config.php  (recommended)
    __DIR__ . '/../akf-config.php',
    __DIR__ . '/config.php',             // last resort (blocked from web by .htaccess)
    __DIR__ . '/config.sample.php',      // template — will fail DB connect, that's expected
]);
foreach ($candidates as $p) {
    if (is_file($p)) { $CFG = require $p; break; }
}
if (!is_array($CFG)) { $CFG = []; }

/* Backend not configured yet (real config file missing / enabled=false).
   Return a calm 503 the frontend can show as "accounts coming soon". */
if (empty($CFG['enabled']) || empty($CFG['db']['dsn']) || strpos((string)$CFG['db']['dsn'], 'YOUR_DB') !== false) {
    http_response_code(503);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode(['ok' => false, 'error' => 'not_configured',
        'message' => 'Accounts are not available yet. You can still order as a guest.']);
    exit;
}

date_default_timezone_set('UTC');

define('APP_URL', rtrim((string)($CFG['app_url'] ?? 'https://akfishers.com'), '/'));
define('COOKIE_NAME', (string)($CFG['cookie_name'] ?? 'akf_session'));
define('SESSION_DAYS', (int)($CFG['session_days'] ?? 30));
define('DEBUG', (bool)($CFG['debug'] ?? false));

/* ------------------------------------------------------------------ *
 *  Response helpers
 * ------------------------------------------------------------------ */
function send(int $status, array $payload): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    header('Referrer-Policy: no-referrer');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}
function ok(array $data = []): void            { send(200, ['ok' => true] + $data); }
function fail(int $status, string $error, string $message): void {
    send($status, ['ok' => false, 'error' => $error, 'message' => $message]);
}

/* Uniform "something broke" — logs detail, returns nothing sensitive */
function boom(Throwable $e): void {
    error_log('[akf-api] ' . $e->getMessage() . ' @ ' . $e->getFile() . ':' . $e->getLine());
    if (DEBUG) { fail(500, 'server_error', $e->getMessage()); }
    fail(500, 'server_error', 'Something went wrong. Please try again.');
}
set_exception_handler('boom');

/* ------------------------------------------------------------------ *
 *  Database (PDO)
 * ------------------------------------------------------------------ */
try {
    $db = new PDO(
        $CFG['db']['dsn'],
        $CFG['db']['user'] ?? null,
        $CFG['db']['password'] ?? null,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );
} catch (Throwable $e) {
    error_log('[akf-api] DB connect failed: ' . $e->getMessage());
    fail(500, 'server_error', 'Service temporarily unavailable.');
}

/* ------------------------------------------------------------------ *
 *  Request helpers
 * ------------------------------------------------------------------ */
function method(): string { return strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET'); }

function require_method(string ...$allowed): void {
    if (!in_array(method(), $allowed, true)) {
        header('Allow: ' . implode(', ', $allowed));
        fail(405, 'method_not_allowed', 'Method not allowed.');
    }
}

/* CSRF defence: state-changing calls must be same-origin JSON (fetch), and the
   Origin/Referer, when present, must match our own site. Combined with a
   SameSite=Strict session cookie this blocks cross-site forgery without tokens. */
function require_same_origin(): void {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $ref    = $_SERVER['HTTP_REFERER'] ?? '';
    $host   = parse_url(APP_URL, PHP_URL_HOST);
    $check  = function (string $u) use ($host): bool {
        if ($u === '') return true;                       // some browsers omit it on same-origin GET
        $h = parse_url($u, PHP_URL_HOST);
        return $h === $host || $h === 'www.' . $host;
    };
    if (!$check($origin) || !$check($ref)) {
        fail(403, 'forbidden', 'Invalid request origin.');
    }
}

function body_json(): array {
    $ct = $_SERVER['CONTENT_TYPE'] ?? '';
    if (stripos($ct, 'application/json') === false) {
        fail(415, 'unsupported_media_type', 'Send JSON.');
    }
    $raw = file_get_contents('php://input') ?: '';
    if (strlen($raw) > 10000) fail(413, 'payload_too_large', 'Request too large.');
    $data = json_decode($raw, true);
    if (!is_array($data)) fail(400, 'bad_request', 'Invalid JSON body.');
    return $data;
}

function ip_in_cidr(string $ip, string $cidr): bool {
    if (strpos($cidr, '/') === false) return $ip === $cidr;
    [$net, $bits] = explode('/', $cidr, 2);
    $bits = (int)$bits;
    $ipb = @inet_pton($ip); $netb = @inet_pton($net);
    if ($ipb === false || $netb === false || strlen($ipb) !== strlen($netb)) return false;
    $bytes = intdiv($bits, 8); $rem = $bits % 8;
    if ($bytes && strncmp($ipb, $netb, $bytes) !== 0) return false;
    if ($rem) {
        $mask = chr(0xff << (8 - $rem) & 0xff);
        if ((ord($ipb[$bytes]) & ord($mask)) !== (ord($netb[$bytes]) & ord($mask))) return false;
    }
    return true;
}

function client_ip(): string {
    global $CFG;
    $remote = (string)($_SERVER['REMOTE_ADDR'] ?? '');

    // X-Forwarded-For is only trusted when the direct peer is a configured
    // trusted proxy, or (fallback) a private/reserved address — i.e. we really
    // are behind a reverse proxy / CDN (Hostinger LiteSpeed).
    $trustedProxies = $CFG['trusted_proxies'] ?? null;
    $trust = false;
    if (is_array($trustedProxies)) {
        foreach ($trustedProxies as $cidr) { if (ip_in_cidr($remote, (string)$cidr)) { $trust = true; break; } }
    } else {
        $publicRemote = filter_var($remote, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE);
        $trust = ($publicRemote === false);
    }

    if ($trust) {
        $fwd = explode(',', (string)($_SERVER['HTTP_X_FORWARDED_FOR'] ?? ''));
        for ($i = count($fwd) - 1; $i >= 0; $i--) {   // right-to-left: last untrusted hop
            $ip = trim($fwd[$i]);
            if ($ip === '' || !filter_var($ip, FILTER_VALIDATE_IP)) continue;
            $isProxy = false;
            if (is_array($trustedProxies)) {
                foreach ($trustedProxies as $cidr) { if (ip_in_cidr($ip, (string)$cidr)) { $isProxy = true; break; } }
            }
            if (!$isProxy) return substr($ip, 0, 45);
        }
    }
    return $remote !== '' ? substr($remote, 0, 45) : '0.0.0.0';
}

function str_field($v, int $max = 190): string {
    if (!is_string($v)) return '';
    $v = trim($v);
    if (function_exists('mb_substr')) $v = mb_substr($v, 0, $max);
    else $v = substr($v, 0, $max);
    return $v;
}

/* Indian mobile: 10 digits starting 6-9, optionally +91 / 91 / 0 prefixed.
   Stored canonically as 12 digits: 91XXXXXXXXXX */
function normalize_phone($v): ?string {
    $d = preg_replace('/\D+/', '', (string)$v);
    if ($d === null) return null;
    if (strlen($d) === 10 && preg_match('/^[6-9]/', $d)) return '91' . $d;
    if (strlen($d) === 11 && $d[0] === '0' && preg_match('/^0[6-9]/', $d)) return '91' . substr($d, 1);
    if (strlen($d) === 12 && str_starts_with($d, '91') && preg_match('/^91[6-9]/', $d)) return $d;
    return null;
}
function phone_display(string $canonical): string {
    // 91XXXXXXXXXX -> "+91 XXXXX XXXXX"
    $n = substr($canonical, 2);
    return '+91 ' . substr($n, 0, 5) . ' ' . substr($n, 5);
}

/** @return string|null|false  null = not provided, false = provided but invalid */
function normalize_email($v) {
    $e = strtolower(str_field($v, 190));
    if ($e === '') return null;
    return filter_var($e, FILTER_VALIDATE_EMAIL) ? $e : false;
}

/* ------------------------------------------------------------------ *
 *  Rate limiting  (rolling window, per IP + action)
 * ------------------------------------------------------------------ */
function rate_limit(PDO $db, string $action, int $max, int $window): void {
    $since = gmdate('Y-m-d H:i:s', time() - $window);
    $stmt = $db->prepare(
        'SELECT COUNT(*) FROM auth_attempts WHERE ip = ? AND action = ? AND created_at >= ?'
    );
    $stmt->execute([client_ip(), $action, $since]);
    if ((int)$stmt->fetchColumn() >= $max) {
        header('Retry-After: ' . $window);
        fail(429, 'rate_limited', 'Too many attempts. Please wait a few minutes and try again.');
    }
}
function record_attempt(PDO $db, string $action, ?string $identifier, bool $success): void {
    try {
        $stmt = $db->prepare(
            'INSERT INTO auth_attempts (ip, action, identifier, success, created_at) VALUES (?,?,?,?,?)'
        );
        $stmt->execute([
            client_ip(), $action,
            $identifier !== null ? substr($identifier, 0, 190) : null,
            $success ? 1 : 0,
            gmdate('Y-m-d H:i:s'),
        ]);
    } catch (Throwable $e) { error_log('[akf-api] attempt log failed: ' . $e->getMessage()); }
}
/* Opportunistic cleanup so the tables never grow unbounded (no cron needed) */
function gc_maybe(PDO $db): void {
    if (random_int(1, 20) !== 1) return;
    try {
        $db->prepare('DELETE FROM auth_attempts WHERE created_at < ?')
           ->execute([gmdate('Y-m-d H:i:s', time() - 86400)]);
        $db->prepare('DELETE FROM sessions WHERE expires_at < ?')
           ->execute([gmdate('Y-m-d H:i:s')]);
    } catch (Throwable $e) { /* ignore */ }
}

/* ------------------------------------------------------------------ *
 *  Sessions
 * ------------------------------------------------------------------ */
function new_public_id(): string {
    // 21 url-safe chars, ~125 bits
    return substr(rtrim(strtr(base64_encode(random_bytes(16)), '+/', 'Ab'), '='), 0, 21);
}

function issue_session(PDO $db, int $userId): void {
    $token = bin2hex(random_bytes(32));                 // 64 hex chars, 256-bit
    $hash  = hash('sha256', $token);
    $exp   = gmdate('Y-m-d H:i:s', time() + SESSION_DAYS * 86400);
    $stmt  = $db->prepare(
        'INSERT INTO sessions (user_id, token_hash, user_agent, ip, created_at, last_seen, expires_at)
         VALUES (?,?,?,?,?,?,?)'
    );
    $now = gmdate('Y-m-d H:i:s');
    $stmt->execute([
        $userId, $hash,
        substr((string)($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 255),
        client_ip(), $now, $now, $exp,
    ]);
    set_session_cookie($token, time() + SESSION_DAYS * 86400);
}

function set_session_cookie(string $value, int $expires): void {
    $secure = (($_SERVER['HTTPS'] ?? '') === 'on')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https')
        || str_starts_with(APP_URL, 'https://');
    setcookie(COOKIE_NAME, $value, [
        'expires'  => $expires,
        'path'     => '/',
        'secure'   => $secure,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
}
function clear_session_cookie(): void { set_session_cookie('', time() - 3600); }

/**
 * Returns the authenticated user row (users + full_name) or null.
 * Also slides the expiry forward.
 */
function current_user(PDO $db): ?array {
    $token = $_COOKIE[COOKIE_NAME] ?? '';
    if (!preg_match('/^[a-f0-9]{64}$/', $token)) return null;
    $hash = hash('sha256', $token);

    $stmt = $db->prepare(
        'SELECT s.id AS sid, s.expires_at, u.id, u.public_id, u.phone, u.email, u.status, u.role,
                COALESCE(p.full_name, "") AS full_name
           FROM sessions s
           JOIN users u          ON u.id = s.user_id
           LEFT JOIN user_profiles p ON p.user_id = u.id
          WHERE s.token_hash = ?'
    );
    $stmt->execute([$hash]);
    $row = $stmt->fetch();
    if (!$row) return null;

    if (strtotime($row['expires_at']) < time() || $row['status'] !== 'active') {
        $db->prepare('DELETE FROM sessions WHERE id = ?')->execute([$row['sid']]);
        clear_session_cookie();
        return null;
    }

    // sliding window: bump last_seen + expiry (at most once/hour to limit writes)
    if (strtotime($row['expires_at']) - time() < (SESSION_DAYS - 1) * 86400) {
        $db->prepare('UPDATE sessions SET last_seen = ?, expires_at = ? WHERE id = ?')->execute([
            gmdate('Y-m-d H:i:s'),
            gmdate('Y-m-d H:i:s', time() + SESSION_DAYS * 86400),
            $row['sid'],
        ]);
        set_session_cookie($token, time() + SESSION_DAYS * 86400);
    }
    return $row;
}

function require_user(PDO $db): array {
    $u = current_user($db);
    if (!$u) fail(401, 'unauthenticated', 'Please log in.');
    return $u;
}

function require_admin(PDO $db): array {
    $u = current_user($db);
    if (!$u) fail(401, 'unauthenticated', 'Please log in.');
    if (($u['role'] ?? 'customer') !== 'admin') fail(403, 'forbidden', 'Admin access only.');
    return $u;
}

/* Server-side product + coupon reference for order validation.
   Regenerate api/data/catalog.json whenever scripts/products.js changes. */
function load_catalog(): array {
    static $cache = null;
    if ($cache !== null) return $cache;
    $f = __DIR__ . '/data/catalog.json';
    $c = is_file($f) ? (json_decode((string)file_get_contents($f), true) ?: []) : [];
    $cache = $c + ['products' => [], 'coupons' => [], 'free_delivery_min' => 999];
    return $cache;
}

/* Delivery zone for a pincode — mirrors scripts/products.js akfFindArea() */
function delivery_zone(string $pin): ?array {
    if (!preg_match('/^\d{6}$/', $pin)) return null;
    $n = (int)$pin;
    $zones = [
        ['id' => 'mumbai',      'name' => 'Mumbai',                          'lo' => 400001, 'hi' => 400104],
        ['id' => 'thane',       'name' => 'Thane',                           'lo' => 400600, 'hi' => 400615],
        ['id' => 'navi-mumbai', 'name' => 'Navi Mumbai',                     'lo' => 400700, 'hi' => 400710],
        ['id' => 'navi-mumbai', 'name' => 'Navi Mumbai',                     'lo' => 410200, 'hi' => 410222],
        ['id' => 'mbvv',        'name' => 'Mira-Bhayandar / Vasai-Virar',    'lo' => 401100, 'hi' => 401209],
        ['id' => 'kdmt',        'name' => 'Kalyan / Dombivli / Ambernath',   'lo' => 421001, 'hi' => 421605],
    ];
    foreach ($zones as $z) {
        if ($n >= $z['lo'] && $n <= $z['hi']) return ['id' => $z['id'], 'name' => $z['name']];
    }
    return null;
}
function zone_charge(PDO $db, string $zoneId): int {
    try {
        $stmt = $db->prepare('SELECT charge FROM delivery_zones WHERE zone_id = ?');
        $stmt->execute([$zoneId]);
        $c = $stmt->fetchColumn();
        if ($c !== false) return (int)$c;
    } catch (Throwable $e) { /* table missing? fall through */ }
    return ['mumbai' => 49, 'thane' => 59, 'navi-mumbai' => 69, 'mbvv' => 79, 'kdmt' => 79][$zoneId] ?? 49;
}

function order_public_id(): string {
    return 'AKF-' . str_pad((string)random_int(0, 999999), 6, '0', STR_PAD_LEFT);
}

/* When a user logs in / signs up, attach any guest orders made with that phone */
function claim_guest_orders(PDO $db, int $userId, string $canonPhone): void {
    try {
        $db->prepare('UPDATE orders SET user_id = ? WHERE user_id IS NULL AND cust_phone = ?')
           ->execute([$userId, $canonPhone]);
    } catch (Throwable $e) { error_log('[akf-api] claim orders: ' . $e->getMessage()); }
}

/* Public shape of a user — the ONLY user fields ever sent to the client */
function user_public(array $row): array {
    $phone = (string)$row['phone'];
    return [
        'id'     => $row['public_id'],
        'name'   => $row['full_name'] ?? '',
        'phone'  => phone_display($phone),          // "+91 98765 43210" — for display
        'mobile' => strlen($phone) >= 12 ? substr($phone, -10) : $phone,  // "9876543210" — for forms
        'email'  => $row['email'] ?? '',
    ];
}

gc_maybe($db);
