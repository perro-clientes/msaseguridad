export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/**
 * Arma un href público. El idioma por defecto (es) va sin prefijo:
 * /servicios en español, /en/servicios en inglés. El proxy reescribe
 * las rutas sin prefijo a /es internamente.
 */
export function href(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean || "/";
  return `/${locale}${clean}`;
}

/** Quita el prefijo de idioma de un pathname público. */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  if (first && hasLocale(first)) return `/${rest.join("/")}`;
  return pathname || "/";
}
