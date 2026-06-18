/*
# SOS Roadside Assistance & Parts Hunter Requests

1. Purpose
   - SOS: roadside emergency requests (flat tire, battery, fuel, accident, etc.) with provider assignment.
   - Parts Hunter: request/bid system where users post part requests and hunters submit bids.

2. New Tables
   - `sos_providers` — emergency service providers with rating, location, availability status.
   - `sos_requests` — user emergency requests with location, issue type, status, assigned provider, arrival estimates.
   - `parts_requests` — user part-sourcing requests: part name, description, vehicle link, budget range, urgency, condition preference.
   - `parts_bids` — hunter bids on parts requests: price, ETA, source, verification status.

3. Enums
   - `sos_issue` — FLAT_TIRE, BATTERY, FUEL, ACCIDENT, MECHANICAL, LOCKED_IN_CAR, TOW
   - `sos_status` — PENDING, ASSIGNED, IN_PROGRESS, COMPLETED, CANCELLED
   - `provider_status` — AVAILABLE, BUSY, OFFLINE
   - `urgency_level` — STANDARD, URGENT, ASAP
   - `request_status` — PENDING, ACTIVE, COMPLETED, CANCELLED

4. Security
   - RLS enabled on all tables.
   - SOS providers: owner-scoped CRUD on own profile.
   - SOS requests: requester can read/insert/update own requests; assigned provider can read/update.
   - Parts requests: requester can CRUD own requests; all authenticated can read.
   - Parts bids: hunter can CRUD own bids; requester can read bids on their requests.

5. Notes
   1) `sos_requests.location` and `sos_providers.location` are JSONB (lat/lng/city).
   2) `parts_bids.hunter_id` references `parts_hunters(id)` not `users(id)` — the hunter profile is the entity.
*/

-- ── Enums ──────────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE sos_issue AS ENUM ('FLAT_TIRE','BATTERY','FUEL','ACCIDENT','MECHANICAL','LOCKED_IN_CAR','TOW');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE sos_status AS ENUM ('PENDING','ASSIGNED','IN_PROGRESS','COMPLETED','CANCELLED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE provider_status AS ENUM ('AVAILABLE','BUSY','OFFLINE');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE urgency_level AS ENUM ('STANDARD','URGENT','ASAP');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE request_status AS ENUM ('PENDING','ACTIVE','COMPLETED','CANCELLED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ── SOS Providers ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS sos_providers (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid UNIQUE NOT NULL DEFAULT auth.uid() REFERENCES users(id) ON DELETE CASCADE,
  rating      numeric(3,2) NOT NULL DEFAULT 0,
  rating_count int NOT NULL DEFAULT 0,
  location    jsonb,
  status      provider_status NOT NULL DEFAULT 'AVAILABLE',
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE sos_providers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "sos_providers_read_own" ON sos_providers;
CREATE POLICY "sos_providers_read_own" ON sos_providers FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "sos_providers_insert_own" ON sos_providers;
CREATE POLICY "sos_providers_insert_own" ON sos_providers FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "sos_providers_update_own" ON sos_providers;
CREATE POLICY "sos_providers_update_own" ON sos_providers FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "sos_providers_delete_own" ON sos_providers;
CREATE POLICY "sos_providers_delete_own" ON sos_providers FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ── SOS Requests ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS sos_requests (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid NOT NULL DEFAULT auth.uid() REFERENCES users(id) ON DELETE CASCADE,
  location          jsonb NOT NULL,
  issue             sos_issue NOT NULL,
  status            sos_status NOT NULL DEFAULT 'PENDING',
  provider_id       uuid REFERENCES sos_providers(id) ON DELETE SET NULL,
  estimated_arrival timestamptz,
  completed_at      timestamptz,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE sos_requests ENABLE ROW LEVEL SECURITY;

-- Requester can read their own SOS requests
DROP POLICY IF EXISTS "sos_requests_read_requester" ON sos_requests;
CREATE POLICY "sos_requests_read_requester" ON sos_requests FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

-- Assigned provider can read the request
DROP POLICY IF EXISTS "sos_requests_read_provider" ON sos_requests;
CREATE POLICY "sos_requests_read_provider" ON sos_requests FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM sos_providers WHERE sos_providers.id = sos_requests.provider_id AND sos_providers.user_id = auth.uid())
  );

-- Any authenticated user can create an SOS request
DROP POLICY IF EXISTS "sos_requests_insert" ON sos_requests;
CREATE POLICY "sos_requests_insert" ON sos_requests FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

-- Requester or assigned provider can update
DROP POLICY IF EXISTS "sos_requests_update" ON sos_requests;
CREATE POLICY "sos_requests_update" ON sos_requests FOR UPDATE
  TO authenticated USING (
    auth.uid() = user_id
    OR EXISTS (SELECT 1 FROM sos_providers WHERE sos_providers.id = sos_requests.provider_id AND sos_providers.user_id = auth.uid())
  ) WITH CHECK (
    auth.uid() = user_id
    OR EXISTS (SELECT 1 FROM sos_providers WHERE sos_providers.id = sos_requests.provider_id AND sos_providers.user_id = auth.uid())
  );

-- ── Parts Requests ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS parts_requests (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL DEFAULT auth.uid() REFERENCES users(id) ON DELETE CASCADE,
  part_name   text NOT NULL,
  description text,
  vehicle_id  uuid REFERENCES vehicles(id) ON DELETE SET NULL,
  budget_min  numeric(12,2) NOT NULL,
  budget_max  numeric(12,2) NOT NULL,
  urgency     urgency_level NOT NULL DEFAULT 'STANDARD',
  condition   part_condition,
  status      request_status NOT NULL DEFAULT 'PENDING',
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE parts_requests ENABLE ROW LEVEL SECURITY;

-- All authenticated can browse parts requests
DROP POLICY IF EXISTS "parts_requests_read_all" ON parts_requests;
CREATE POLICY "parts_requests_read_all" ON parts_requests FOR SELECT
  TO authenticated USING (true);

-- Requester can insert own
DROP POLICY IF EXISTS "parts_requests_insert_own" ON parts_requests;
CREATE POLICY "parts_requests_insert_own" ON parts_requests FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

-- Requester can update own
DROP POLICY IF EXISTS "parts_requests_update_own" ON parts_requests;
CREATE POLICY "parts_requests_update_own" ON parts_requests FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Requester can delete own
DROP POLICY IF EXISTS "parts_requests_delete_own" ON parts_requests;
CREATE POLICY "parts_requests_delete_own" ON parts_requests FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ── Parts Bids ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS parts_bids (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id   uuid NOT NULL REFERENCES parts_requests(id) ON DELETE CASCADE,
  hunter_id    uuid NOT NULL REFERENCES parts_hunters(id) ON DELETE CASCADE,
  price        numeric(12,2) NOT NULL,
  eta          int NOT NULL,
  source       text NOT NULL,
  verified     boolean NOT NULL DEFAULT false,
  created_at   timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE parts_bids ENABLE ROW LEVEL SECURITY;

-- Request owner can read bids on their requests
DROP POLICY IF EXISTS "parts_bids_read_requester" ON parts_bids;
CREATE POLICY "parts_bids_read_requester" ON parts_bids FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM parts_requests WHERE parts_requests.id = parts_bids.request_id AND parts_requests.user_id = auth.uid())
  );

-- Hunter can read their own bids
DROP POLICY IF EXISTS "parts_bids_read_hunter" ON parts_bids;
CREATE POLICY "parts_bids_read_hunter" ON parts_bids FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM parts_hunters WHERE parts_hunters.id = parts_bids.hunter_id AND parts_hunters.user_id = auth.uid())
  );

-- Hunter can insert bids (scoped through their hunter profile)
DROP POLICY IF EXISTS "parts_bids_insert_hunter" ON parts_bids;
CREATE POLICY "parts_bids_insert_hunter" ON parts_bids FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM parts_hunters WHERE parts_hunters.id = parts_bids.hunter_id AND parts_hunters.user_id = auth.uid())
  );

-- Hunter can update their own bids
DROP POLICY IF EXISTS "parts_bids_update_hunter" ON parts_bids;
CREATE POLICY "parts_bids_update_hunter" ON parts_bids FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM parts_hunters WHERE parts_hunters.id = parts_bids.hunter_id AND parts_hunters.user_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM parts_hunters WHERE parts_hunters.id = parts_bids.hunter_id AND parts_hunters.user_id = auth.uid())
  );

-- Hunter can delete their own bids
DROP POLICY IF EXISTS "parts_bids_delete_hunter" ON parts_bids;
CREATE POLICY "parts_bids_delete_hunter" ON parts_bids FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM parts_hunters WHERE parts_hunters.id = parts_bids.hunter_id AND parts_hunters.user_id = auth.uid())
  );

-- ── Indexes ────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_sos_providers_uid    ON sos_providers(user_id);
CREATE INDEX IF NOT EXISTS idx_sos_providers_status ON sos_providers(status);
CREATE INDEX IF NOT EXISTS idx_sos_requests_uid     ON sos_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_sos_requests_status   ON sos_requests(status);
CREATE INDEX IF NOT EXISTS idx_sos_requests_provider ON sos_requests(provider_id);
CREATE INDEX IF NOT EXISTS idx_parts_requests_uid   ON parts_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_parts_requests_status ON parts_requests(status);
CREATE INDEX IF NOT EXISTS idx_parts_bids_request   ON parts_bids(request_id);
CREATE INDEX IF NOT EXISTS idx_parts_bids_hunter    ON parts_bids(hunter_id);
