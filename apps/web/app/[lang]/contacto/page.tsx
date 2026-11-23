import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { hasLocale, href } from "@/lib/i18n";
import { site } from "@/lib/site";
import { getDictionary } from "@/content/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/sections/shared";

export async function generateMetadata({ params }: PageProps<"/[lang]/contacto">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return pageMetadata({ locale: lang, path: "/contacto", title: dict.nav.contact, description: dict.contact.body });
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contacto">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const c = dict.contact;

  return (
    <>
      <PageIntro eyebrow={c.eyebrow} a={c.titleA} b={c.titleB} body={c.body} />
      <section className="shell grid gap-10 pb-24 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-4">
          <Info label={c.phone}>
            <a href={site.phoneHref} className="hover:underline">
              {site.phone}
            </a>
          </Info>
          <Info label={c.email}>
            <a href={`mailto:${site.email}`} className="hover:underline">
              {site.email}
            </a>
          </Info>
          {site.offices.map((o) => (
            <Info key={o.id} label={c.offices[o.id]}>
              <address className="not-italic">
                {o.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
              <a
                href={o.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="label mt-2 inline-flex items-center gap-1 text-ink/60 hover:text-ink"
              >
                {c.map}
                <ArrowUpRight aria-hidden className="size-3" />
              </a>
            </Info>
          ))}
        </div>
        <div className="lg:col-span-8">
          <ContactForm t={c.form} privacyHref={href(lang, "/privacidad")} />
        </div>
      </section>
    </>
  );
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line pt-4">
      <p className="label mb-2 text-faint">{label}</p>
      <div className="text-lg">{children}</div>
    </div>
  );
}
