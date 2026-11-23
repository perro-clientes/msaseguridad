# MSA Seguridad — sitio web + plataforma operativa

Monorepo pnpm de PERRO Agency para MSA Seguridad (seguridad aeroportuaria, Ezeiza).

## Estructura

- `apps/web` — sitio institucional (Next.js 16, App Router, Tailwind 4). Inspirado en el layout del template Webflow Cargo+ (solo como referencia; código y assets propios).
- `apps/platform` — (pendiente) plataforma multi-tenant del PRD: webapp mobile-first para operarios + panel admin.
- `packages/*` — (pendiente) UI y utilidades compartidas.

## Stack

Next.js · TypeScript · Tailwind · shadcn/ui · Supabase · Resend · Vercel · Cloudflare (DNS) · GitHub (org PERRO).

## Decisiones vigentes

- El alcance de la plataforma es el PRD acordado; el doc "APP MSA" del cliente no suma alcance.
- Los datos de la plataforma deben residir en Argentina (Supabase Cloud no tiene región AR: definir hosting).
- Idiomas configurables por organización en la plataforma.
- Operarios usan Android de la empresa.

## Sitio (`apps/web`)

- Español sin prefijo (`/servicios`), inglés con `/en/...`. `proxy.ts` reescribe a `app/[lang]`; `/es/...` redirige a la URL sin prefijo.
- Textos en `content/es.ts` y `content/en.ts` (el tipo sale de es.ts, así en.ts no puede quedar incompleto). Servicios en `content/services.ts`.
- Tokens de diseño solo en `app/globals.css` (`@theme`); no usar hex sueltos en componentes.
- `cacheComponents` está activo: nada de `new Date()` / valores no deterministas sin `"use cache"`.
- Contacto: Server Action + Resend. Sin `RESEND_API_KEY` en dev, loguea y no envía (ver `.env.example`).
- Imágenes: `components/ui/media.tsx` muestra un placeholder etiquetado hasta tener fotos reales de MSA. Los assets van en `apps/web/public/logos` y `apps/web/public/images`.
- SEO: cada página arma su metadata con `pageMetadata()` de `lib/seo.ts` (canonical, hreflang, OG, Twitter). JSON-LD en `components/seo/json-ld.tsx`. Imágenes OG estáticas en `public/og/`. Solo producción se indexa (`VERCEL_ENV`); previews salen con noindex.
- Logo: `components/ui/logo.tsx` (versión blanca y negra); el header elige según el fondo que tenga detrás.
- Documentos del cliente (PRD, planillas, mockups) no se versionan: quedan fuera del repo o en `docs/cliente/` (ignorado).

## Comandos

- `pnpm install` (una vez) y después `pnpm dev` / `pnpm build` / `pnpm lint` desde la raíz (alias de `dev:web` / `build:web`).
