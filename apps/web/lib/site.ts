/** Datos de contacto y empresa (fuente: sitio actual msaseguridad.com.ar). */
export const site = {
  name: "MSA Seguridad",
  legalName: "MSA Prevención y Control",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://msaseguridad.com.ar",
  foundedYear: 1987,
  phone: "+54 9 11 4897-4272",
  phoneHref: "tel:+5491148974272",
  email: "info@msaseguridad.com.ar",
  offices: [
    {
      id: "ezeiza",
      lines: [
        "Edificio Corporativo, piso 3, of. 311",
        "Aeropuerto Internacional Ministro Pistarini",
        "Ezeiza, Buenos Aires",
      ],
      mapsHref:
        "https://www.google.com/maps/search/?api=1&query=Edificio+Corporativo+Aeropuerto+Internacional+Ezeiza",
    },
    {
      id: "tigre",
      lines: ["Montes de Oca 530", "Tigre, Buenos Aires"],
      mapsHref:
        "https://www.google.com/maps/search/?api=1&query=Montes+de+Oca+530+Tigre+Buenos+Aires",
    },
  ],
} as const;
