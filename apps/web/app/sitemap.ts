import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { absoluteUrl, languageAlternates } from "@/lib/seo";
import { serviceCategories } from "@/content/services";

type Entry = { path: string; priority: number; changeFrequency: "monthly" | "yearly" };

const pages: Entry[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/servicios", priority: 0.9, changeFrequency: "monthly" },
  ...serviceCategories.map(
    (c): Entry => ({ path: `/servicios/${c.slug}`, priority: 0.8, changeFrequency: "monthly" }),
  ),
  { path: "/nosotros", priority: 0.7, changeFrequency: "yearly" },
  { path: "/contacto", priority: 0.7, changeFrequency: "yearly" },
  { path: "/privacidad", priority: 0.2, changeFrequency: "yearly" },
];

/** Una entrada por idioma, cada una con sus alternativas hreflang. */
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, priority, changeFrequency }) =>
    locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      changeFrequency,
      priority,
      alternates: { languages: languageAlternates(path, absoluteUrl) },
    })),
  );
}
