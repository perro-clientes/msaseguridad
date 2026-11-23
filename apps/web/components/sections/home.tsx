import Link from "next/link";
import { ArrowDown, ArrowUpRight, ShieldCheck } from "lucide-react";
import { href, type Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow, TwoTone } from "@/components/ui/typography";
import { Media } from "@/components/ui/media";
import { serviceCategories } from "@/content/services";
import type { Dictionary } from "@/content/es";

type P = { locale: Locale; dict: Dictionary };

export function Hero({ locale, dict }: P) {
  const h = dict.home.hero;
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-night text-white">
      <Media
        alt=""
        label={locale === "es" ? "Plataforma de Ezeiza" : "Ezeiza apron"}
        pendingText={dict.common.imagePending}
        labelClassName="bottom-auto left-auto right-4 top-20"
        className="absolute inset-0 -z-10"
        priority
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

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
                alt={c.imageLabel[locale]}
                label={c.imageLabel[locale]}
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
  return (
    <section className="shell py-14" aria-label={dict.home.clients.eyebrow}>
      <Eyebrow className="justify-center">{dict.home.clients.eyebrow}</Eyebrow>
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }, (_, i) => (
          <li
            key={i}
            className="label grid h-16 place-items-center rounded-md border border-dashed border-ink/15 text-center text-faint"
          >
            Logo {i + 1}
          </li>
        ))}
      </ul>
      <p className="label mt-4 text-center text-faint">{dict.home.clients.pending}</p>
    </section>
  );
}

export function Operation({ locale, dict }: P) {
  const o = dict.home.operation;
  return (
    <section className="overflow-hidden bg-ink py-20 text-white md:py-28">
      <div className="shell flex flex-col items-center text-center">
        <Eyebrow inverse>{o.eyebrow}</Eyebrow>
        <TwoTone inverse a={o.titleA} b={o.titleB} className="mt-6 max-w-4xl" />
        <p className="mt-6 max-w-xl text-pretty text-white/60">{o.body}</p>
        <ButtonLink href={href(locale, "/contacto")} variant="light" arrow className="mt-8">
          {o.cta}
        </ButtonLink>

        <Radar />

        <ul className="-mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
          {o.positions.map((p) => (
            <li
              key={p}
              className="label flex items-center gap-2 rounded-md border border-line-inverse bg-white/5 px-3 py-2 text-white/80"
            >
              <span aria-hidden className="size-1.5 rounded-full bg-accent-soft" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Radar decorativo (reemplaza al globo del template). */
function Radar() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 400"
      className="mt-14 w-full max-w-[34rem] text-white"
      fill="none"
    >
      <defs>
        <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7fa3e3" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#7fa3e3" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="radar-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7fa3e3" stopOpacity="0" />
          <stop offset="100%" stopColor="#7fa3e3" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="190" fill="url(#radar-glow)" />
      {[190, 140, 90, 40].map((r) => (
        <circle key={r} cx="200" cy="200" r={r} stroke="currentColor" strokeOpacity="0.14" />
      ))}
      <path d="M200 10v380M10 200h380" stroke="currentColor" strokeOpacity="0.1" />
      <g className="origin-center animate-[spin_8s_linear_infinite]" style={{ transformBox: "view-box" }}>
        <path d="M200 200 L390 200 A190 190 0 0 0 334 66 Z" fill="url(#radar-sweep)" />
      </g>
      {[
        [280, 140],
        [130, 120],
        [240, 290],
        [110, 250],
        [320, 240],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#7fa3e3" />
      ))}
    </svg>
  );
}
