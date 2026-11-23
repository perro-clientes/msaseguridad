import type { Locale } from "@/lib/i18n";

type L = Record<Locale, string>;

export type Service = { title: L; description: L };
export type ServiceCategory = {
  slug: string;
  number: string;
  title: L;
  summary: L;
  intro: L;
  imageLabel: L;
  services: Service[];
};

/*
 * Servicios: los títulos salen del sitio actual y de las planillas operativas (PO)
 * que MSA usa hoy. Las descripciones son un BORRADOR para validar con MSA.
 */
export const serviceCategories: ServiceCategory[] = [
  {
    slug: "pasajeros",
    number: "01",
    title: { es: "Pasajeros", en: "Passengers" },
    summary: {
      es: "Control documental, perfilamiento y custodia de pasajeros.",
      en: "Document checks, profiling and passenger custody.",
    },
    intro: {
      es: "Controlamos la documentación de cada pasajero y aplicamos los procedimientos de selección que exige cada aerolínea, antes y durante el embarque.",
      en: "We check every passenger's documents and apply each airline's selection procedures, before and during boarding.",
    },
    imageLabel: { es: "Control en puerta de embarque", en: "Boarding gate control" },
    services: [
      {
        title: { es: "Comprobación de documentación", en: "Documentation check" },
        description: {
          es: "Verificación de pasaporte, visado y requisitos de destino antes del embarque.",
          en: "Passport, visa and destination requirement checks before boarding.",
        },
      },
      {
        title: { es: "Perfilamiento y detección de pasajeros", en: "Passenger profiling and screening" },
        description: {
          es: "Entrevistas y observación para detectar riesgos según los protocolos de cada aerolínea.",
          en: "Interviews and observation to detect risk following each airline's protocols.",
        },
      },
      {
        title: { es: "Pasajeros seleccionados (Selectee)", en: "Selectee passengers" },
        description: {
          es: "Inspección adicional de pasajeros y equipaje seleccionados, con reporte formal por caso.",
          en: "Additional screening of selected passengers and their baggage, with a formal report per case.",
        },
      },
      {
        title: { es: "Custodia de pasajeros", en: "Passenger custody" },
        description: {
          es: "Acompañamiento y registro de pasajeros bajo custodia hasta su embarque.",
          en: "Escort and logging of passengers in custody through to boarding.",
        },
      },
      {
        title: { es: "Procedimientos de puerta", en: "Gate procedures" },
        description: {
          es: "Control de seguridad en puerta de aeronave y sala de embarque.",
          en: "Security checks at the aircraft door and boarding lounge.",
        },
      },
    ],
  },
  {
    slug: "equipaje",
    number: "02",
    title: { es: "Equipaje", en: "Baggage" },
    summary: {
      es: "Rayos X propios, match de equipaje y escolta hasta la bodega.",
      en: "In-house X-ray, baggage matching and escort to the hold.",
    },
    intro: {
      es: "Inspeccionamos y seguimos el equipaje desde el despacho hasta la bodega de la aeronave, y en arribos hasta la cinta.",
      en: "We screen and track baggage from check-in to the aircraft hold, and on arrival through to the carousel.",
    },
    imageLabel: { es: "Inspección de equipaje por RX", en: "X-ray baggage screening" },
    services: [
      {
        title: { es: "RX de equipaje con equipo propio", en: "Baggage X-ray with our own equipment" },
        description: {
          es: "Inspección por rayos X con equipamiento de MSA y operadores certificados.",
          en: "X-ray screening with MSA-owned equipment and certified operators.",
        },
      },
      {
        title: { es: "Búsqueda de equipaje", en: "Baggage search" },
        description: {
          es: "Revisión manual del equipaje de pasajeros seleccionados.",
          en: "Hand search of selected passengers' baggage.",
        },
      },
      {
        title: { es: "Emparejamiento positivo de equipaje", en: "Positive baggage matching" },
        description: {
          es: "Conciliación de cada valija con un pasajero embarcado antes del cierre de bodegas.",
          en: "Reconciling every bag with a boarded passenger before the holds close.",
        },
      },
      {
        title: { es: "Despacho y cinta de arribos", en: "Dispatch and arrivals carousel" },
        description: {
          es: "Control y registro de equipaje despachado, precintos y entregas en cinta.",
          en: "Control and logging of dispatched baggage, seals and carousel delivery.",
        },
      },
      {
        title: { es: "Escolta de equipaje", en: "Baggage escort" },
        description: {
          es: "Acompañamiento de seguridad del equipaje de importación y exportación.",
          en: "Security escort for import and export baggage.",
        },
      },
    ],
  },
  {
    slug: "aeronave",
    number: "03",
    title: { es: "Aeronave", en: "Aircraft" },
    summary: {
      es: "Acceso a bordo, perímetro, bodegas y búsqueda en cabina.",
      en: "Onboard access, perimeter, holds and cabin search.",
    },
    intro: {
      es: "Protegemos la aeronave mientras está en tierra: quién sube, quién se acerca y qué se carga.",
      en: "We protect the aircraft while it is on the ground: who boards, who approaches and what is loaded.",
    },
    imageLabel: { es: "Aeronave en posición", en: "Aircraft on stand" },
    services: [
      {
        title: { es: "Control de acceso a bordo", en: "Onboard access control" },
        description: {
          es: "Registro de cada persona que ingresa a la aeronave, con empresa, legajo y horario.",
          en: "Logging every person who boards the aircraft, with company, ID and time.",
        },
      },
      {
        title: { es: "Control de perímetro", en: "Perimeter control" },
        description: {
          es: "Custodia del perímetro de la aeronave en posición y registro de ingresos y egresos.",
          en: "Guarding the aircraft perimeter on stand and logging entries and exits.",
        },
      },
      {
        title: { es: "Control de bodegas", en: "Hold control" },
        description: {
          es: "Inspección de bodegas y registro de contenedores, pallets y novedades.",
          en: "Hold inspection and logging of containers, pallets and incidents.",
        },
      },
      {
        title: { es: "Búsqueda en aeronave", en: "Aircraft search" },
        description: {
          es: "Revisión de cabina y registro de objetos hallados a bordo.",
          en: "Cabin search and logging of items found on board.",
        },
      },
      {
        title: { es: "Seguridad de catering", en: "Catering security" },
        description: {
          es: "Control de los insumos de catering que se cargan en la aeronave.",
          en: "Control of catering supplies loaded onto the aircraft.",
        },
      },
    ],
  },
  {
    slug: "rampa",
    number: "04",
    title: { es: "Rampa", en: "Ramp" },
    summary: {
      es: "Seguridad en plataforma y control F.O.D.",
      en: "Apron security and F.O.D. control.",
    },
    intro: {
      es: "Mantenemos la plataforma segura y libre de objetos antes y durante la operación de cada vuelo.",
      en: "We keep the apron safe and clear of debris before and during each flight's turnaround.",
    },
    imageLabel: { es: "Operación en rampa", en: "Ramp operations" },
    services: [
      {
        title: { es: "Seguridad en rampa", en: "Ramp security" },
        description: {
          es: "Presencia y control en plataforma durante toda la operación del vuelo.",
          en: "Presence and control on the apron throughout the flight turnaround.",
        },
      },
      {
        title: { es: "Control F.O.D.", en: "F.O.D. control" },
        description: {
          es: "Recorrida de la posición antes del estacionamiento de la aeronave para retirar objetos extraños.",
          en: "Walk of the stand before the aircraft parks to remove foreign objects.",
        },
      },
      {
        title: { es: "Distribución de personal por vuelo", en: "Per-flight staff deployment" },
        description: {
          es: "Planificación de posiciones para arribo y salida, coordinada por un supervisor MSA.",
          en: "Position planning for arrival and departure, coordinated by an MSA supervisor.",
        },
      },
    ],
  },
  {
    slug: "carga",
    number: "05",
    title: { es: "Carga", en: "Cargo" },
    summary: {
      es: "ETD, verificación documental y escolta de carga.",
      en: "ETD, document verification and cargo escort.",
    },
    intro: {
      es: "Aplicamos controles de seguridad sobre la carga de importación y exportación en la Terminal de Cargas.",
      en: "We apply security controls to import and export cargo at the Cargo Terminal.",
    },
    imageLabel: { es: "Terminal de cargas", en: "Cargo terminal" },
    services: [
      {
        title: { es: "ETD de carga", en: "Cargo ETD" },
        description: {
          es: "Detección de trazas de explosivos en carga de importación y exportación.",
          en: "Explosive trace detection on import and export cargo.",
        },
      },
      {
        title: { es: "Verificación de documentación de carga", en: "Cargo documentation check" },
        description: {
          es: "Control de la documentación que acompaña cada envío.",
          en: "Checking the documentation that travels with each shipment.",
        },
      },
      {
        title: { es: "Escolta de carga", en: "Cargo escort" },
        description: {
          es: "Acompañamiento de la carga desde la terminal hasta la aeronave.",
          en: "Escorting cargo from the terminal to the aircraft.",
        },
      },
    ],
  },
];

export const getCategory = (slug: string) =>
  serviceCategories.find((c) => c.slug === slug);
