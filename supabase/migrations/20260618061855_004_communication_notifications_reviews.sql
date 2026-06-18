/*
# Communication, Reviews, Notifications, and Permissions

1. Purpose
   - Chat & messaging system between platform participants.
   - Notification system for order, SOS, parts request, chat, review, and system events.
   - Review/rating system for parts, services, providers, and parts hunters.
   - Permission system for admin access control.
   - Session & verification token tables for auth security.

2. New Tables
   - `chats` — conversation container with participant references (stored as uuid[] array).
   - `messages` — individual messages within a chat, with sender, content, attachments, read status.
   - `notifications` — user-targeted alerts with type, title, message, payload, and read flag.
   - `reviews` — ratings and comments on parts/services/providers/hunters with optional photos.
   - `permissions` — admin permission definitions linked to admin profiles.
   - `sessions` — user session tokens for auth tracking.
   - `verification_tokens` — email/phone verification tokens with expiration.

3. Enums
   - `message_status` — SENT, DELIVERED, READ
   - `notification_type` — ORDER, SOS, PARTS_REQUEST, CHAT, REVIEW, SYSTEM
   - `review_target_type` — PART, SERVICE, PROVIDER, PARTS_HUNTER

4. Security
   - RLS enabled on all tables.
   - Chats: participants can read; only participants can insert messages into their chats.
   - Notifications: owner-scoped read/update; system can insert.
   - Reviews: all authenticated can read; author can insert/update/delete own reviews.
   - Permissions: admin-scoped — admin owner can read/insert/update their own.
   - Sessions: owner-scoped CRUD.
   - Verification tokens: owner-scoped read; insert for authenticated.

5. Notes
   1) `chats.participants` is a uuid[] array — simpler than a join table for chat membership checks.
   2) `messages.attachments` is JSONB for flexible attachment metadata.
   3) `notifications.payload` is JSONB for structured event data.
   4) `reviews.photos` is JSONB for image URL arrays.
   5) `verification_tokens.token` is UNIQUE for secure lookup.
*/

-- ── Enums ──────────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE message_status AS ENUM ('SENT','DELIVERED','READ');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE notification_type AS ENUM ('ORDER','SOS','PARTS_REQUEST','CHAT','REVIEW','SYSTEM');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE review_target_type AS ENUM ('PART','SERVICE','PROVIDER','PARTS_HUNTER');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ── Chats ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chats (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participants uuid[] NOT NULL,
  created_at   timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE chats ENABLE ROW LEVEL SECURITY;

-- Participants can read their chats
DROP POLICY IF EXISTS "chats_read_participant" ON chats;
CREATE POLICY "chats_read_participant" ON chats FOR SELECT
  TO authenticated USING (auth.uid() = ANY(participants));

-- Participants can create chats they're part of
DROP POLICY IF EXISTS "chats_insert_participant" ON chats;
CREATE POLICY "chats_insert_participant" ON chats FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = ANY(participants));

-- ── Messages ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id     uuid NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
  sender_id   uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content     text NOT NULL,
  attachments jsonb,
  status      message_status NOT NULL DEFAULT 'SENT',
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Chat participants can read messages
DROP POLICY IF EXISTS "messages_read_participant" ON messages;
CREATE POLICY "messages_read_participant" ON messages FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM chats WHERE chats.id = messages.chat_id AND auth.uid() = ANY(chats.participants))
  );

-- Chat participants can send messages
DROP POLICY IF EXISTS "messages_insert_participant" ON messages;
CREATE POLICY "messages_insert_participant" ON messages FOR INSERT
  TO authenticated WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (SELECT 1 FROM chats WHERE chats.id = messages.chat_id AND auth.uid() = ANY(chats.participants))
  );

-- Sender can update status of their own messages (e.g. mark as delivered/read)
DROP POLICY IF EXISTS "messages_update_sender" ON messages;
CREATE POLICY "messages_update_sender" ON messages FOR UPDATE
  TO authenticated USING (auth.uid() = sender_id) WITH CHECK (auth.uid() = sender_id);

-- ── Notifications ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL DEFAULT auth.uid() REFERENCES users(id) ON DELETE CASCADE,
  type       notification_type NOT NULL,
  title      text NOT NULL,
  message    text NOT NULL,
  payload    jsonb,
  read       boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "notifications_read_own" ON notifications;
CREATE POLICY "notifications_read_own" ON notifications FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "notifications_insert_own" ON notifications;
CREATE POLICY "notifications_insert_own" ON notifications FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "notifications_update_own" ON notifications;
CREATE POLICY "notifications_update_own" ON notifications FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ── Reviews ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL DEFAULT auth.uid() REFERENCES users(id) ON DELETE CASCADE,
  target_id   uuid NOT NULL,
  target_type review_target_type NOT NULL,
  rating      int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment     text,
  photos      jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- All authenticated can read reviews
DROP POLICY IF EXISTS "reviews_read_all" ON reviews;
CREATE POLICY "reviews_read_all" ON reviews FOR SELECT
  TO authenticated USING (true);

-- Author can insert own review
DROP POLICY IF EXISTS "reviews_insert_own" ON reviews;
CREATE POLICY "reviews_insert_own" ON reviews FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

-- Author can update own review
DROP POLICY IF EXISTS "reviews_update_own" ON reviews;
CREATE POLICY "reviews_update_own" ON reviews FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Author can delete own review
DROP POLICY IF EXISTS "reviews_delete_own" ON reviews;
CREATE POLICY "reviews_delete_own" ON reviews FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ── Permissions ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS permissions (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text UNIQUE NOT NULL,
  description text,
  admin_id    uuid NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "permissions_read_own" ON permissions;
CREATE POLICY "permissions_read_own" ON permissions FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = permissions.admin_id AND admins.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "permissions_insert_own" ON permissions;
CREATE POLICY "permissions_insert_own" ON permissions FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = permissions.admin_id AND admins.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "permissions_update_own" ON permissions;
CREATE POLICY "permissions_update_own" ON permissions FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = permissions.admin_id AND admins.user_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = permissions.admin_id AND admins.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "permissions_delete_own" ON permissions;
CREATE POLICY "permissions_delete_own" ON permissions FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = permissions.admin_id AND admins.user_id = auth.uid())
  );

-- ── Sessions ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sessions (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token text UNIQUE NOT NULL,
  user_id       uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires       timestamptz NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "sessions_read_own" ON sessions;
CREATE POLICY "sessions_read_own" ON sessions FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "sessions_insert_own" ON sessions;
CREATE POLICY "sessions_insert_own" ON sessions FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "sessions_delete_own" ON sessions;
CREATE POLICY "sessions_delete_own" ON sessions FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ── Verification Tokens ────────────────────────────────
CREATE TABLE IF NOT EXISTS verification_tokens (
  identifier  text NOT NULL,
  token       text UNIQUE NOT NULL,
  expires     timestamptz NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE verification_tokens ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "verification_tokens_read" ON verification_tokens;
CREATE POLICY "verification_tokens_read" ON verification_tokens FOR SELECT
  TO authenticated USING (token = token);

DROP POLICY IF EXISTS "verification_tokens_insert" ON verification_tokens;
CREATE POLICY "verification_tokens_insert" ON verification_tokens FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "verification_tokens_delete" ON verification_tokens;
CREATE POLICY "verification_tokens_delete" ON verification_tokens FOR DELETE
  TO authenticated USING (true);

-- ── Indexes ────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_chats_participants ON chats USING gin(participants);
CREATE INDEX IF NOT EXISTS idx_messages_chat      ON messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender    ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_notifications_uid   ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read  ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_reviews_uid         ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_target      ON reviews(target_id, target_type);
CREATE INDEX IF NOT EXISTS idx_permissions_admin   ON permissions(admin_id);
CREATE INDEX IF NOT EXISTS idx_sessions_uid        ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token      ON sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_verif_token_lookup  ON verification_tokens(token);
