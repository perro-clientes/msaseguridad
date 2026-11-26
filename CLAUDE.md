# MSA Seguridad — sitio web + plataforma operativa

Monorepo pnpm de PERRO Agency para MSA Seguridad (seguridad aeroportuaria, Ezeiza).

## Estructura

- `apps/web` — sitio institucional (Next.js 16, App Router, Tailwind 4). Inspirado en el layout del template Webflow Cargo+ (solo como referencia; código y assets propios).
- `apps/platform` — plataforma multi-tenant del PRD (webapp mobile-first para operarios + panel admin). Next 16 + shadcn (base-nova) + Supabase. Puerto 3001. Modelo de datos y reglas en `docs/platform/modelo.md`.
- `packages/*` — (pendiente) UI y utilidades compartidas.

## Stack

Next.js · TypeScript · Tailwind · shadcn/ui · Supabase · Resend · Vercel · Cloudflare (DNS) · GitHub (org PERRO).

## Decisiones vigentes

- El alcance de la plataforma es el PRD acordado; el doc "APP MSA" del cliente no suma alcance.
- Plataforma = MVP para probar con el cliente: Supabase Cloud por ahora (residencia de datos en AR queda para cuando escale).
- Idiomas configurables por organización en la plataforma.
- Operarios usan Android de la empresa.

## Sitio (`apps/web`)

- Español sin prefijo (`/servicios`), inglés con `/en/...`. `proxy.ts` reescribe a `app/[lang]`; `/es/...` redirige a la URL sin prefijo.
- Textos en `content/es.ts` y `content/en.ts` (el tipo sale de es.ts, así en.ts no puede quedar incompleto). Servicios en `content/services.ts`.
- Tokens de diseño solo en `app/globals.css` (`@theme`); no usar hex sueltos en componentes.
- `cacheComponents` está activo: nada de `new Date()` / valores no deterministas sin `"use cache"`.
- Contacto: Server Action + Resend. Sin `RESEND_API_KEY` en dev, loguea y no envía (ver `.env.example`).
- Imágenes: `components/ui/media.tsx` muestra un placeholder etiquetado hasta tener fotos reales de MSA. Los assets van en `apps/web/public/logos` y `apps/web/public/images`.
- SEO: cada página arma su metadata con `pageMetadata()` de `lib/seo.ts` (canonical, hreflang, OG, Twitter). JSON-LD en `components/seo/json-ld.tsx`. Imágenes OG estáticas en `public/og/`. La URL base sale de `NEXT_PUBLIC_SITE_URL` o, si no está, del dominio de producción de Vercel (`lib/site.ts`). Solo se indexa producción con dominio propio; previews y *.vercel.app salen con noindex (robots.txt deja pasar a los bots de vista previa de links).
- Logo: `components/ui/logo.tsx` (versión blanca y negra); el header elige según el fondo que tenga detrás.
- Documentos del cliente (PRD, planillas, mockups) no se versionan: quedan fuera del repo o en `docs/cliente/` (ignorado).

## Comandos

- `pnpm install` (una vez) y después `pnpm dev` / `pnpm build` / `pnpm lint` desde la raíz (alias de `dev:web` / `build:web`).

## Plataforma (`apps/platform`)

- Supabase: clientes en `lib/supabase/` (`server.ts`, `client.ts`); `proxy.ts` refresca la sesión y manda al login.
- Migraciones SQL en `apps/platform/supabase/migrations/` (fuente de verdad del esquema). Todo dato de negocio lleva `org_id` + RLS; auditoría por triggers.
- **Cada tabla nueva necesita sus `GRANT` explícitos** a `authenticated` (este proyecto no los da por defecto: sin ellos todo falla con "permission denied"). `anon` no recibe nada. Ver `20261126000100_grants.sql`.
- Se aplican con `psql "$SUPABASE_DB_URL" -X -v ON_ERROR_STOP=1 --single-transaction -f <migración>` (la URL está en `apps/platform/.env.local`). Después correr `supabase/tests/rls_aislamiento.sql` (se revierte solo).
- Roles: `operario`, `lider`, `jefe_operaciones`, `rrhh`, `admin` (por org) y `is_superadmin` (global, en `profiles`).
- Planillas: estados pendiente → en_curso → enviada → validada_lider → aprobada / rechazada (la corrige el Líder). "Firma" = nombre + legajo + hora.
- Comandos: `pnpm dev:platform` / `pnpm build:platform`.

