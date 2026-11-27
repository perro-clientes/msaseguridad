import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/** Antetítulo con "+" (igual que el sitio). */
export function Eyebrow({
  children,
  inverse,
  className,
}: {
  children: ReactNode;
  inverse?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-sm",
        inverse ? "text-white/75" : "text-foreground/70",
        className,
      )}
    >
      <Plus aria-hidden strokeWidth={1.5} className="size-4 shrink-0" />
      {children}
    </p>
  );
}

/** Título en dos tonos: la segunda parte atenuada. */
export function TwoTone({
  a,
  b,
  as: Tag = "h1",
  size = "headline",
  inverse,
  className,
}: {
  a: ReactNode;
  b?: ReactNode;
  as?: "h1" | "h2" | "h3" | "p";
  size?: "display" | "headline";
  inverse?: boolean;
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "font-medium text-balance",
        size === "display" ? "text-display" : "text-headline",
        inverse ? "text-white" : "text-foreground",
        className,
      )}
    >
      {a}
      {b && (
        <>
          {" "}
          <span className={inverse ? "text-white/45" : "text-faint"}>{b}</span>
        </>
      )}
    </Tag>
  );
}

/** Encabezado estándar de una pantalla del panel: antetítulo, título y acciones. */
export function PageHeader({
  eyebrow,
  title,
  titleMuted,
  description,
  actions,
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  titleMuted?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("flex flex-col gap-4 md:flex-row md:items-end md:justify-between", className)}>
      <div className="grid gap-3">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <TwoTone a={title} b={titleMuted} />
        {description && <p className="max-w-2xl text-pretty text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </header>
  );
}

/** Cifra destacada (como la sección "En números" del sitio). */
export function Stat({ value, label, className }: { value: ReactNode; label: ReactNode; className?: string }) {
  return (
    <div className={cn("border-l border-foreground/20 pl-4", className)}>
      <p className="text-4xl font-medium tracking-tight tabular-nums">{value}</p>
      <p className="mt-1.5 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
