import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Imagen con fallback. Mientras MSA no entregue fotos propias se muestra un
 * placeholder con la etiqueta de lo que va ahí (no usamos fotos de stock).
 */
export function Media({
  src,
  alt,
  label,
  pendingText,
  tone = "dark",
  className,
  priority,
  sizes = "100vw",
  labelClassName,
  imageClassName,
}: {
  labelClassName?: string;
  imageClassName?: string;
  src?: string;
  alt: string;
  label?: string;
  pendingText?: string;
  tone?: "dark" | "light";
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", imageClassName)} />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className={cn(
            "absolute inset-0",
            tone === "dark"
              ? "bg-[radial-gradient(120%_80%_at_70%_20%,#2b3442_0%,#161a20_55%,#0f1114_100%)]"
              : "bg-[radial-gradient(120%_80%_at_70%_20%,#f4f4f4_0%,#dedede_60%,#d2d2d2_100%)]",
          )}
        >
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 opacity-60 [background-size:48px_48px]",
              tone === "dark"
                ? "[background-image:linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)]"
                : "[background-image:linear-gradient(to_right,rgb(0_0_0/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_0_0/0.05)_1px,transparent_1px)]",
            )}
          />
          {label && (
            <span
              className={cn(
                "label absolute bottom-3 left-3 rounded px-2 py-1",
                tone === "dark" ? "bg-white/10 text-white/70" : "bg-black/5 text-ink/60",
                labelClassName,
              )}
            >
              {pendingText ? `${pendingText} · ${label}` : label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
