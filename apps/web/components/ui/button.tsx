import Link from "next/link";
import type { ComponentProps } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "dark" | "light" | "ghost-light" | "ghost-dark";

const variants: Record<Variant, string> = {
  dark: "bg-ink text-white hover:bg-ink-2",
  light: "bg-white text-ink hover:bg-paper",
  "ghost-light": "text-white/80 hover:text-white",
  "ghost-dark": "text-ink/70 hover:text-ink",
};

const base =
  "label inline-flex h-9 items-center gap-2 rounded-md px-4 transition-colors duration-200 whitespace-nowrap disabled:opacity-60";

type Props = { variant?: Variant; arrow?: boolean };

export function ButtonLink({
  variant = "dark",
  arrow,
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & Props) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props}>
      {children}
      {arrow && <ArrowUpRight aria-hidden className="size-3.5" />}
    </Link>
  );
}

export function Button({
  variant = "dark",
  arrow,
  className,
  children,
  ...props
}: ComponentProps<"button"> & Props) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
      {arrow && <ArrowUpRight aria-hidden className="size-3.5" />}
    </button>
  );
}
