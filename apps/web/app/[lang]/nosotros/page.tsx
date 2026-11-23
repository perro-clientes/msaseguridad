import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, href } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionaries";
import { Media } from "@/components/ui/media";
import { Eyebrow } from "@/components/ui/typography";
import { CtaBand, PageIntro } from "@/components/sections/shared";

export async function generateMetadata({ params }: PageProps<"/[lang]/nosotros">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.nav.about,
    description: dict.about.body,
    alternates: { canonical: href(lang, "/nosotros") },
  };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/nosotros">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const a = dict.about;

  return (
    <>
      <PageIntro eyebrow={a.eyebrow} a={a.titleA} b={a.titleB} body={a.body} />

      <div className="shell grid gap-3 md:grid-cols-3">
        <Media
          alt=""
          label={lang === "es" ? "Equipo MSA" : "MSA team"}
          pendingText={dict.common.imagePending}
          className="aspect-[4/3] rounded-xl md:col-span-2 md:aspect-auto"
          priority
        />
        <Media alt="" tone="light" className="aspect-[4/5] rounded-xl" />
      </div>

      <section className="shell grid gap-10 py-20 md:py-28 lg:grid-cols-12">
        <Eyebrow className="lg:col-span-4">{a.timelineTitle}</Eyebrow>
        <ol className="lg:col-span-8">
          {a.timeline.map((t) => (
            <li key={t.year} className="grid gap-2 border-t border-line py-6 last:border-b sm:grid-cols-12 sm:items-baseline">
              <span className="text-4xl font-medium tracking-tight sm:col-span-3">{t.year}</span>
              <p className="text-lg text-ink/70 sm:col-span-9">{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-ink py-20 text-white md:py-28">
        <div className="shell grid gap-12 md:grid-cols-2">
          {[
            { title: a.missionTitle, text: a.mission },
            { title: a.visionTitle, text: a.vision },
          ].map((b) => (
            <div key={b.title}>
              <Eyebrow inverse>{b.title}</Eyebrow>
              <p className="mt-6 text-balance text-2xl font-medium leading-snug tracking-tight md:text-3xl">
                {b.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell py-20 md:py-28">
        <Eyebrow>{a.whyTitle}</Eyebrow>
        <ul className="mt-10 grid gap-3 md:grid-cols-3">
          {a.why.map((w, i) => (
            <li key={w.title} className="flex flex-col justify-between gap-12 rounded-xl bg-panel p-6">
              <span className="label text-faint">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="text-2xl font-medium">{w.title}</h2>
                <p className="mt-3 text-pretty text-ink/65">{w.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title={dict.home.cta.title} button={dict.home.cta.button} to={href(lang, "/contacto")} />
    </>
  );
}
