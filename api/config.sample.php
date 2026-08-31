<?php
/**
 * AK Fishers — API configuration TEMPLATE.
 *
 * DO NOT put real credentials in this file (it is committed to Git).
 *
 * Copy it to a file OUTSIDE public_html so it is never web-served and never
 * overwritten by the GitHub auto-deploy, e.g. on Hostinger:
 *
 *     ~/domains/akfishers.com/akf-config.php        (one level above public_html)
 *
 * _bootstrap.php looks for it there first, then falls back to this file.
 */

return [
    // Leave false here. Your REAL config file (above public_html) omits this
    // key or sets it true — that's how the API knows it is configured.
    'enabled' => false,

    // ---- Database (Hostinger: hPanel -> Databases -> MySQL Databases) ----
    'db' => [
        'dsn'      => 'mysql:host=localhost;dbname=YOUR_DB_NAME;charset=utf8mb4',
        'user'     => 'YOUR_DB_USER',
        'password' => 'YOUR_DB_PASSWORD',
    ],

    // ---- Site ----
    'app_url'      => 'https://akfishers.com',   // canonical origin, no trailing slash
    'cookie_name'  => 'akf_session',
    'session_days' => 30,                        // sliding expiry

    // ---- Rate limiting (per client IP, rolling window) ----
    'limits' => [
        'login'  => ['max' => 8,  'window' => 900],   // 8 attempts / 15 min
        'signup' => ['max' => 5,  'window' => 3600],  // 5 signups  / 1 hour
    ],

    // ---- Per-account brute-force lockout ----
    'lockout' => ['threshold' => 5, 'minutes' => 15],

    // Set true only while debugging on a staging copy (never in production)
    'debug' => false,
];
