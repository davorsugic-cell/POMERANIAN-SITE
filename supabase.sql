-- Pomeranian Toys – Supabase postavka
-- Pokrenuti u novom Supabase projektu: SQL Editor → New query → Run

-- 1) Tabele
create table if not exists public.stenci (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  ime         text not null,
  pol         text not null check (pol in ('m','z')),
  boja        text not null default 'narandzasta',
  status      text not null default 'dostupno' check (status in ('dostupno','rezervisano','prodato')),
  rodjen      date,
  opis        text default '',
  slika_url   text not null,
  slika_path  text
);

create table if not exists public.galerija (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  kategorija  text not null default 'ostalo' check (kategorija in ('stenci','odrasli','grooming','ostalo')),
  opis        text default '',
  slika_url   text not null,
  slika_path  text
);

-- 2) Admin lista: samo korisnici upisani ovdje mogu mijenjati sadržaj
create table if not exists public.admini (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admini enable row level security;
create policy "admini vide sebe" on public.admini for select to authenticated using (user_id = (select auth.uid()));

create or replace function public.je_admin() returns boolean
language sql stable security invoker set search_path = '' as $$
  select exists (select 1 from public.admini where user_id = (select auth.uid()));
$$;
revoke all on function public.je_admin() from public, anon;
grant execute on function public.je_admin() to authenticated;

-- 3) RLS: svi čitaju, samo admin mijenja
alter table public.stenci   enable row level security;
alter table public.galerija enable row level security;
create policy "stenci citanje"        on public.stenci   for select to anon, authenticated using (true);
create policy "stenci admin insert"   on public.stenci   for insert to authenticated with check (public.je_admin());
create policy "stenci admin update"   on public.stenci   for update to authenticated using (public.je_admin()) with check (public.je_admin());
create policy "stenci admin delete"   on public.stenci   for delete to authenticated using (public.je_admin());
create policy "galerija citanje"      on public.galerija for select to anon, authenticated using (true);
create policy "galerija admin insert" on public.galerija for insert to authenticated with check (public.je_admin());
create policy "galerija admin update" on public.galerija for update to authenticated using (public.je_admin()) with check (public.je_admin());
create policy "galerija admin delete" on public.galerija for delete to authenticated using (public.je_admin());

-- 4) Storage bucket (javno čitanje, admin upload/brisanje)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('slike','slike',true,10485760,array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;
create policy "slike upload"   on storage.objects for insert to authenticated with check (bucket_id = 'slike' and public.je_admin());
create policy "slike brisanje" on storage.objects for delete to authenticated using (bucket_id = 'slike' and public.je_admin());

-- 5) Admin korisnik: Authentication → Users → Add user (Auto Confirm), pa:
-- insert into public.admini (user_id) select id from auth.users where email = 'ADMIN_EMAIL';
