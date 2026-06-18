/*
# Marketplace: Vehicles, Parts, Compatibility, and Orders

1. Purpose
   - Core marketplace tables for the BASQOR platform.
   - Vehicles belong to users (garage), parts are listed by merchants/suppliers/salvage yards.
   - Compatibility links parts to vehicles with a match score.
   - Orders track purchases, payment, and delivery.

2. New Tables
   - `vehicles` — user-owned vehicles with VIN, make, model, year, trim, engine, transmission, color, mileage.
   - `parts` — marketplace listings: sku, name, description, price, condition, category, optional links to supplier/merchant/salvage_yard.
   - `compatibilities` — join table: part ↔ vehicle with compatibility_score (0-100).
   - `orders` — purchase records: user, part, quantity, price, status/payment/delivery tracking, shipping address, timestamps.

3. Enums
   - `part_condition` — NEW, USED, SALVAGE, REFURBISHED
   - `part_category` — ENGINE, TRANSMISSION, ELECTRICAL, LIGHTING, TIRES, BODY, BRAKES, SUSPENSION, INTERIOR, ACCESSORIES
   - `order_status` — PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED, RETURNED
   - `payment_status` — PENDING, PAID, FAILED, REFUNDED, ESCROW_HOLD, ESCROW_RELEASED
   - `delivery_status` — PENDING, IN_TRANSIT, OUT_FOR_DELIVERY, DELIVERED, RETURNED

4. Security
   - RLS enabled on all tables.
   - Vehicles: owner-scoped full CRUD.
   - Parts: owner can CRUD their own listings; all authenticated users can read.
   - Compatibilities: read for all authenticated; insert/update/delete for part owner.
   - Orders: buyer can read/insert own orders; merchant/supplier can read orders on their parts.

5. Notes
   1) `parts.user_id` is a denormalized owner column derived from the linked merchant/supplier/salvage_yard → user_id, used for RLS ownership checks.
   2) `orders.user_id` defaults to `auth.uid()` so the buyer is set automatically.
   3) `orders.shipping_address` is JSONB for flexible Saudi address formats.
*/

-- ── Enums ──────────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE part_condition AS ENUM ('NEW','USED','SALVAGE','REFURBISHED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE part_category AS ENUM ('ENGINE','TRANSMISSION','ELECTRICAL','LIGHTING','TIRES','BODY','BRAKES','SUSPENSION','INTERIOR','ACCESSORIES');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE order_status AS ENUM ('PENDING','PROCESSING','SHIPPED','DELIVERED','CANCELLED','RETURNED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('PENDING','PAID','FAILED','REFUNDED','ESCROW_HOLD','ESCROW_RELEASED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE delivery_status AS ENUM ('PENDING','IN_TRANSIT','OUT_FOR_DELIVERY','DELIVERED','RETURNED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ── Vehicles ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS vehicles (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid NOT NULL DEFAULT auth.uid() REFERENCES users(id) ON DELETE CASCADE,
  vin          text UNIQUE NOT NULL,
  make         text NOT NULL,
  model        text NOT NULL,
  year         int NOT NULL,
  trim         text,
  engine       text,
  transmission text,
  color        text,
  mileage      int NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "vehicles_read_own" ON vehicles;
CREATE POLICY "vehicles_read_own" ON vehicles FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "vehicles_insert_own" ON vehicles;
CREATE POLICY "vehicles_insert_own" ON vehicles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "vehicles_update_own" ON vehicles;
CREATE POLICY "vehicles_update_own" ON vehicles FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "vehicles_delete_own" ON vehicles;
CREATE POLICY "vehicles_delete_own" ON vehicles FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ── Parts ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS parts (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sku             text UNIQUE NOT NULL,
  name            text NOT NULL,
  description     text,
  price           numeric(12,2) NOT NULL,
  condition       part_condition NOT NULL DEFAULT 'NEW',
  category        part_category NOT NULL,
  brand           text,
  manufacturer    text,
  stock           int NOT NULL DEFAULT 1,
  user_id         uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  supplier_id     uuid REFERENCES suppliers(id) ON DELETE SET NULL,
  merchant_id     uuid REFERENCES merchants(id) ON DELETE SET NULL,
  salvage_yard_id uuid REFERENCES salvage_yards(id) ON DELETE SET NULL,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE parts ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can browse parts
DROP POLICY IF EXISTS "parts_read_all" ON parts;
CREATE POLICY "parts_read_all" ON parts FOR SELECT
  TO authenticated USING (true);

-- Only the owner can insert their own listings
DROP POLICY IF EXISTS "parts_insert_own" ON parts;
CREATE POLICY "parts_insert_own" ON parts FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

-- Only the owner can update their listings
DROP POLICY IF EXISTS "parts_update_own" ON parts;
CREATE POLICY "parts_update_own" ON parts FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Only the owner can delete their listings
DROP POLICY IF EXISTS "parts_delete_own" ON parts;
CREATE POLICY "parts_delete_own" ON parts FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ── Compatibilities ────────────────────────────────────
CREATE TABLE IF NOT EXISTS compatibilities (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  part_id            uuid NOT NULL REFERENCES parts(id) ON DELETE CASCADE,
  vehicle_id         uuid NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  compatibility_score int NOT NULL DEFAULT 100 CHECK (compatibility_score BETWEEN 0 AND 100),
  UNIQUE (part_id, vehicle_id)
);

ALTER TABLE compatibilities ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can read compatibilities
DROP POLICY IF EXISTS "compatibilities_read_all" ON compatibilities;
CREATE POLICY "compatibilities_read_all" ON compatibilities FOR SELECT
  TO authenticated USING (true);

-- Only part owner can manage compatibilities for their parts
DROP POLICY IF EXISTS "compatibilities_insert_own" ON compatibilities;
CREATE POLICY "compatibilities_insert_own" ON compatibilities FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM parts WHERE parts.id = compatibilities.part_id AND parts.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "compatibilities_update_own" ON compatibilities;
CREATE POLICY "compatibilities_update_own" ON compatibilities FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM parts WHERE parts.id = compatibilities.part_id AND parts.user_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM parts WHERE parts.id = compatibilities.part_id AND parts.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "compatibilities_delete_own" ON compatibilities;
CREATE POLICY "compatibilities_delete_own" ON compatibilities FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM parts WHERE parts.id = compatibilities.part_id AND parts.user_id = auth.uid())
  );

-- ── Orders ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id            uuid NOT NULL DEFAULT auth.uid() REFERENCES users(id) ON DELETE CASCADE,
  part_id            uuid NOT NULL REFERENCES parts(id) ON DELETE CASCADE,
  quantity           int NOT NULL DEFAULT 1,
  price              numeric(12,2) NOT NULL,
  status             order_status NOT NULL DEFAULT 'PENDING',
  payment_status     payment_status NOT NULL DEFAULT 'PENDING',
  delivery_status    delivery_status NOT NULL DEFAULT 'PENDING',
  shipping_address   jsonb,
  estimated_delivery timestamptz,
  delivered_at       timestamptz,
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Buyer can read their own orders
DROP POLICY IF EXISTS "orders_read_buyer" ON orders;
CREATE POLICY "orders_read_buyer" ON orders FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

-- Buyer can place orders
DROP POLICY IF EXISTS "orders_insert_buyer" ON orders;
CREATE POLICY "orders_insert_buyer" ON orders FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

-- Buyer can update their own orders (e.g. cancel)
DROP POLICY IF EXISTS "orders_update_buyer" ON orders;
CREATE POLICY "orders_update_buyer" ON orders FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Part owner (merchant/supplier) can read orders on their parts
DROP POLICY IF EXISTS "orders_read_seller" ON orders;
CREATE POLICY "orders_read_seller" ON orders FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM parts WHERE parts.id = orders.part_id AND parts.user_id = auth.uid())
  );

-- ── Indexes ────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_vehicles_uid   ON vehicles(user_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_vin   ON vehicles(vin);
CREATE INDEX IF NOT EXISTS idx_parts_uid      ON parts(user_id);
CREATE INDEX IF NOT EXISTS idx_parts_category  ON parts(category);
CREATE INDEX IF NOT EXISTS idx_parts_condition ON parts(condition);
CREATE INDEX IF NOT EXISTS idx_parts_sku      ON parts(sku);
CREATE INDEX IF NOT EXISTS idx_compat_part     ON compatibilities(part_id);
CREATE INDEX IF NOT EXISTS idx_compat_vehicle  ON compatibilities(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_orders_uid      ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_part     ON orders(part_id);
CREATE INDEX IF NOT EXISTS idx_orders_status   ON orders(status);
