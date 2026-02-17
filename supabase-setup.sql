-- ============================================================
-- Smart Bookmark App — Supabase Database Setup
-- ============================================================
-- Run this SQL in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- It creates the bookmarks table, indexes, RLS policies, and
-- enables Realtime on the table.
-- ============================================================

-- 1. Create the bookmarks table
create table if not exists public.bookmarks (
  id         uuid        default gen_random_uuid() primary key,
  user_id    uuid        references auth.users(id) on delete cascade not null,
  title      text        not null,
  url        text        not null,
  created_at timestamptz default now() not null
);

-- 2. Index for fast per-user lookups
create index if not exists bookmarks_user_id_idx on public.bookmarks(user_id);

-- 3. Enable Row Level Security
alter table public.bookmarks enable row level security;

-- 4. RLS policies — users can only see/create/delete their OWN bookmarks
create policy "Users can view own bookmarks"
  on public.bookmarks for select
  using (auth.uid() = user_id);

create policy "Users can insert own bookmarks"
  on public.bookmarks for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own bookmarks"
  on public.bookmarks for delete
  using (auth.uid() = user_id);

-- 5. Enable Realtime on the bookmarks table
alter publication supabase_realtime add table public.bookmarks;
