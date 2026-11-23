/**
 * Fotos del sitio (en `public/images`). Por ahora son de Unsplash (licencia libre);
 * reemplazar por fotos propias de MSA a medida que lleguen.
 */
export const photos = {
  apron: "/images/others/rocker-sta-RSYBi_1fhfM-unsplash.jpg",
  gates: "/images/others/eric-prouzet-TeQC4mRKSIQ-unsplash.jpg",
  baggageClaim: "/images/others/markus-winkler-1LRbNM5lUaU-unsplash.jpg",
  airfieldVehicle: "/images/others/joel-ambass-XU-gr0gVOI0-unsplash.jpg",
  terminal: "/images/others/chuttersnap-qhNutmNU1pE-unsplash.jpg",
  traveler: "/images/others/erik-odiin-jbQvJx2EWnU-unsplash.jpg",
  tower: "/images/others/da-shika-m3ZueBllY7c-unsplash.jpg",
  cabin: "/images/others/ismail-mohamed-sovile-vvd8f02y5_c-unsplash.jpg",
  cargoApron: "/images/others/anthony-maw-g0Yer3dwgVI-unsplash.jpg",
} as const;

/** Logos de clientes (en `public/images/clients`). */
export const clientLogos = [
  { name: "Aeropuertos Argentina 2000", src: "/images/clients/client-aerolineas.png" },
  { name: "Avianca", src: "/images/clients/avianca.png" },
  { name: "Aeroméxico", src: "/images/clients/client-aeromexico.jpg" },
  { name: "Qatar Airways", src: "/images/clients/client-qatar.png" },
  { name: "Ethiopian Airlines", src: "/images/clients/client-ethiopian.png" },
  { name: "Cubana de Aviación", src: "/images/clients/client-cubana.png" },
  { name: "Andes Líneas Aéreas", src: "/images/clients/client-andes.png" },
  { name: "Tampa Cargo", src: "/images/clients/client-tampa.png" },
  { name: "Sky Lease Cargo", src: "/images/clients/client-skylease.png" },
  { name: "Sideral Linhas Aéreas", src: "/images/clients/client-sideral.png" },
  { name: "CMS Airlines Representative", src: "/images/clients/client-cms.png" },
  { name: "CrossRacer", src: "/images/clients/client-crossracer.png" },
  { name: "Argentina Ground Support", src: "/images/clients/client-ags.png" },
] as const;
