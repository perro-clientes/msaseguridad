-- Prueba de aislamiento multi-tenant y permisos. Corre todo dentro de una transacción
-- que se revierte al final: no deja datos. Uso:
--   psql "$SUPABASE_DB_URL" -X -f supabase/tests/rls_aislamiento.sql

\set ON_ERROR_ROLLBACK on
\pset footer off
begin;

-- ---------- datos de prueba (todo se revierte al final) ----------
insert into auth.users (id, email) values
  ('00000000-0000-0000-0000-0000000000a1', 'admin-a@test.local'),
  ('00000000-0000-0000-0000-0000000000a2', 'lider-a@test.local'),
  ('00000000-0000-0000-0000-0000000000a3', 'operario-a@test.local'),
  ('00000000-0000-0000-0000-0000000000b1', 'admin-b@test.local'),
  ('00000000-0000-0000-0000-0000000000ff', 'super@test.local');
update public.profiles set is_superadmin = true where id = '00000000-0000-0000-0000-0000000000ff';

insert into public.organizations (id, name, slug) values
  ('00000000-0000-0000-0000-00000000000a', 'Empresa A', 'empresa-a'),
  ('00000000-0000-0000-0000-00000000000b', 'Empresa B', 'empresa-b');

insert into public.members (org_id, user_id, role, full_name, email, legajo) values
  ('00000000-0000-0000-0000-00000000000a', '00000000-0000-0000-0000-0000000000a1', 'admin', 'Admin A', 'admin-a@test.local', 'A1'),
  ('00000000-0000-0000-0000-00000000000a', '00000000-0000-0000-0000-0000000000a2', 'lider', 'Líder A', 'lider-a@test.local', 'A2'),
  ('00000000-0000-0000-0000-00000000000a', '00000000-0000-0000-0000-0000000000a3', 'operario', 'Operario A', 'operario-a@test.local', 'A3'),
  ('00000000-0000-0000-0000-00000000000b', '00000000-0000-0000-0000-0000000000b1', 'admin', 'Admin B', 'admin-b@test.local', 'B1');

-- ---------- Admin de A ----------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', true);
\echo '1. Admin A — organizaciones que ve (esperado: solo Empresa A)'
select name from public.organizations order by name;
\echo '2. Admin A — personas que ve (esperado: las 3 de A)'
select full_name from public.members order by full_name;
\echo '3. Admin A — auditoría que ve (esperado: solo filas de A)'
select distinct o.name from public.audit_log l join public.organizations o on o.id = l.org_id;
\echo '4. Admin A intenta cargar una persona en B (esperado: ERROR por RLS)'
insert into public.members (org_id, role, full_name, email) values ('00000000-0000-0000-0000-00000000000b', 'operario', 'Intruso', 'x@test.local');
\echo '5. Admin A intenta hacerse superadmin (esperado: ERROR)'
update public.profiles set is_superadmin = true where id = '00000000-0000-0000-0000-0000000000a1';
\echo '6. Admin A intenta editar Empresa B (esperado: UPDATE 0)'
update public.organizations set name = 'Hackeada' where id = '00000000-0000-0000-0000-00000000000b';
reset role;

-- ---------- Líder de A ----------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', true);
\echo '7. Líder A da de alta un operario en A (esperado: INSERT 1)'
insert into public.members (org_id, role, full_name, email) values ('00000000-0000-0000-0000-00000000000a', 'operario', 'Nuevo Operario', 'nuevo@test.local');
\echo '8. Líder A intenta crear un admin (esperado: ERROR solo un administrador…)'
insert into public.members (org_id, role, full_name, email) values ('00000000-0000-0000-0000-00000000000a', 'admin', 'Otro Admin', 'otro@test.local');
\echo '9. Líder A intenta ascenderse a admin (esperado: ERROR)'
update public.members set role = 'admin' where user_id = '00000000-0000-0000-0000-0000000000a2';
\echo '10. Líder A — auditoría (esperado: 0 filas, no es rol de gestión de auditoría)'
select count(*) as filas from public.audit_log;
reset role;

-- ---------- Operario de A ----------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a3","role":"authenticated"}', true);
\echo '11. Operario A intenta dar de alta a alguien (esperado: ERROR por RLS)'
insert into public.members (org_id, role, full_name, email) values ('00000000-0000-0000-0000-00000000000a', 'operario', 'Otro', 'otro2@test.local');
\echo '12. Operario A intenta cambiarse el rol (esperado: UPDATE 0)'
update public.members set role = 'jefe_operaciones' where user_id = '00000000-0000-0000-0000-0000000000a3';
reset role;

-- ---------- Admin de B ----------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', true);
\echo '13. Admin B — organizaciones y personas (esperado: solo Empresa B / Admin B)'
select name from public.organizations;
select full_name from public.members;
reset role;

-- ---------- Sin sesión (anon) ----------
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
\echo '14. Anónimo — organizaciones y personas (esperado: ERROR de permisos o 0 filas)'
select count(*) from public.organizations;
select count(*) from public.members;
reset role;

-- ---------- Superadmin ----------
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000ff","role":"authenticated"}', true);
\echo '15. Superadmin — organizaciones (esperado: A y B)'
select name from public.organizations order by name;
\echo '16. Superadmin crea una organización (esperado: INSERT 1)'
insert into public.organizations (name, slug) values ('Empresa C', 'empresa-c');
reset role;

rollback;
\echo 'ROLLBACK: no quedó nada de la prueba.'
