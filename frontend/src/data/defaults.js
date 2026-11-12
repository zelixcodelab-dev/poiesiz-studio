import { IMG, CITIES, PROPERTY_TYPES, USPS, TRENDING, PROJECTS, ROOMS, STYLES, CATEGORIES, WHY, STEPS, FAQS, FOOTER_CITIES, ONGOING, SERVICES, CONTACT } from "./content";

export const SECTION_LABELS = {
  marquee: "Scrolling words strip", services: "Services", projects: "Projects", featured: "Featured project",
  trending: "Trending ideas", estimator: "Cost estimator", rooms: "Ideas by room", styles: "Ideas by style",
  clients: "Clients", why: "Why choose us", ongoing: "On-going projects", how: "How it works", contact: "Contact", faq: "FAQs",
};

const CLIENT_LOGOS = [
  ["TATA Projects", "tata-projects"], ["Tata Consumer Products Limited", "tata-consumer"], ["Sands Infra", "sands-infra"],
  ["Kannan Devan Hills Plantations Company (P) Ltd", "kannan-devan"], ["Ripple Tea", "ripple-tea"], ["abm", "abm"],
];

export const DEFAULTS = {
  sections: { items: Object.keys(SECTION_LABELS).map((id) => ({ id, visible: true })) },
  hero: {
    eyebrow: "Kochi · Modern & custom interiors",
    lines: ["You name it,", "we *transform*", "it."],
    sub: "Turnkey interior design and execution for luxury homes, penthouses, flats, offices and retail shops, from the first concept to the final handover.",
    image: IMG.hero, usps: USPS, formTitle: "Talk to our design team",
  },
  marquee: { words: ["Living rooms", "Modular kitchens", "Wardrobes", "Pooja units", "False ceilings", "Kids' rooms", "Study corners", "Balconies"] },
  services: {
    eyebrow: "Our services", title: "Luxury homes to retail shops.", titleAccent: "You name it, we transform it.",
    sub: "A Kochi-based turnkey contracting company specialised in interior design and execution, for residential and commercial spaces.",
    image: "/projects/brand-chair.jpg", items: SERVICES,
  },
  projects: { eyebrow: "Our projects", title: "Spaces we've transformed", filters: ["All", "Residence", "Retail", "Office", "Commercial", "On-going"], items: PROJECTS },
  featured: {
    eyebrow: "Featured project · Recently completed", title: "Chai Bazaar,", titleAccent: "The Plantation Store",
    text: "Recently completed retail shop for Kannan Devan Hills Plantations at the Munnar Tea Museum, Mattupetty Tea Factory.",
    image: "/projects/chai-entrance.jpg", image2: "/projects/chai-interior-1.jpg", image3: "/projects/chai-interior-4.jpg",
    facts: [{ label: "Location", value: "Munnar" }, { label: "Type", value: "Retail shop" }, { label: "Client", value: "Kannan Devan" }],
  },
  trending: { eyebrow: "Trending ideas", title: "What homes are wearing this season", items: TRENDING },
  rooms: { eyebrow: "Ideas by room", title: "Wander through, one room at a time", items: ROOMS },
  styles: { eyebrow: "Ideas by style", title: "Find the mood that feels like you", items: STYLES, categories: CATEGORIES },
  clients: { eyebrow: "Our clients", title: "Trusted by names you know", items: CLIENT_LOGOS.map(([name, f]) => ({ name, logo: `/clients/${f}.png` })) },
  why: { eyebrow: "Why POIESIZ", title: "Trust built into every detail", image: "/projects/thrissur-courtyard.jpg", items: WHY },
  ongoing: { eyebrow: "On-going projects", title: "On site right now", sub: "A look at work in progress across our current residential and commercial projects.", items: ONGOING },
  steps: { eyebrow: "How it works", title: "Four calm steps to a finished home", items: STEPS },
  faqs: { title: "Good questions, honest answers", items: FAQS },
  contact: { eyebrow: "Contact us", title: "Visit our office in Palarivattom", sub: "Drop by, call or write to us to discuss your home, office or retail project.", ...CONTACT, mapQuery: "Pallissery Road, Palarivattom, Ernakulam 682025" },
  footer: { headline: "Let's start with a", headlineAccent: "conversation.", tagline: "Modern & custom interiors. Turnkey design and execution, based in Kochi, Kerala.", cities: FOOTER_CITIES },
  form: { cities: CITIES, types: PROPERTY_TYPES },
};
