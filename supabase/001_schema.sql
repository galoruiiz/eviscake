-- ============================================================
-- Evis Cake — Schema inicial
-- Correr UNA SOLA VEZ en: Supabase Dashboard → SQL Editor → New query
-- ============================================================

create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- CATEGORIAS
-- ------------------------------------------------------------
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  active boolean not null default true,
  "order" integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- PRODUCTOS
-- ------------------------------------------------------------
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  price numeric not null default 0 check (price >= 0),
  image text not null default '',
  category_id uuid references categories(id) on delete set null,
  tag text,
  available boolean not null default true,
  "order" integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- PROFILES — qué usuarios de Supabase Auth son administradores.
-- Existe como tabla aparte (en vez de hardcodear en el código)
-- para poder sumar más admins/editores en el futuro sin tocar nada.
-- ------------------------------------------------------------
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'admin' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- updated_at automático
-- ------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_categories_updated_at on categories;
create trigger trg_categories_updated_at
  before update on categories
  for each row execute function set_updated_at();

drop trigger if exists trg_products_updated_at on products;
create trigger trg_products_updated_at
  before update on products
  for each row execute function set_updated_at();

-- ------------------------------------------------------------
-- Helper: ¿el usuario logueado es admin/editor?
-- (security definer para poder consultar "profiles" desde las
-- policies de otras tablas sin loopear con RLS de profiles)
-- ------------------------------------------------------------
create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$ language sql security definer stable;

-- ------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ------------------------------------------------------------
alter table categories enable row level security;
alter table products enable row level security;
alter table profiles enable row level security;

-- Público (sin login): solo lectura de lo activo/disponible
drop policy if exists "public_read_active_categories" on categories;
create policy "public_read_active_categories" on categories
  for select using (active = true);

drop policy if exists "public_read_active_products" on products;
create policy "public_read_active_products" on products
  for select using (available = true);

-- Admin autenticado: control total (incluye ver los inactivos)
drop policy if exists "admin_manage_categories" on categories;
create policy "admin_manage_categories" on categories
  for all using (is_admin()) with check (is_admin());

drop policy if exists "admin_manage_products" on products;
create policy "admin_manage_products" on products
  for all using (is_admin()) with check (is_admin());

-- Cada usuario puede leer su propio perfil (para saber su rol)
drop policy if exists "read_own_profile" on profiles;
create policy "read_own_profile" on profiles
  for select using (auth.uid() = id);

-- ------------------------------------------------------------
-- STORAGE — bucket para fotos de productos subidas desde el panel
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "public_read_product_images" on storage.objects;
create policy "public_read_product_images" on storage.objects
  for select using (bucket_id = 'product-images');

drop policy if exists "admin_upload_product_images" on storage.objects;
create policy "admin_upload_product_images" on storage.objects
  for insert with check (bucket_id = 'product-images' and is_admin());

drop policy if exists "admin_update_product_images" on storage.objects;
create policy "admin_update_product_images" on storage.objects
  for update using (bucket_id = 'product-images' and is_admin());

drop policy if exists "admin_delete_product_images" on storage.objects;
create policy "admin_delete_product_images" on storage.objects
  for delete using (bucket_id = 'product-images' and is_admin());
