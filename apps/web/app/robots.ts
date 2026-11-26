import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { indexable } from "@/lib/seo";

/** Bots que solo generan la vista previa al compartir un link (Slack, WhatsApp, redes). */
const linkPreviewBots = [
  "Slackbot-LinkExpanding",
  "Slackbot",
  "Twitterbot",
  "facebookexternalhit",
  "LinkedInBot",
  "WhatsApp",
  "TelegramBot",
  "Discordbot",
];

export default function robots(): MetadataRoute.Robots {
  // Previews, local y *.vercel.app: fuera los buscadores, pero las vistas previas
  // de links siguen funcionando (Slack y X respetan robots.txt).
  if (!indexable) {
    return {
      rules: [
        { userAgent: linkPreviewBots, allow: "/" },
        { userAgent: "*", disallow: "/" },
      ],
    };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
