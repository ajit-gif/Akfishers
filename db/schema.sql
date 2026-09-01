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
  `role`           ENUM('customer','admin') NOT NULL DEFAULT 'customer',
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

-- If you already ran an earlier version of this file, add the column:
--   ALTER TABLE `users` ADD COLUMN `role` ENUM('customer','admin') NOT NULL DEFAULT 'customer' AFTER `password_hash`;
-- Then promote yourself to admin AFTER signing up normally on the site:
--   UPDATE `users` SET `role` = 'admin' WHERE `phone` = '9181081XXXXX';   -- your mobile, canonical 91XXXXXXXXXX

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

-- ------------------------------------------------------------
-- addresses  —  a customer's saved delivery addresses
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `addresses` (
  `id`          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id`     BIGINT UNSIGNED NOT NULL,
  `label`       VARCHAR(40)     NOT NULL DEFAULT 'Home',
  `flat`        VARCHAR(120)    NOT NULL,
  `building`    VARCHAR(160)    NOT NULL,
  `area`        VARCHAR(160)    NOT NULL,
  `city`        VARCHAR(80)     NOT NULL DEFAULT 'Mumbai',
  `state`       VARCHAR(80)     NOT NULL DEFAULT 'Maharashtra',
  `pincode`     CHAR(6)         NOT NULL,
  `is_default`  TINYINT(1)      NOT NULL DEFAULT 0,
  `created_at`  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ix_addr_user` (`user_id`),
  CONSTRAINT `fk_addr_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- orders  —  every order (guest orders have user_id = NULL)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `orders` (
  `id`               BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `public_id`        VARCHAR(20)     NOT NULL,           -- "AKF-XXXXXX"
  `user_id`          BIGINT UNSIGNED DEFAULT NULL,       -- NULL until a matching account claims it
  `track_token`      CHAR(32)        NOT NULL,           -- guest tracking secret
  `cust_name`        VARCHAR(120)    NOT NULL,
  `cust_phone`       VARCHAR(15)     NOT NULL,           -- canonical 91XXXXXXXXXX
  `cust_email`       VARCHAR(190)    DEFAULT NULL,
  `address_text`     VARCHAR(500)    NOT NULL,
  `pincode`          CHAR(6)         NOT NULL,
  `items_json`       TEXT            NOT NULL,           -- [{id,name,weight,cut,qty,price}]
  `subtotal`         INT             NOT NULL,
  `discount`         INT             NOT NULL DEFAULT 0,
  `coupon`           VARCHAR(32)     DEFAULT NULL,
  `delivery_charge`  INT             NOT NULL DEFAULT 0,
  `total`            INT             NOT NULL,
  `payment`          VARCHAR(24)     NOT NULL,           -- "Online Payment" | "Cash On Delivery"
  `delivery_date`    DATE            NOT NULL,
  `delivery_slot`    VARCHAR(40)     NOT NULL,
  `status`           ENUM('confirmed','packed','out','delivered','cancelled') NOT NULL DEFAULT 'confirmed',
  `created_at`       DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`       DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_orders_public_id` (`public_id`),
  KEY `ix_orders_user` (`user_id`),
  KEY `ix_orders_phone` (`cust_phone`),
  KEY `ix_orders_status` (`status`),
  KEY `ix_orders_created` (`created_at`),
  CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- delivery_zones  —  editable delivery charge per zone (admin)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `delivery_zones` (
  `zone_id`  VARCHAR(24)  NOT NULL,
  `name`     VARCHAR(80)  NOT NULL,
  `charge`   INT          NOT NULL,
  `updated_at` DATETIME   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`zone_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO `delivery_zones` (`zone_id`,`name`,`charge`) VALUES
  ('mumbai','Mumbai',49),
  ('thane','Thane',59),
  ('navi-mumbai','Navi Mumbai',69),
  ('mbvv','Mira-Bhayandar / Vasai-Virar',79),
  ('kdmt','Kalyan / Dombivli / Ambernath',79);
