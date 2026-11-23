import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow, TwoTone } from "@/components/ui/typography";
import { Media } from "@/components/ui/media";
import { photos } from "@/lib/images";

/** Encabezado de páginas internas (deja aire para el header fijo). */
export function PageIntro({
  eyebrow,
  a,
  b,
  body,
  children,
}: {
  eyebrow: string;
  a: string;
  b?: string;
  body?: string;
  children?: ReactNode;
}) {
  return (
    <section className="shell pb-16 pt-32 md:pb-24 md:pt-44">
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
        <TwoTone as="h1" size="display" a={a} b={b} className="lg:col-span-8" />
        {body && (
          <p className="max-w-md text-pretty text-base text-ink/70 lg:col-span-4 lg:justify-self-end">
            {body}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

export function CtaBand({ title, button, to }: { title: string; button: string; to: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-night">
      <Media src={photos.tower} alt="" className="absolute inset-0 -z-10 opacity-50" />
      <div className="shell flex min-h-[24rem] flex-col items-center justify-center gap-8 py-20 text-center">
        <h2 className="max-w-3xl text-balance text-headline font-medium text-white">{title}</h2>
        <ButtonLink href={to} variant="light" arrow>
          {button}
        </ButtonLink>
      </div>
    </section>
  );
}

export function Faq({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: { q: string; a: string }[];
}) {
  return (
    <section className="shell grid gap-10 py-20 md:py-28 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-5 text-balance text-4xl font-medium tracking-tight">{title}</h2>
      </div>
      <div className="lg:col-span-8">
        {items.map((item, i) => (
          <details
            key={item.q}
            className="group border-t border-line last:border-b [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer list-none items-center gap-6 py-6">
              <span className="label w-8 text-faint">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 text-lg font-medium md:text-xl">{item.q}</span>
              <Plus
                aria-hidden
                className="size-5 shrink-0 transition-transform duration-300 group-open:rotate-45"
              />
            </summary>
            <p className="max-w-2xl pb-6 pl-14 text-pretty text-ink/70">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
