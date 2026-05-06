-- NIKOLASS portfolio schema
-- Run via Supabase Dashboard → SQL Editor, or `supabase db push` if using the CLI.

create extension if not exists "pgcrypto";

-- ── HIGH SCORES (Snake) ──────────────────────────────────────────────
create table if not exists public.scores (
  id          uuid primary key default gen_random_uuid(),
  initials    text not null check (length(initials) = 3 and initials ~ '^[A-Z0-9]{3}$'),
  score       int  not null check (score >= 0 and score <= 99999),
  played_at   timestamptz not null default now(),
  ip_hash     text  -- for soft anti-spam, never displayed
);
create index if not exists scores_score_desc on public.scores (score desc);

-- ── CONTACT MESSAGES ─────────────────────────────────────────────────
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  message     text not null,
  ip_hash     text,
  created_at  timestamptz not null default now()
);
create index if not exists contact_messages_created_desc on public.contact_messages (created_at desc);

-- ── VISITOR PRESENCE (rolling 60s window) ────────────────────────────
create table if not exists public.presence_pings (
  visitor_id  text primary key,
  last_seen   timestamptz not null default now()
);
create index if not exists presence_pings_last_seen on public.presence_pings (last_seen);

-- ── RLS ──────────────────────────────────────────────────────────────
-- All write paths go through the service role on the server (route handlers),
-- so we lock everything down to anon and rely on the service-role bypass.
alter table public.scores            enable row level security;
alter table public.contact_messages  enable row level security;
alter table public.presence_pings    enable row level security;

-- Allow public read of leaderboard top scores (we still query via service-role,
-- but this lets you build a client-side widget later if you want).
drop policy if exists "scores_public_read" on public.scores;
create policy "scores_public_read" on public.scores
  for select to anon, authenticated using (true);

-- contact_messages: no anon access; only service-role writes/reads.
-- presence_pings: no anon access; only service-role writes; counts read on server.
