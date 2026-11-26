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

/** Logos de clientes (en `public/logos/clients`), sin fondo. */
export const clientLogos = [
  { name: "Aeropuertos Argentina 2000", src: "/logos/clients/aa2000.png" },
  { name: "Avianca", src: "/logos/clients/avianca.png" },
  { name: "Aeroméxico", src: "/logos/clients/aeromexico.png" },
  { name: "Qatar Airways", src: "/logos/clients/qatar.png" },
  { name: "Ethiopian Airlines", src: "/logos/clients/ethiopian.png" },
  { name: "Cubana de Aviación", src: "/logos/clients/cubana.png" },
  { name: "Andes Líneas Aéreas", src: "/logos/clients/andes.png" },
  { name: "Tampa Cargo", src: "/logos/clients/tampa.png" },
  { name: "Sky Lease Cargo", src: "/logos/clients/skylease.png" },
  { name: "Sideral Linhas Aéreas", src: "/logos/clients/sideral.png" },
  { name: "CMS Airlines Representative", src: "/logos/clients/cms.png" },
  { name: "CrossRacer", src: "/logos/clients/crossracer.png" },
  { name: "Argentina Ground Support", src: "/logos/clients/ags.png" },
] as const;
