import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "MSA",
    description: "Seguridad aeroportuaria en Ezeiza desde 1987.",
    start_url: "/",
    display: "browser",
    background_color: "#ededed",
    theme_color: "#151515",
    lang: "es-AR",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
