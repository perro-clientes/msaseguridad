import Image from "next/image";
import { cn } from "@/lib/utils";
import logoLight from "@/public/logos/MSA-Logo.png";
import logoDark from "@/public/logos/msa-logo-dark.png";

/**
 * Logo de MSA. `light` = blanco (para fondos oscuros), `dark` = negro (para fondos claros).
 * Reemplazar por el SVG oficial cuando lo tengamos.
 */
export function Logo({
  tone = "light",
  className,
  priority,
  decorative,
}: {
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
  /** Si va dentro de un link que ya tiene aria-label. */
  decorative?: boolean;
}) {
  return (
    <Image
      src={tone === "light" ? logoLight : logoDark}
      alt={decorative ? "" : "MSA Seguridad"}
      priority={priority}
      sizes="160px"
      className={cn("h-7 w-auto", className)}
    />
  );
}
