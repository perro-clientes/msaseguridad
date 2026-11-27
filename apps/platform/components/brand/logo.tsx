import Image from "next/image";
import { cn } from "@/lib/utils";
import logoLight from "@/public/logos/MSA-Logo.png";
import logoDark from "@/public/logos/msa-logo-dark.png";

/**
 * Logo de MSA. `light` = blanco (fondos oscuros), `dark` = negro (fondos claros).
 * Cuando una organización tenga su propio logo, el layout usa el de su branding.
 */
export function Logo({
  tone = "dark",
  className,
  priority,
}: {
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={tone === "light" ? logoLight : logoDark}
      alt="MSA Seguridad"
      priority={priority}
      sizes="160px"
      className={cn("h-7 w-auto self-start", className)}
    />
  );
}
