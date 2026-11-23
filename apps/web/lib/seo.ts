import type { Metadata } from "next";
import { href, locales, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

/**
 * Solo se indexa producción. Los previews de Vercel (VERCEL_ENV=preview) y
 * `next dev` salen con noindex y robots.txt bloqueando todo.
 */
export const indexable = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production";

const ogLocale: Record<Locale, string> = { es: "es_AR", en: "en_US" };

export const ogImage = (locale: Locale) => ({
  url: `/og/og-${locale}.jpg`,
  width: 1200,
  height: 630,
  alt: locale === "es" ? "MSA Seguridad — Protegemos cada vuelo" : "MSA Seguridad — We protect every flight",
});

/** URL absoluta de una ruta pública. */
export const absoluteUrl = (locale: Locale, path = "/") => new URL(href(locale, path), site.url).toString();

/** hreflang de una ruta para todos los idiomas + x-default (español). */
export const languageAlternates = (path: string, toUrl: (l: Locale, p: string) => string = href) => ({
  ...Object.fromEntries(locales.map((l) => [l, toUrl(l, path)])),
  "x-default": toUrl("es", path),
});

/**
 * Metadata estándar de una página: title, description, canonical, hreflang,
 * Open Graph y Twitter. Sin `title` = home (usa el título por defecto del layout).
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title?: string;
  description: string;
}): Metadata {
  const fullTitle = title ? `${title} — ${site.name}` : undefined;
  const url = href(locale, path);
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      siteName: site.name,
      url,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      ...(fullTitle && { title: fullTitle }),
      description,
      images: [ogImage(locale)],
    },
    twitter: {
      card: "summary_large_image",
      ...(fullTitle && { title: fullTitle }),
      description,
      images: [ogImage(locale).url],
    },
  };
}
