-- ===================================================================
-- EYK Mueblería · Supabase schema v2
-- ===================================================================

-- 1. Productos
create table if not exists public.products (
  id              text primary key,
  slug            text not null unique,
  category        text not null,
  name            text not null,
  description     text,
  image           text not null,
  highlight       boolean not null default false,
  page            integer,
  -- Precios
  price           integer,
  regular_price   integer,
  -- Info producto
  dimensions      text,
  delivery_days   integer,
  -- Flags
  is_best_seller  boolean not null default false,
  visible         boolean not null default true,
  -- Telas disponibles (array de IDs)
  fabric_options  text[] not null default '{}',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists products_category_idx     on public.products(category);
create index if not exists products_best_seller_idx  on public.products(is_best_seller) where is_best_seller = true;
create index if not exists products_visible_idx      on public.products(visible) where visible = true;

-- 2. Leads / cotizaciones
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  nombre      text not null,
  telefono    text not null,
  email       text,
  tipo        text,
  medidas     text,
  tela        text,
  madera      text,
  detalles    text not null,
  presupuesto text,
  ciudad      text,
  source      text not null default 'web',
  status      text not null default 'nuevo'
);

create index if not exists leads_status_idx  on public.leads(status);
create index if not exists leads_created_idx on public.leads(created_at desc);

-- 3. Entregas (fotos y reseñas de clientes)
create table if not exists public.deliveries (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  customer    text,
  location    text,
  product     text,
  image_url   text,
  review      text,
  stars       integer check (stars between 1 and 5),
  visible     boolean not null default true
);

-- 4. RLS
alter table public.products  enable row level security;
alter table public.leads      enable row level security;
alter table public.deliveries enable row level security;

-- Productos: lectura pública
drop policy if exists "products_read_public" on public.products;
create policy "products_read_public"
  on public.products for select
  to anon, authenticated
  using (visible = true);

-- Productos: escritura solo authenticated (admin)
drop policy if exists "products_write_authenticated" on public.products;
create policy "products_write_authenticated"
  on public.products for all
  to authenticated
  using (true)
  with check (true);

-- Leads: INSERT público, SELECT solo authenticated
drop policy if exists "leads_insert_anon" on public.leads;
create policy "leads_insert_anon"
  on public.leads for insert
  to anon
  with check (true);

drop policy if exists "leads_read_authenticated" on public.leads;
create policy "leads_read_authenticated"
  on public.leads for select
  to authenticated
  using (true);

-- Entregas: lectura pública de las visibles
drop policy if exists "deliveries_read_public" on public.deliveries;
create policy "deliveries_read_public"
  on public.deliveries for select
  to anon, authenticated
  using (visible = true);

drop policy if exists "deliveries_write_authenticated" on public.deliveries;
create policy "deliveries_write_authenticated"
  on public.deliveries for all
  to authenticated
  using (true)
  with check (true);
