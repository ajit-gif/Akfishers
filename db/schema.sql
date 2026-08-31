-- ============================================================
--  AK Fishers — authentication schema  (MySQL 5.7+ / MariaDB 10+)
--  Run once:  hPanel -> phpMyAdmin -> (your DB) -> SQL tab -> paste -> Go
--  Safe to re-run (CREATE TABLE IF NOT EXISTS).
-- ============================================================

SET NAMES utf8mb4;

-- ------------------------------------------------------------
-- users  —  AUTHENTICATION data only
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id`             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `public_id`      CHAR(21)        NOT NULL,             -- stable opaque id sent to the client
  `phone`          VARCHAR(15)     NOT NULL,             -- digits only, incl. country code e.g. 9198XXXXXXXX
  `email`          VARCHAR(190)    DEFAULT NULL,
  `password_hash`  VARCHAR(255)    NOT NULL,             -- bcrypt, PASSWORD_DEFAULT
  `status`         ENUM('active','disabled') NOT NULL DEFAULT 'active',
  `failed_logins`  TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `locked_until`   DATETIME        DEFAULT NULL,
  `created_at`     DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`     DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_users_public_id` (`public_id`),
  UNIQUE KEY `uq_users_phone` (`phone`),
  UNIQUE KEY `uq_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- user_profiles  —  PROFILE data, 1:1 with users
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `user_profiles` (
  `user_id`     BIGINT UNSIGNED NOT NULL,
  `full_name`   VARCHAR(120)    NOT NULL DEFAULT '',
  `created_at`  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_profiles_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- sessions  —  opaque server-side sessions (cookie carries only a random token)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `sessions` (
  `id`          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id`     BIGINT UNSIGNED NOT NULL,
  `token_hash`  CHAR(64)        NOT NULL,               -- sha256(token), computed in PHP
  `user_agent`  VARCHAR(255)    DEFAULT NULL,
  `ip`          VARCHAR(45)     DEFAULT NULL,
  `created_at`  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_seen`   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at`  DATETIME        NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_sessions_token` (`token_hash`),
  KEY `ix_sessions_user` (`user_id`),
  KEY `ix_sessions_expires` (`expires_at`),
  CONSTRAINT `fk_sessions_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- auth_attempts  —  rate limiting / brute-force tracking
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `auth_attempts` (
  `id`          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `ip`          VARCHAR(45)     NOT NULL,
  `action`      VARCHAR(24)     NOT NULL,               -- login | signup | ...
  `identifier`  VARCHAR(190)    DEFAULT NULL,
  `success`     TINYINT(1)      NOT NULL DEFAULT 0,
  `created_at`  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ix_attempts_ip_action_time` (`ip`, `action`, `created_at`),
  KEY `ix_attempts_id_action_time` (`identifier`, `action`, `created_at`),
  KEY `ix_attempts_time` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
