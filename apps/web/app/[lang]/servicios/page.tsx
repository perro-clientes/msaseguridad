import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { hasLocale, href } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionaries";
import { serviceCategories } from "@/content/services";
import { Media } from "@/components/ui/media";
import { CtaBand, PageIntro } from "@/components/sections/shared";

export async function generateMetadata({ params }: PageProps<"/[lang]/servicios">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.nav.services,
    description: dict.services.body,
    alternates: { canonical: href(lang, "/servicios") },
  };
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/servicios">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const s = dict.services;

  return (
    <>
      <PageIntro eyebrow={s.eyebrow} a={s.titleA} b={s.titleB} body={s.body} />

      <section className="shell pb-24">
        <ul className="border-t border-line">
          {serviceCategories.map((c) => (
            <li key={c.slug} className="border-b border-line">
              <Link
                href={href(lang, `/servicios/${c.slug}`)}
                className="group grid gap-6 py-8 md:grid-cols-12 md:items-center"
              >
                <span className="label text-faint md:col-span-1">{c.number}</span>
                <div className="md:col-span-5">
                  <h2 className="text-3xl font-medium tracking-tight md:text-4xl">{c.title[lang]}</h2>
                  <p className="mt-2 text-ink/60">{c.summary[lang]}</p>
                </div>
                <ul className="flex flex-wrap gap-1.5 md:col-span-4">
                  {c.services.map((sv) => (
                    <li key={sv.title.es} className="rounded bg-paper-2 px-2 py-1 text-xs text-ink/70">
                      {sv.title[lang]}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-end gap-4 md:col-span-2">
                  <Media
                    alt=""
                    tone="dark"
                    className="hidden aspect-[4/3] w-28 rounded-md lg:block"
                  />
                  <ArrowUpRight
                    aria-hidden
                    className="size-6 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title={dict.home.cta.title} button={dict.home.cta.button} to={href(lang, "/contacto")} />
    </>
  );
}
