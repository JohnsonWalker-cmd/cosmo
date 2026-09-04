-- Cosmo v1 schema. Run in the Supabase SQL editor, or as a migration.
-- Catalog is publicly readable. Writes require a signed-in admin.
-- Guest checkout can insert orders. Guests cannot read other people's orders.

create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  sort_order int not null default 0
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  brand text,
  description text not null default '',
  category_id uuid references public.categories (id) on delete set null,
  image_urls text[] not null default '{}',
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- One variant dimension per product: shade, size, or a single default row.
create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  name text not null,
  option_type text not null check (option_type in ('shade', 'size', 'default')),
  sku text,
  price_cents integer not null check (price_cents >= 0),
  stock integer not null default 0 check (stock >= 0),
  stock_status text not null default 'in_stock'
    check (stock_status in ('in_stock', 'restocking', 'out')),
  swatch_url text,
  sort_order int not null default 0
);

create index if not exists product_variants_product_id_idx
  on public.product_variants (product_id);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  status text not null default 'paid'
    check (status in ('paid', 'ready_for_pickup', 'picked_up')),
  paystack_reference text unique,
  total_cents integer not null check (total_cents >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  variant_id uuid references public.product_variants (id) on delete set null,
  name_snapshot text not null,
  quantity integer not null check (quantity > 0),
  unit_price_cents integer not null check (unit_price_cents >= 0)
);

create index if not exists order_items_order_id_idx on public.order_items (order_id);

insert into public.categories (slug, name, sort_order)
values
  ('face', 'Face', 1),
  ('lips', 'Lips', 2),
  ('eyes', 'Eyes', 3),
  ('skincare', 'Skincare', 4),
  ('hair', 'Hair', 5)
on conflict (slug) do nothing;

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "Public read categories" on public.categories;
create policy "Public read categories"
  on public.categories for select
  using (true);

drop policy if exists "Public read products" on public.products;
create policy "Public read products"
  on public.products for select
  using (true);

drop policy if exists "Public read variants" on public.product_variants;
create policy "Public read variants"
  on public.product_variants for select
  using (true);

drop policy if exists "Admins write categories" on public.categories;
create policy "Admins write categories"
  on public.categories for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admins write products" on public.products;
create policy "Admins write products"
  on public.products for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admins write variants" on public.product_variants;
create policy "Admins write variants"
  on public.product_variants for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Guests insert orders" on public.orders;
create policy "Guests insert orders"
  on public.orders for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins read orders" on public.orders;
create policy "Admins read orders"
  on public.orders for select
  to authenticated
  using (true);

drop policy if exists "Admins update orders" on public.orders;
create policy "Admins update orders"
  on public.orders for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Guests insert order items" on public.order_items;
create policy "Guests insert order items"
  on public.order_items for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins read order items" on public.order_items;
create policy "Admins read order items"
  on public.order_items for select
  to authenticated
  using (true);

-- Public product image bucket. Create once; ignore if it already exists.
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;
