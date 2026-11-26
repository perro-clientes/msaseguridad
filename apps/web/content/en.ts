import type { Dictionary } from "./es";

const en: Dictionary = {
  meta: {
    title: "MSA Seguridad — Airport security at Ezeiza",
    description:
      "Private security company specialized in airport operations since 1987. Passenger, baggage, aircraft, ramp and cargo security at Ezeiza International Airport.",
  },
  nav: {
    home: "Home",
    services: "Services",
    about: "About",
    contact: "Contact",
    cta: "Contact us",
    menu: "Menu",
    close: "Close",
    language: "Language",
  },
  common: {
    viewAll: "View all",
    viewServices: "View services",
    learnMore: "Learn more",
    imagePending: "Image pending",
    backToServices: "All services",
  },
  home: {
    hero: {
      titleA: "We protect",
      titleB: "every flight",
      body: "Private airport security at Ezeiza: passengers, baggage, aircraft, ramp and cargo, with our own certified staff.",
      primary: "Contact us",
      secondary: "View services",
      scroll: "Scroll to meet us",
      badgeTitle: "Licensed by the PSA",
      badgeBody: "Operating in the airport environment since 2010.",
    },
    intro: {
      eyebrow: "Who we are",
      titleA: "Since 1987 we protect what moves.",
      titleB: "Today, every flight MSA operates at Ezeiza goes through a trained team, clear procedures and end-to-end control.",
      cta: "About us",
    },
    stats: {
      eyebrow: "By the numbers",
      title: "Experience measured on the apron",
      items: [
        { value: "1987", label: "Year founded" },
        { value: "2010", label: "PSA license for airport operations" },
        { value: "2019", label: "Awarded checked-baggage screening tender at EZE" },
        { value: "24/7", label: "Operating 365 days a year" },
      ],
    },
    clients: {
      eyebrow: "Trusted by",
    },
    operation: {
      eyebrow: "Our operation",
      titleA: "One flight,",
      titleB: "over twenty positions",
      body: "On every arrival and departure we deploy staff across all critical positions, coordinated by an MSA supervisor.",
      cta: "Work with us",
    },
    faq: {
      eyebrow: "FAQ",
      title: "What we get asked the most",
      items: [
        {
          q: "What services does MSA provide?",
          a: "Private airport security: passenger and document checks, X-ray baggage screening, aircraft control (onboard access, perimeter and holds), ramp security and cargo controls.",
        },
        {
          q: "Where do you operate?",
          a: "We operate at Ministro Pistarini International Airport (Ezeiza), where our airport management office is located.",
        },
        {
          q: "Are you licensed to work at the airport?",
          a: "Yes. MSA has been licensed by the Airport Security Police (PSA) to provide services in the airport environment since 2010.",
        },
        {
          q: "Do you work with cargo airlines?",
          a: "Yes. We perform ETD, documentation checks and escort for import and export cargo at the Cargo Terminal.",
        },
        {
          q: "How do I request a proposal?",
          a: "Reach out through the contact form or at info@msaseguridad.com.ar with your operation and flight frequency, and we will get back to you shortly.",
        },
      ],
    },
    cta: {
      title: "Let's talk about your operation",
      button: "Contact us",
    },
  },
  services: {
    eyebrow: "Services",
    titleA: "Security at every",
    titleB: "point of the journey",
    body: "We cover the passenger, their baggage, the aircraft, the apron and the cargo. Every service runs on our own procedures and control logs.",
    includes: "What's included",
    other: "Other services",
  },
  about: {
    eyebrow: "About",
    titleA: "Over three decades",
    titleB: "in private security",
    body: "We are a private security company specialized in airport operations. We provide first-class solutions and professionals, with the licenses, equipment and operational capacity each strategic partner needs.",
    timelineTitle: "Our story",
    timeline: [
      { year: "1987", text: "MSA is founded as a private security company." },
      { year: "2010", text: "The PSA licenses us to operate in the airport environment." },
      { year: "2019", text: "We win the checked-baggage screening tender at Ezeiza." },
      { year: "Today", text: "We operate every day at EZE with our own certified staff." },
    ],
    missionTitle: "Mission",
    mission:
      "To provide the highest quality private security service at a competitive cost, complying with every rule that governs the activity, with modern equipment and trained staff delivering a professional response tailored to each strategic partner.",
    visionTitle: "Vision",
    vision:
      "To jointly develop the advisory, execution and supervision processes for every activity our partners need to reach their goals.",
    whyTitle: "Why choose us",
    why: [
      {
        title: "Specialization",
        text: "Private security, investigations and airport custody is what we do and what we are passionate about.",
      },
      {
        title: "Capacity",
        text: "We hold the state licenses, trained staff, equipment and operational capacity to respond quickly.",
      },
      {
        title: "Continuous improvement",
        text: "Feedback with each strategic partner is part of the service: it lets us improve every day.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    titleA: "Let's talk about",
    titleB: "your operation",
    body: "Tell us what you need and we will get back to you shortly.",
    phone: "Phone",
    email: "Email",
    offices: { ezeiza: "Airport management office", tigre: "Administrative office" },
    map: "View on map",
    form: {
      name: "Full name",
      company: "Company",
      email: "Email",
      phone: "Phone",
      message: "Message",
      messagePlaceholder: "Tell us about your operation, airport and flight frequency.",
      submit: "Send message",
      sending: "Sending…",
      success: "Thank you! We received your message and will contact you shortly.",
      error: "We couldn't send your message. Please try again or email info@msaseguridad.com.ar.",
      invalid: "Please check the highlighted fields.",
      required: "Required field",
      invalidEmail: "Invalid email",
      privacy: "By sending you accept our",
      privacyLink: "privacy policy",
    },
  },
  privacy: {
    title: "Privacy policy",
    updated: "Last updated: November 2026",
  },
  footer: {
    marquee: "Always alert. Always present. Always on time.",
    contact: "Contact",
    pages: "Site",
    services: "Services",
    rights: "All rights reserved.",
    privacy: "Privacy",
    credit: "Designed and maintained by",
  },
  notFound: {
    title: "Page not found",
    body: "The page you are looking for doesn't exist or was moved.",
    cta: "Back to home",
  },
};

export default en;
