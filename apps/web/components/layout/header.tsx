"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { href, locales, stripLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import type { Dictionary } from "@/content/es";

export function Header({ locale, nav }: { locale: Locale; nav: Dictionary["nav"] }) {
  const pathname = usePathname() ?? "/";
  const path = stripLocale(pathname);
  const [open, setOpen] = useState(false);
  const logoRef = useRef<HTMLAnchorElement>(null);
  // La home arranca sobre la foto del hero (oscura); el resto sobre fondo claro.
  const [behindIsDark, setBehindIsDark] = useState(path === "/");
  const onDark = open || behindIsDark;

  useEffect(() => {
    let frame = 0;
    const check = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (logoRef.current) setBehindIsDark(isDarkBehind(logoRef.current));
      });
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const items = [
    { label: nav.services, path: "/servicios" },
    { label: nav.about, path: "/nosotros" },
    { label: nav.contact, path: "/contacto" },
  ];
  const isActive = (p: string) => path === p || path.startsWith(`${p}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link
          ref={logoRef}
          href={href(locale)}
          aria-label="MSA Seguridad — inicio"
          className="relative grid"
          onClick={() => setOpen(false)}
        >
          {/* Sin fondo: alternamos la versión blanca/negra según lo que haya detrás. */}
          <Logo
            decorative
            priority
            className={cn("col-start-1 row-start-1 transition-opacity duration-300", !onDark && "opacity-0")}
          />
          <Logo
            decorative
            tone="dark"
            className={cn("col-start-1 row-start-1 transition-opacity duration-300", onDark && "opacity-0")}
          />
        </Link>

        <nav
          aria-label="Principal"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-lg bg-ink/75 p-1 backdrop-blur-md md:flex"
        >
          {items.map((item) => (
            <Link
              key={item.path}
              href={href(locale, item.path)}
              aria-current={isActive(item.path) ? "page" : undefined}
              className={cn(
                "label rounded-md px-3 py-2 text-white/70 transition-colors hover:text-white",
                isActive(item.path) && "bg-white/10 text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitch locale={locale} path={path} label={nav.language} />
          <ButtonLink href={href(locale, "/contacto")} className="hidden sm:inline-flex">
            {nav.cta}
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.close : nav.menu}
            className="grid size-9 place-items-center rounded-md bg-ink/75 text-white backdrop-blur-md md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 top-16 z-40 bg-ink text-white md:hidden">
          <nav aria-label="Móvil" className="shell flex flex-col gap-1 pt-8">
            {[{ label: nav.home, path: "/" }, ...items].map((item) => (
              <Link
                key={item.path}
                href={href(locale, item.path)}
                onClick={() => setOpen(false)}
                className="border-b border-line-inverse py-4 text-3xl font-medium tracking-tight"
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink
              href={href(locale, "/contacto")}
              variant="light"
              arrow
              className="mt-8 self-start"
              onClick={() => setOpen(false)}
            >
              {nav.cta}
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}

function LangSwitch({ locale, path, label }: { locale: Locale; path: string; label: string }) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center rounded-md bg-ink/75 p-0.5 backdrop-blur-md"
    >
      {locales.map((l) => (
        <Link
          key={l}
          href={href(l, path)}
          hrefLang={l}
          aria-current={l === locale ? "true" : undefined}
          className={cn(
            "label rounded px-2 py-1.5 text-white/60 transition-colors hover:text-white",
            l === locale && "bg-white/15 text-white",
          )}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}

/** ¿El fondo de la página detrás de `el` es oscuro? (fotos y placeholders cuentan como oscuros) */
function isDarkBehind(el: HTMLElement): boolean {
  const header = el.closest("header");
  const r = el.getBoundingClientRect();
  const stack = document.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2);
  for (const node of stack) {
    if (header?.contains(node)) continue;
    for (let n: Element | null = node; n; n = n.parentElement) {
      if (n.tagName === "IMG" || n.getAttribute("role") === "img") return true;
      const m = getComputedStyle(n).backgroundColor.match(/[\d.]+/g);
      if (m && (m[3] === undefined || Number(m[3]) > 0.5)) {
        const [rr, g, b] = m.map(Number);
        return 0.2126 * rr + 0.7152 * g + 0.0722 * b < 128;
      }
    }
  }
  return false;
}
