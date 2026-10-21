-- Run once in Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Creates the memories table + private photo bucket. Each user can only touch their own rows/files.

create table if not exists public.memories (
  id uuid primary key,
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  created_at timestamptz not null,
  photo_path text not null,
  lat double precision,
  lng double precision,
  country_code text,
  country_name text,
  city text,
  restaurant_id text,
  dish_id text,
  note text not null default ''
);

alter table public.memories enable row level security;

drop policy if exists "own memories" on public.memories;
create policy "own memories" on public.memories
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create index if not exists memories_user_id_idx on public.memories (user_id);

-- Private bucket; files live at photos/<user id>/<memory id>.jpg
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('photos', 'photos', false, 5242880, array['image/jpeg'])
on conflict (id) do nothing;

drop policy if exists "own photos" on storage.objects;
create policy "own photos" on storage.objects
  for all to authenticated
  using (bucket_id = 'photos' and (storage.foldername(name))[1] = (select auth.uid())::text)
  with check (bucket_id = 'photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
