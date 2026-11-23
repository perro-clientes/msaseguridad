import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
        "flex items-center gap-2 text-xs",
        inverse ? "text-white/70" : "text-ink/70",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("size-1.5 rounded-full", inverse ? "bg-accent-soft" : "bg-accent")}
      />
      {children}
    </p>
  );
}

/** Título en dos tonos: la primera parte en tinta, la segunda atenuada (como el template). */
export function TwoTone({
  a,
  b,
  as: Tag = "h2",
  inverse,
  size = "headline",
  className,
}: {
  a: ReactNode;
  b?: ReactNode;
  as?: "h1" | "h2" | "h3";
  inverse?: boolean;
  size?: "display" | "headline";
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "font-medium text-balance",
        size === "display" ? "text-display" : "text-headline",
        inverse ? "text-white" : "text-ink",
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
