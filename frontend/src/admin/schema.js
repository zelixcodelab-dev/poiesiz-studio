const t = (name, label, type = "text") => ({ name, label, type });

export const SCHEMA = [
  { key: "sections", label: "Sections & order", hint: "Show, hide and reorder the home page sections.", fields: [{ name: "items", label: "Home page sections", type: "sections" }] },
  { key: "hero", label: "Hero (top banner)", fields: [
    t("eyebrow", "Small text above headline"),
    { name: "lines", label: "Headline lines (wrap a word in *stars* to make it yellow italic)", type: "strings" },
    t("sub", "Intro paragraph", "textarea"), t("image", "Background photo", "image"),
    { name: "usps", label: "Highlight chips", type: "strings" }, t("formTitle", "Form title"),
  ] },
  { key: "marquee", label: "Scrolling words", fields: [{ name: "words", label: "Words", type: "strings" }] },
  { key: "services", label: "Services", fields: [
    t("eyebrow", "Small heading"), t("title", "Title"), t("titleAccent", "Title (italic part)"), t("sub", "Intro", "textarea"), t("image", "Side photo", "image"),
    { name: "items", label: "Services", type: "list", itemLabel: "title", fields: [t("title", "Service name"), t("text", "Description", "textarea")] },
  ] },
  { key: "projects", label: "Projects", fields: [
    t("eyebrow", "Small heading"), t("title", "Title"),
    { name: "filters", label: "Filter buttons (must match project Type or Status)", type: "strings" },
    { name: "items", label: "Projects", type: "list", itemLabel: "name", fields: [
      t("name", "Project name"), t("type", "Type (Residence, Retail, Office, Commercial)"), t("label", "Subtitle"),
      t("place", "Location"), t("status", "Status (Completed / On-going)"), t("img", "Photo", "image"),
    ] },
  ] },
  { key: "featured", label: "Featured project", fields: [
    t("eyebrow", "Small heading"), t("title", "Title"), t("titleAccent", "Title (italic part)"), t("text", "Description", "textarea"),
    t("image", "Main photo", "image"), t("image2", "Small photo 1", "image"), t("image3", "Small photo 2", "image"),
    { name: "facts", label: "Facts", type: "list", itemLabel: "label", fields: [t("label", "Label"), t("value", "Value")] },
  ] },
  { key: "trending", label: "Trending ideas", fields: [
    t("eyebrow", "Small heading"), t("title", "Title"),
    { name: "items", label: "Idea cards", type: "list", itemLabel: "title", fields: [t("title", "Title"), t("tag", "Tag"), { name: "imgs", label: "3 photos", type: "images" }] },
  ] },
  { key: "rooms", label: "Ideas by room", fields: [
    t("eyebrow", "Small heading"), t("title", "Title"),
    { name: "items", label: "Rooms", type: "list", itemLabel: "label", fields: [t("label", "Room name"), t("count", "Idea count"), { name: "imgs", label: "Photos (up to 4)", type: "images" }] },
  ] },
  { key: "styles", label: "Ideas by style", fields: [
    t("eyebrow", "Small heading"), t("title", "Title"),
    { name: "items", label: "Styles", type: "list", itemLabel: "name", fields: [t("name", "Style name"), t("count", "Idea count"), t("img", "Photo", "image"), { name: "chips", label: "Colour swatches (hex codes)", type: "strings" }] },
    { name: "categories", label: "Categories", type: "strings" },
  ] },
  { key: "clients", label: "Clients", fields: [
    t("eyebrow", "Small heading"), t("title", "Title"),
    { name: "items", label: "Clients", type: "list", itemLabel: "name", fields: [t("name", "Client name"), t("logo", "Logo", "image")] },
  ] },
  { key: "why", label: "Why choose us", fields: [
    t("eyebrow", "Small heading"), t("title", "Title"), t("image", "Big card photo", "image"),
    { name: "items", label: "Reasons", type: "list", itemLabel: "title", fields: [t("title", "Title"), t("text", "Text", "textarea")] },
  ] },
  { key: "ongoing", label: "On-going projects", fields: [
    t("eyebrow", "Small heading"), t("title", "Title"), t("sub", "Intro", "textarea"),
    { name: "items", label: "Photos", type: "list", itemLabel: "label", fields: [t("img", "Photo", "image"), t("label", "Caption")] },
  ] },
  { key: "steps", label: "How it works", fields: [
    t("eyebrow", "Small heading"), t("title", "Title"),
    { name: "items", label: "Steps", type: "list", itemLabel: "title", fields: [t("title", "Step"), t("text", "Text", "textarea")] },
  ] },
  { key: "faqs", label: "FAQs", fields: [
    t("title", "Title"),
    { name: "items", label: "Questions", type: "list", itemLabel: "q", fields: [t("q", "Question"), t("a", "Answer", "textarea")] },
  ] },
  { key: "contact", label: "Contact details", fields: [
    t("eyebrow", "Small heading"), t("title", "Title"), t("sub", "Intro", "textarea"),
    { name: "phones", label: "Phone numbers", type: "strings" }, t("email", "Email"), t("address", "Address", "textarea"),
    t("website", "Website (without https://)"), t("mapQuery", "Map location search text"),
  ] },
  { key: "footer", label: "Footer", fields: [
    t("headline", "Headline"), t("headlineAccent", "Headline (italic part)"), t("tagline", "Tagline", "textarea"),
    { name: "cities", label: "Areas served", type: "strings" },
  ] },
  { key: "form", label: "Booking form options", fields: [{ name: "cities", label: "Cities", type: "strings" }, { name: "types", label: "Property types", type: "strings" }] },
];
