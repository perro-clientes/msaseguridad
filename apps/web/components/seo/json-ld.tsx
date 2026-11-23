import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

/** Inserta datos estructurados (schema.org) como JSON-LD. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escapamos "<" para que el contenido no pueda cerrar el <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const orgId = `${site.url}/#organization`;

/** Organización + sitio web: va en todas las páginas. */
export function organizationLd(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": orgId,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        logo: new URL("/icon.png", site.url).toString(),
        image: new URL(`/og/og-${locale}.jpg`, site.url).toString(),
        description,
        foundingDate: String(site.foundedYear),
        telephone: site.phone,
        email: site.email,
        areaServed: { "@type": "Place", name: "Aeropuerto Internacional Ministro Pistarini (EZE)" },
        address: [
          {
            "@type": "PostalAddress",
            streetAddress:
              "Edificio Corporativo, piso 3, of. 311, Aeropuerto Internacional Ministro Pistarini",
            addressLocality: "Ezeiza",
            addressRegion: "Buenos Aires",
            addressCountry: "AR",
          },
          {
            "@type": "PostalAddress",
            streetAddress: "Montes de Oca 530",
            addressLocality: "Tigre",
            addressRegion: "Buenos Aires",
            addressCountry: "AR",
          },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: site.phone,
          email: site.email,
          availableLanguage: ["Spanish", "English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: absoluteUrl(locale),
        name: site.name,
        inLanguage: locale === "es" ? "es-AR" : "en",
        publisher: { "@id": orgId },
      },
    ],
  };
}

export function faqLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function serviceLd(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url,
    provider: { "@id": orgId },
    areaServed: { "@type": "Place", name: "Aeropuerto Internacional Ministro Pistarini (EZE)" },
  };
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
