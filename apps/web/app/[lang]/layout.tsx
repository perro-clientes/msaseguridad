import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { hasLocale, locales } from "@/lib/i18n";
import { site } from "@/lib/site";
import { indexable, pageMetadata } from "@/lib/seo";
import { JsonLd, organizationLd } from "@/components/seo/json-ld";
import { getDictionary } from "@/content/dictionaries";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  const base = pageMetadata({ locale: lang, path: "/", description: dict.meta.description });
  return {
    ...base,
    metadataBase: new URL(site.url),
    title: { default: dict.meta.title, template: `%s — ${site.name}` },
    openGraph: { ...base.openGraph, title: dict.meta.title },
    twitter: { ...base.twitter, title: dict.meta.title },
    applicationName: site.name,
    authors: [{ name: site.legalName, url: site.url }],
    creator: site.legalName,
    publisher: site.legalName,
    category: "security",
    keywords:
      lang === "es"
        ? ["seguridad aeroportuaria", "seguridad privada", "Ezeiza", "control de pasajeros", "control de equipaje", "seguridad en rampa", "seguridad de carga aérea", "aerolíneas"]
        : ["airport security", "aviation security", "Ezeiza", "passenger screening", "baggage screening", "ramp security", "air cargo security", "airlines"],
    formatDetection: { telephone: false, email: false, address: false },
    robots: indexable
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
      : { index: false, follow: false },
    ...(process.env.GOOGLE_SITE_VERIFICATION && {
      verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
    }),
  };
}

export const viewport: Viewport = { themeColor: "#151515", colorScheme: "light" };

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenido"
          className="label sr-only z-[60] rounded bg-ink px-3 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {lang === "es" ? "Saltar al contenido" : "Skip to content"}
        </a>
        <Header locale={lang} nav={dict.nav} />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer locale={lang} dict={dict} />
        <JsonLd data={organizationLd(lang, dict.meta.description)} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
