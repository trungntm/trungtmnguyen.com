-- Create guestbook table
create table if not exists guestbook (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  message text not null,
  email text,
  website text,
  is_anonymous boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Index for faster queries (latest first)
create index guestbook_created_at_idx on guestbook (created_at desc);

-- Policy: allow read for everyone
create policy "Anyone can read guestbook"
  on guestbook for select
  using (true);

-- Policy: allow insert
-- Logged in users: can insert with their user_id
-- Anonymous: can insert if is_anonymous = true

-- Insert policies
CREATE POLICY "Allow inserts for anonymous"
ON guestbook FOR INSERT
TO authenticated
WITH CHECK ((auth.jwt() ->> 'is_anonymous')::boolean = true);

CREATE POLICY "Allow inserts for logged-in"
ON guestbook FOR INSERT
TO authenticated
WITH CHECK ((auth.jwt() ->> 'is_anonymous')::boolean = false);


-- Enable RLS
alter table guestbook enable row level security;

-- 2. Create trigger function (idempotent)
CREATE OR REPLACE FUNCTION public.update_guestbook_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

-- 3. Create trigger (drop first if exists)
drop trigger if exists guestbook_set_updated_at on guestbook;

create trigger guestbook_set_updated_at
before update on guestbook
for each row
execute procedure update_guestbook_updated_at();
