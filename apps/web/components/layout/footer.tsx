import Link from "next/link";
import { cacheLife } from "next/cache";
import { href, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Logo } from "@/components/ui/logo";
import { serviceCategories } from "@/content/services";
import type { Dictionary } from "@/content/es";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const f = dict.footer;
  const marquee = Array.from({ length: 4 }, () => f.marquee).join("  ·  ");

  return (
    <footer className="overflow-hidden bg-ink text-white">
      <div aria-hidden className="flex w-max animate-marquee whitespace-nowrap py-10">
        {[0, 1].map((i) => (
          <span key={i} className="pr-12 text-[clamp(3rem,9vw,8rem)] font-medium tracking-tighter">
            {marquee}
          </span>
        ))}
      </div>

      <div className="shell grid gap-10 border-t border-line-inverse py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-6">
          <div>
            <p className="label mb-3 text-white/50">{f.contact}</p>
            <ul className="space-y-1 text-sm text-white/80">
              <li>
                <a className="hover:text-white" href={site.phoneHref}>
                  {site.phone}
                </a>
              </li>
              <li>
                <a className="hover:text-white" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
          {site.offices.map((o) => (
            <address key={o.id} className="text-sm not-italic text-white/60">
              {o.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          ))}
        </div>

        <FooterList
          title={f.pages}
          items={[
            { label: dict.nav.home, to: href(locale) },
            { label: dict.nav.services, to: href(locale, "/servicios") },
            { label: dict.nav.about, to: href(locale, "/nosotros") },
            { label: dict.nav.contact, to: href(locale, "/contacto") },
            { label: f.privacy, to: href(locale, "/privacidad") },
          ]}
        />
        <FooterList
          title={f.services}
          items={serviceCategories.map((c) => ({
            label: c.title[locale],
            to: href(locale, `/servicios/${c.slug}`),
          }))}
        />
      </div>

      <div className="shell flex flex-col gap-4 border-t border-line-inverse py-6 sm:flex-row sm:items-end sm:justify-between">
        <Logo className="h-12" />
        <p className="label text-white/40">
          © <CurrentYear /> {site.legalName}. {f.rights}
        </p>
      </div>
    </footer>
  );
}

/** Año calculado en el build y cacheado (se renueva en cada deploy / a los días). */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

function FooterList({ title, items }: { title: string; items: { label: string; to: string }[] }) {
  return (
    <div>
      <p className="label mb-3 text-white/50">{title}</p>
      <ul className="space-y-1.5 text-sm">
        {items.map((i) => (
          <li key={i.to}>
            <Link href={i.to} className="text-white/80 transition-colors hover:text-white">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
