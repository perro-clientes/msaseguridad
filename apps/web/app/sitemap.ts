import type { MetadataRoute } from "next";
import { href, locales } from "@/lib/i18n";
import { site } from "@/lib/site";
import { serviceCategories } from "@/content/services";

const paths = ["/", "/servicios", "/nosotros", "/contacto", "/privacidad", ...serviceCategories.map((c) => `/servicios/${c.slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({
    url: new URL(href("es", p), site.url).toString(),
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, new URL(href(l, p), site.url).toString()])),
    },
  }));
}
