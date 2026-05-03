-- ===================================================================
-- EYK Mueblería · Supabase schema
-- Ejecutar este SQL en Supabase Studio → SQL Editor.
-- ===================================================================

-- 1. Productos del catálogo (opcional, también funciona desde JSON local)
create table if not exists public.products (
  id          text primary key,
  slug        text not null unique,
  category    text not null,
  name        text not null,
  description text,
  image       text not null,
  highlight   boolean not null default false,
  page        integer,
  created_at  timestamptz not null default now()
);

create index if not exists products_category_idx on public.products(category);
create index if not exists products_highlight_idx on public.products(highlight) where highlight = true;

-- 2. Leads / cotizaciones del formulario "A la medida"
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
  status      text not null default 'nuevo'  -- nuevo · en_seguimiento · cerrado_ganado · cerrado_perdido
);

create index if not exists leads_status_idx on public.leads(status);
create index if not exists leads_created_idx on public.leads(created_at desc);

-- 3. RLS — productos públicos, leads solo escritura desde anon
alter table public.products enable row level security;
alter table public.leads    enable row level security;

-- Lectura pública de productos
drop policy if exists "products_read_public" on public.products;
create policy "products_read_public"
  on public.products for select
  to anon, authenticated
  using (true);

-- Insertar leads desde el sitio público (anon puede INSERT, no SELECT)
drop policy if exists "leads_insert_anon" on public.leads;
create policy "leads_insert_anon"
  on public.leads for insert
  to anon
  with check (true);

-- Solo authenticated (admin) puede leer leads
drop policy if exists "leads_read_authenticated" on public.leads;
create policy "leads_read_authenticated"
  on public.leads for select
  to authenticated
  using (true);
