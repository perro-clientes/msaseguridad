-- =============================================================================
-- Permisos de tabla para los roles de la API.
--
-- Este proyecto de Supabase no otorga privilegios automáticos sobre tablas nuevas
-- a `authenticated` / `anon`: sin estos GRANT, toda consulta falla con
-- "permission denied" antes de evaluar RLS. Regla: cada tabla nueva declara acá
-- (o en su migración) exactamente qué operaciones permite; RLS decide qué filas.
-- `anon` (sin sesión) no recibe nada.
-- =============================================================================

grant usage on schema public to authenticated;

-- Organizaciones: ver / editar (RLS: admin) / alta y baja (RLS: superadmin).
grant select, insert, update, delete on public.organizations to authenticated;

-- Perfiles: los crea el trigger de alta de usuario; cada uno ve y edita el suyo.
grant select, update on public.profiles to authenticated;

-- Personas: ABM sin borrado (baja lógica con `active = false`).
grant select, insert, update on public.members to authenticated;

-- Auditoría: solo lectura. La escriben los triggers (security definer).
grant select on public.audit_log to authenticated;

-- Helpers usados por las políticas de RLS.
grant execute on function public.is_superadmin() to authenticated;
grant execute on function public.is_member_of(uuid) to authenticated;
grant execute on function public.has_role(uuid, public.member_role[]) to authenticated;

-- Las funciones de trigger no se llaman directo desde la API.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.audit_trigger() from public, anon, authenticated;
