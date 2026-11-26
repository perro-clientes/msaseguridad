import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ShieldCheck } from "lucide-react";
import { href, type Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow, TwoTone } from "@/components/ui/typography";
import { Media } from "@/components/ui/media";
import { serviceCategories } from "@/content/services";
import { clientLogos, photos } from "@/lib/images";
import type { Dictionary } from "@/content/es";

type P = { locale: Locale; dict: Dictionary };

export function Hero({ locale, dict }: P) {
  const h = dict.home.hero;
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-night text-white">
      <Media src={photos.apron} alt="" className="absolute inset-0 -z-10" imageClassName="object-[50%_60%]" priority />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/35 to-black/80" />

      <div className="shell grid flex-1 content-center gap-10 pb-32 pt-28 lg:grid-cols-12 lg:items-end">
        <h1 className="text-display font-medium lg:col-span-8">
          {h.titleA}
          <br />
          {h.titleB}
        </h1>
        <div className="space-y-6 lg:col-span-4 lg:justify-self-end">
          <p className="max-w-sm text-pretty text-white/75">{h.body}</p>
          <div className="flex flex-wrap gap-2">
            <ButtonLink href={href(locale, "/contacto")} variant="light">
              {h.primary}
            </ButtonLink>
            <ButtonLink href={href(locale, "/servicios")} variant="ghost-light" arrow>
              {h.secondary}
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="shell flex items-end justify-between gap-4 pb-6">
        <a href="#intro" className="label flex items-center gap-2 text-white/60 hover:text-white">
          <ArrowDown aria-hidden className="size-3.5" />
          {h.scroll}
        </a>
        <div className="hidden max-w-xs items-start gap-3 rounded-lg bg-white/10 p-3 backdrop-blur-md sm:flex">
          <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-accent-soft" />
          <div>
            <p className="text-sm font-medium">{h.badgeTitle}</p>
            <p className="text-xs text-white/60">{h.badgeBody}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Intro({ locale, dict }: P) {
  const t = dict.home.intro;
  return (
    <section id="intro" className="scroll-mt-16 py-20 md:py-28">
      <div className="shell grid gap-8 lg:grid-cols-12">
        <Eyebrow className="lg:col-span-4">{t.eyebrow}</Eyebrow>
        <div className="space-y-8 lg:col-span-8">
          <p className="text-balance text-3xl font-medium tracking-tight md:text-[2.75rem] md:leading-[1.1]">
            {t.titleA} <span className="text-faint">{t.titleB}</span>
          </p>
          <ButtonLink href={href(locale, "/nosotros")} variant="dark" arrow>
            {t.cta}
          </ButtonLink>
        </div>
      </div>

      <ul className="shell mt-16 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 [scrollbar-width:thin]">
        {serviceCategories.map((c) => (
          <li key={c.slug} className="w-[80%] shrink-0 snap-start sm:w-[45%] lg:w-[calc((100%-2.25rem)/4)]">
            <Link href={href(locale, `/servicios/${c.slug}`)} className="group block">
              <Media
                src={c.image}
                alt={c.imageLabel[locale]}
                label={c.imageLabel[locale]}
                pendingText={dict.common.imagePending}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 80vw"
                className="aspect-[4/5] rounded-lg transition-transform duration-500 group-hover:scale-[0.985]"
              />
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="label text-faint">{c.number}</p>
                  <h3 className="mt-1 text-xl font-medium">{c.title[locale]}</h3>
                  <p className="mt-1 text-sm text-ink/60">{c.summary[locale]}</p>
                </div>
                <ArrowUpRight
                  aria-hidden
                  className="mt-5 size-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Stats({ dict }: { dict: Dictionary }) {
  const s = dict.home.stats;
  return (
    <section className="bg-panel py-20 md:py-28">
      <div className="shell">
        <Eyebrow>{s.eyebrow}</Eyebrow>
        <h2 className="mt-5 max-w-2xl text-balance text-4xl font-medium tracking-tight md:text-5xl">
          {s.title}
        </h2>
        <dl className="mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {s.items.map((item) => (
            <div key={item.value} className="border-l border-ink/20 pl-5">
              <dt className="sr-only">{item.label}</dt>
              <dd className="text-5xl font-medium tracking-tight md:text-6xl">{item.value}</dd>
              <dd className="mt-3 max-w-[16rem] text-sm text-ink/60">{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Clients({ dict }: { dict: Dictionary }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 gap-10 pr-10">
      {clientLogos.map((c) => (
        <li key={c.src} className="relative h-20 w-40">
          <Image
            src={c.src}
            alt={hidden ? "" : c.name}
            fill
            sizes="160px"
            // El carrusel se mueve con transform: el lazy-load del navegador no lo detecta y
            // deja huecos. Son 13 logos livianos, se cargan de entrada.
            loading="eager"
            className="object-cover opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="py-14" aria-label={dict.home.clients.eyebrow}>
      <Eyebrow className="shell justify-center">{dict.home.clients.eyebrow}</Eyebrow>
      <div className="mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}

export function Operation({ locale, dict }: P) {
  const o = dict.home.operation;
  return (
    <section className="relative isolate overflow-hidden bg-ink py-16 text-white md:py-24">
      <Media src={photos.cargoApron} alt="" className="absolute inset-0 -z-10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/80" />
      <div className="shell flex flex-col items-center text-center">
        <Eyebrow inverse>{o.eyebrow}</Eyebrow>
        <TwoTone inverse a={o.titleA} b={o.titleB} className="mt-6 max-w-4xl" />
        <p className="mt-6 max-w-xl text-pretty text-white">{o.body}</p>
        <ButtonLink href={href(locale, "/contacto")} variant="light" arrow className="mt-8">
          {o.cta}
        </ButtonLink>
      </div>
    </section>
  );
}
