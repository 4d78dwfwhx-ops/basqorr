/*
# Core Users and Role Profiles

1. Purpose
   - Central user table with role-based profiles for the BASQOR automotive marketplace.
   - Supports 6 roles: CUSTOMER, MERCHANT, SUPPLIER, SALVAGE_YARD, PARTS_HUNTER, ADMIN.

2. New Tables
   - `users` — core identity: email, name, phone, iqama, cr_number, role, status, language, timestamps.
   - `customers` — profile for buyers; links to user (1:1).
   - `merchants` — profile for sellers with inventory; links to user (1:1).
   - `suppliers` — profile for wholesale/catalog suppliers; links to user (1:1).
   - `salvage_yards` — profile for salvage yard operators; links to user (1:1).
   - `parts_hunters` — profile for parts sourcing agents; links to user (1:1).
   - `admins` — profile for platform administrators; links to user (1:1).

3. Enums
   - `user_role` — CUSTOMER, MERCHANT, SUPPLIER, SALVAGE_YARD, PARTS_HUNTER, ADMIN
   - `user_status` — PENDING, ACTIVE, SUSPENDED, VERIFIED, INACTIVE

4. Security
   - RLS enabled on all tables.
   - Users can read and update their own row in `users`.
   - Role profile tables: authenticated users can read their own profile; insert/update own profile only.
   - Admins can read all profiles (not yet enforced at DB level — will be added with admin UI).

5. Notes
   1) `user_id` on profile tables defaults to `auth.uid()` so inserts omitting it still satisfy RLS.
   2) Profile tables use `ON DELETE CASCADE` to auto-clean when a user is deleted.
   3) `users.id` references `auth.users(id)` so Supabase Auth and the app user are linked.
*/

-- ── Enums ──────────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('CUSTOMER','MERCHANT','SUPPLIER','SALVAGE_YARD','PARTS_HUNTER','ADMIN');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE user_status AS ENUM ('PENDING','ACTIVE','SUSPENDED','VERIFIED','INACTIVE');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ── Users ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         text UNIQUE NOT NULL,
  name          text,
  phone         text,
  iqama         text UNIQUE,
  cr_number     text UNIQUE,
  role          user_role   NOT NULL DEFAULT 'CUSTOMER',
  status        user_status NOT NULL DEFAULT 'PENDING',
  language      text        NOT NULL DEFAULT 'ar',
  password_hash text,
  verified_at   timestamptz,
  last_login_at timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users_read_own" ON users;
CREATE POLICY "users_read_own" ON users FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "users_insert_own" ON users;
CREATE POLICY "users_insert_own" ON users FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "users_update_own" ON users;
CREATE POLICY "users_update_own" ON users FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- ── Customers ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS customers (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid UNIQUE NOT NULL DEFAULT auth.uid() REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "customers_read_own" ON customers;
CREATE POLICY "customers_read_own" ON customers FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "customers_insert_own" ON customers;
CREATE POLICY "customers_insert_own" ON customers FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "customers_update_own" ON customers;
CREATE POLICY "customers_update_own" ON customers FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "customers_delete_own" ON customers;
CREATE POLICY "customers_delete_own" ON customers FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ── Merchants ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS merchants (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid UNIQUE NOT NULL DEFAULT auth.uid() REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE merchants ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "merchants_read_own" ON merchants;
CREATE POLICY "merchants_read_own" ON merchants FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "merchants_insert_own" ON merchants;
CREATE POLICY "merchants_insert_own" ON merchants FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "merchants_update_own" ON merchants;
CREATE POLICY "merchants_update_own" ON merchants FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "merchants_delete_own" ON merchants;
CREATE POLICY "merchants_delete_own" ON merchants FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ── Suppliers ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS suppliers (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid UNIQUE NOT NULL DEFAULT auth.uid() REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "suppliers_read_own" ON suppliers;
CREATE POLICY "suppliers_read_own" ON suppliers FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "suppliers_insert_own" ON suppliers;
CREATE POLICY "suppliers_insert_own" ON suppliers FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "suppliers_update_own" ON suppliers;
CREATE POLICY "suppliers_update_own" ON suppliers FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "suppliers_delete_own" ON suppliers;
CREATE POLICY "suppliers_delete_own" ON suppliers FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ── Salvage Yards ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS salvage_yards (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid UNIQUE NOT NULL DEFAULT auth.uid() REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE salvage_yards ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "salvage_yards_read_own" ON salvage_yards;
CREATE POLICY "salvage_yards_read_own" ON salvage_yards FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "salvage_yards_insert_own" ON salvage_yards;
CREATE POLICY "salvage_yards_insert_own" ON salvage_yards FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "salvage_yards_update_own" ON salvage_yards;
CREATE POLICY "salvage_yards_update_own" ON salvage_yards FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "salvage_yards_delete_own" ON salvage_yards;
CREATE POLICY "salvage_yards_delete_own" ON salvage_yards FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ── Parts Hunters ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS parts_hunters (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid UNIQUE NOT NULL DEFAULT auth.uid() REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE parts_hunters ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "parts_hunters_read_own" ON parts_hunters;
CREATE POLICY "parts_hunters_read_own" ON parts_hunters FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "parts_hunters_insert_own" ON parts_hunters;
CREATE POLICY "parts_hunters_insert_own" ON parts_hunters FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "parts_hunters_update_own" ON parts_hunters;
CREATE POLICY "parts_hunters_update_own" ON parts_hunters FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "parts_hunters_delete_own" ON parts_hunters;
CREATE POLICY "parts_hunters_delete_own" ON parts_hunters FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ── Admins ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admins (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid UNIQUE NOT NULL DEFAULT auth.uid() REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admins_read_own" ON admins;
CREATE POLICY "admins_read_own" ON admins FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "admins_insert_own" ON admins;
CREATE POLICY "admins_insert_own" ON admins FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "admins_update_own" ON admins;
CREATE POLICY "admins_update_own" ON admins FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "admins_delete_own" ON admins;
CREATE POLICY "admins_delete_own" ON admins FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ── Indexes ────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_users_email  ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role    ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_status  ON users(status);
CREATE INDEX IF NOT EXISTS idx_customers_uid ON customers(user_id);
CREATE INDEX IF NOT EXISTS idx_merchants_uid ON merchants(user_id);
CREATE INDEX IF NOT EXISTS idx_suppliers_uid ON suppliers(user_id);
CREATE INDEX IF NOT EXISTS idx_salvage_yards_uid ON salvage_yards(user_id);
CREATE INDEX IF NOT EXISTS idx_parts_hunters_uid ON parts_hunters(user_id);
CREATE INDEX IF NOT EXISTS idx_admins_uid ON admins(user_id);
