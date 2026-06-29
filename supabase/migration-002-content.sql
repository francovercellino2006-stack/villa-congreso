-- ============================================================
-- Migration 002 — Content tables
-- Pegar y ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================================

-- ── 5. Noticias ─────────────────────────────────────────────
create table if not exists noticias (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  excerpt     text,
  content     text,
  image_url   text,
  category    text not null,
  pinned      boolean not null default false,
  autor_id    uuid references profiles(id),
  created_at  timestamptz not null default now()
);

alter table noticias enable row level security;
create policy "noticias: public read" on noticias for select using (true);

-- ── 6. Eventos ──────────────────────────────────────────────
create table if not exists eventos (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  date        date not null,
  time        text,
  location    text,
  description text,
  category    text,
  cupos       integer,
  inscriptos  integer default 0,
  autor_id    uuid references profiles(id),
  created_at  timestamptz not null default now()
);

alter table eventos enable row level security;
create policy "eventos: public read" on eventos for select using (true);

-- ── 7. Horarios ─────────────────────────────────────────────
create table if not exists horarios (
  id          uuid primary key default gen_random_uuid(),
  deporte     text not null,
  categoria   text not null,
  profesor    text not null,
  dias        text[] not null,
  horario     text not null,
  lugar       text not null,
  created_at  timestamptz not null default now()
);

alter table horarios enable row level security;
create policy "horarios: public read" on horarios for select using (true);

-- ── 8. Partidos ─────────────────────────────────────────────
create table if not exists partidos (
  id          uuid primary key default gen_random_uuid(),
  deporte     text not null,
  categoria   text not null,
  local       text not null,
  visitante   text not null,
  fecha       date not null,
  hora        text,
  lugar       text,
  resultado   text,
  created_at  timestamptz not null default now()
);

alter table partidos enable row level security;
create policy "partidos: public read" on partidos for select using (true);

-- ── 9. Avisos ───────────────────────────────────────────────
create table if not exists avisos (
  id             uuid primary key default gen_random_uuid(),
  autor_id       uuid references profiles(id),
  autor_name     text not null,
  comunidad_id   text not null,
  deporte        text not null,
  categoria      text,
  tipo           text not null check (tipo in ('general', 'suspensión', 'recordatorio', 'resultado', 'convocatoria')),
  titulo         text not null,
  contenido      text not null,
  fijado         boolean not null default false,
  created_at     timestamptz not null default now()
);

alter table avisos enable row level security;
create policy "avisos: public read" on avisos for select using (true);
