-- =============================================================================
-- Base de la plataforma: organizaciones (multi-tenant), personas, roles,
-- RLS por organización y auditoría. Ver docs/platform/modelo.md.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Tipos
-- ---------------------------------------------------------------------------
create type public.member_role as enum ('operario', 'lider', 'jefe_operaciones', 'rrhh', 'admin');
create type public.member_category as enum ('RP', 'RX');
create type public.employment_type as enum ('full', 'part');

-- ---------------------------------------------------------------------------
-- Organizaciones
-- ---------------------------------------------------------------------------
create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  -- Branding: { "logo_url": "...", "primary_color": "#2a5cb3" }
  branding jsonb not null default '{}'::jsonb,
  locales text[] not null default array['es'],
  default_locale text not null default 'es',
  timezone text not null default 'America/Argentina/Buenos_Aires',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint default_locale_enabled check (default_locale = any (locales))
);

-- ---------------------------------------------------------------------------
-- Perfiles (1:1 con auth.users)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  is_superadmin boolean not null default false,
  -- Primer acceso: obliga a cambiar la contraseña asignada.
  must_change_password boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Crea el perfil al dar de alta un usuario en Auth.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Personas dentro de una organización (operarios y roles de gestión)
-- ---------------------------------------------------------------------------
create table public.members (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations (id) on delete restrict,
  user_id uuid references auth.users (id) on delete set null,
  role public.member_role not null default 'operario',
  full_name text not null,
  email text not null,
  legajo text,
  category public.member_category,
  employment public.employment_type,
  -- Baja lógica: nunca se borra a una persona (se pierde el historial).
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (org_id, email),
  unique (org_id, legajo),
  unique (org_id, user_id)
);

create index members_user_id_idx on public.members (user_id);
create index members_org_id_idx on public.members (org_id);

-- ---------------------------------------------------------------------------
-- Helpers para RLS (security definer: leen members sin pasar por su propia RLS)
-- ---------------------------------------------------------------------------
create function public.is_superadmin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (select is_superadmin from public.profiles where id = (select auth.uid())),
    false
  );
$$;

-- ¿El usuario actual pertenece (activo) a la organización?
create function public.is_member_of(target_org uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.members
    where org_id = target_org and user_id = (select auth.uid()) and active
  );
$$;

-- ¿El usuario actual tiene alguno de estos roles en la organización?
create function public.has_role(target_org uuid, roles public.member_role[])
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.members
    where org_id = target_org and user_id = (select auth.uid()) and active and role = any (roles)
  );
$$;

-- ---------------------------------------------------------------------------
-- updated_at automático
-- ---------------------------------------------------------------------------
create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger organizations_updated_at before update on public.organizations
  for each row execute function public.set_updated_at();
create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger members_updated_at before update on public.members
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Auditoría: toda alta, cambio o baja de tablas de negocio
-- ---------------------------------------------------------------------------
create table public.audit_log (
  id bigint generated always as identity primary key,
  org_id uuid references public.organizations (id) on delete set null,
  actor_id uuid,
  action text not null check (action in ('insert', 'update', 'delete')),
  table_name text not null,
  record_id text,
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz not null default now()
);

create index audit_log_org_created_idx on public.audit_log (org_id, created_at desc);
create index audit_log_record_idx on public.audit_log (table_name, record_id);

create function public.audit_trigger()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  row_old jsonb := case when tg_op in ('UPDATE', 'DELETE') then to_jsonb(old) end;
  row_new jsonb := case when tg_op in ('INSERT', 'UPDATE') then to_jsonb(new) end;
  row_any jsonb := coalesce(row_new, row_old);
begin
  -- No registrar updates que no cambian nada.
  if tg_op = 'UPDATE' and row_old = row_new then
    return new;
  end if;

  insert into public.audit_log (org_id, actor_id, action, table_name, record_id, old_data, new_data)
  values (
    case when tg_table_name = 'organizations' then (row_any ->> 'id')::uuid
         else (row_any ->> 'org_id')::uuid end,
    (select auth.uid()),
    lower(tg_op),
    tg_table_name,
    row_any ->> 'id',
    row_old,
    row_new
  );
  return coalesce(new, old);
end;
$$;

create trigger organizations_audit after insert or update or delete on public.organizations
  for each row execute function public.audit_trigger();
create trigger members_audit after insert or update or delete on public.members
  for each row execute function public.audit_trigger();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.members enable row level security;
alter table public.audit_log enable row level security;

-- Organizaciones: las ven sus miembros; las edita su admin; las crea/borra el superadmin.
create policy "organizations: ver propias" on public.organizations
  for select to authenticated
  using (public.is_member_of(id) or public.is_superadmin());

create policy "organizations: editar admin" on public.organizations
  for update to authenticated
  using (public.has_role(id, array['admin']::public.member_role[]) or public.is_superadmin())
  with check (public.has_role(id, array['admin']::public.member_role[]) or public.is_superadmin());

create policy "organizations: alta superadmin" on public.organizations
  for insert to authenticated
  with check (public.is_superadmin());

create policy "organizations: baja superadmin" on public.organizations
  for delete to authenticated
  using (public.is_superadmin());

-- Perfiles: cada uno ve y edita el suyo; el superadmin ve todos.
-- (is_superadmin no se puede auto-asignar: ver trigger más abajo.)
create policy "profiles: ver propio" on public.profiles
  for select to authenticated
  using (id = (select auth.uid()) or public.is_superadmin());

create policy "profiles: editar propio" on public.profiles
  for update to authenticated
  using (id = (select auth.uid()) or public.is_superadmin())
  with check (id = (select auth.uid()) or public.is_superadmin());

create function public.protect_superadmin_flag()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  -- Sin sesión de usuario (SQL editor o clave de servidor) se permite: es acceso de confianza.
  if (select auth.uid()) is not null
     and new.is_superadmin is distinct from old.is_superadmin and not public.is_superadmin() then
    raise exception 'Solo un superadmin puede cambiar is_superadmin';
  end if;
  return new;
end;
$$;

create trigger profiles_protect_superadmin before update on public.profiles
  for each row execute function public.protect_superadmin_flag();

-- Personas: las ve cualquier miembro de la misma organización;
-- el ABM lo hacen Líder, Jefe de Operaciones, RRHH y Admin. No hay borrado (baja lógica).
create policy "members: ver misma org" on public.members
  for select to authenticated
  using (public.is_member_of(org_id) or public.is_superadmin());

create policy "members: alta gestion" on public.members
  for insert to authenticated
  with check (
    public.has_role(org_id, array['lider', 'jefe_operaciones', 'rrhh', 'admin']::public.member_role[])
    or public.is_superadmin()
  );

create policy "members: editar gestion" on public.members
  for update to authenticated
  using (
    public.has_role(org_id, array['lider', 'jefe_operaciones', 'rrhh', 'admin']::public.member_role[])
    or public.is_superadmin()
  )
  with check (
    public.has_role(org_id, array['lider', 'jefe_operaciones', 'rrhh', 'admin']::public.member_role[])
    or public.is_superadmin()
  );

-- Solo el Admin (o superadmin) puede dar roles de gestión; el resto solo administra operarios.
create function public.protect_member_role()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  -- Sin sesión de usuario (SQL editor o clave de servidor) se permite: es acceso de confianza.
  if (select auth.uid()) is not null
     and (tg_op = 'INSERT' or new.role is distinct from old.role)
     and new.role <> 'operario'
     and not (public.has_role(new.org_id, array['admin']::public.member_role[]) or public.is_superadmin()) then
    raise exception 'Solo un administrador puede asignar el rol %', new.role;
  end if;
  return new;
end;
$$;

create trigger members_protect_role before insert or update on public.members
  for each row execute function public.protect_member_role();

-- Auditoría: solo lectura para Jefe de Operaciones, RRHH y Admin. Nadie escribe a mano.
create policy "audit_log: ver gestion" on public.audit_log
  for select to authenticated
  using (
    public.has_role(org_id, array['jefe_operaciones', 'rrhh', 'admin']::public.member_role[])
    or public.is_superadmin()
  );
