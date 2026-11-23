import { cn } from "@/lib/utils";

/**
 * Wordmark provisorio. Reemplazar por el SVG oficial del logo de MSA
 * cuando lo tengamos (el sitio actual solo tiene un PNG).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline gap-1.5 leading-none", className)}>
      <span className="text-xl font-semibold italic tracking-tight">MSA</span>
      <span className="label opacity-70">Seguridad</span>
    </span>
  );
}
