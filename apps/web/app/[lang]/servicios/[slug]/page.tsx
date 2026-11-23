import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { hasLocale, href, locales } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionaries";
import { getCategory, serviceCategories } from "@/content/services";
import { Media } from "@/components/ui/media";
import { Eyebrow } from "@/components/ui/typography";
import { CtaBand } from "@/components/sections/shared";

// Todos los slugs válidos se prerenderizan; un slug desconocido da 404.
// Permitimos que esa resolución bloquee (no hay shell instantáneo para slugs inventados).
export const instant = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => serviceCategories.map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/servicios/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const category = getCategory(slug);
  if (!hasLocale(lang) || !category) return {};
  return {
    title: category.title[lang],
    description: category.intro[lang],
    alternates: { canonical: href(lang, `/servicios/${slug}`) },
  };
}

export default async function ServiceCategoryPage({ params }: PageProps<"/[lang]/servicios/[slug]">) {
  const { lang, slug } = await params;
  const category = getCategory(slug);
  if (!hasLocale(lang) || !category) notFound();
  const dict = getDictionary(lang);
  const others = serviceCategories.filter((c) => c.slug !== slug);

  return (
    <>
      <section className="shell pb-12 pt-32 md:pt-40">
        <Link
          href={href(lang, "/servicios")}
          className="label inline-flex items-center gap-2 text-ink/60 hover:text-ink"
        >
          <ArrowLeft aria-hidden className="size-3.5" />
          {dict.common.backToServices}
        </Link>
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label text-faint">{category.number}</p>
            <h1 className="mt-2 text-display font-medium">{category.title[lang]}</h1>
          </div>
          <p className="max-w-md text-pretty text-lg text-ink/70 lg:col-span-5 lg:justify-self-end">
            {category.intro[lang]}
          </p>
        </div>
      </section>

      <div className="shell">
        <Media
          alt={category.imageLabel[lang]}
          label={category.imageLabel[lang]}
          pendingText={dict.common.imagePending}
          className="aspect-[16/9] rounded-xl md:aspect-[21/9]"
          priority
        />
      </div>

      <section className="shell grid gap-10 py-20 md:py-28 lg:grid-cols-12">
        <Eyebrow className="lg:col-span-4">{dict.services.includes}</Eyebrow>
        <ol className="lg:col-span-8">
          {category.services.map((s, i) => (
            <li key={s.title.es} className="grid gap-2 border-t border-line py-6 last:border-b sm:grid-cols-12">
              <span className="label text-faint sm:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="text-xl font-medium sm:col-span-5">{s.title[lang]}</h2>
              <p className="text-ink/65 sm:col-span-6">{s.description[lang]}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-panel py-16">
        <div className="shell">
          <Eyebrow>{dict.services.other}</Eyebrow>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((c) => (
              <li key={c.slug}>
                <Link
                  href={href(lang, `/servicios/${c.slug}`)}
                  className="group flex h-full flex-col justify-between gap-8 rounded-lg bg-paper p-5 transition-colors hover:bg-white"
                >
                  <span className="label text-faint">{c.number}</span>
                  <span className="flex items-end justify-between gap-4">
                    <span>
                      <span className="block text-2xl font-medium">{c.title[lang]}</span>
                      <span className="mt-1 block text-sm text-ink/60">{c.summary[lang]}</span>
                    </span>
                    <ArrowUpRight aria-hidden className="size-5 shrink-0" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={dict.home.cta.title} button={dict.home.cta.button} to={href(lang, "/contacto")} />
    </>
  );
}
