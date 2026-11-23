import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, locales, href } from "@/lib/i18n";
import { site } from "@/lib/site";
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
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.title, template: `%s — ${site.name}` },
    description: dict.meta.description,
    alternates: {
      canonical: href(lang),
      languages: { es: href("es"), en: href("en"), "x-default": href("es") },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: lang === "es" ? "es_AR" : "en_US",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export const viewport: Viewport = { themeColor: "#151515" };

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
      </body>
    </html>
  );
}
