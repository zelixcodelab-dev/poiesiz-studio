export const TIERS = [
  { key: "economy", label: "Economy", mult: 1, note: "Smart, durable basics", features: ["BWR plywood carcass", "Laminate finishes", "Soft-close hinges", "Long-time warranty"] },
  { key: "premium", label: "Premium", mult: 1.6, note: "Most homes choose this", features: ["BWP plywood carcass", "Acrylic / PU finishes", "Branded soft-close hardware", "Long-time warranty"] },
  { key: "luxury", label: "Luxury", mult: 2.5, note: "Statement materials", features: ["Marine ply & veneers", "Lacquered glass, fluted panels", "Premium imported fittings", "Long-time warranty"] },
];

export const ROOM_ITEMS = [
  { key: "living", label: "Living room", hint: "TV unit, shoe rack, display", base: 1.1, max: 2 },
  { key: "kitchen", label: "Modular kitchen", hint: "Base, wall units & accessories", base: 1.5, max: 1 },
  { key: "master", label: "Master bedroom", hint: "Wardrobe, bed, side tables", base: 1.0, max: 1 },
  { key: "bedroom", label: "Other bedrooms", hint: "Wardrobe and bed", base: 0.8, max: 4 },
  { key: "dining", label: "Dining area", hint: "Crockery unit & table", base: 0.5, max: 1 },
  { key: "bath", label: "Bathroom vanity", hint: "Vanity and mirror cabinet", base: 0.25, max: 5 },
  { key: "pooja", label: "Pooja unit", hint: "Wall or floor mandir", base: 0.35, max: 1 },
  { key: "study", label: "Study corner", hint: "Desk and shelves", base: 0.45, max: 2 },
];

export const KITCHEN_SHAPES = [
  { key: "straight", label: "Straight", mult: 0.85 },
  { key: "l", label: "L-shaped", mult: 1 },
  { key: "u", label: "U-shaped", mult: 1.25 },
  { key: "parallel", label: "Parallel", mult: 1.15 },
];

export const ADDONS = [
  { key: "ceiling", label: "False ceiling", perSqft: 0.00055 },
  { key: "painting", label: "Wall painting", perSqft: 0.0003 },
  { key: "lighting", label: "Designer lighting", flat: 0.35 },
  { key: "electrical", label: "Electrical rework", flat: 0.4 },
];

export const BHK_DEFAULTS = {
  1: { area: 600, rooms: { living: 1, kitchen: 1, master: 1, bedroom: 0, dining: 0, bath: 1, pooja: 0, study: 0 } },
  2: { area: 1050, rooms: { living: 1, kitchen: 1, master: 1, bedroom: 1, dining: 1, bath: 2, pooja: 1, study: 0 } },
  3: { area: 1500, rooms: { living: 1, kitchen: 1, master: 1, bedroom: 2, dining: 1, bath: 3, pooja: 1, study: 1 } },
  4: { area: 2100, rooms: { living: 1, kitchen: 1, master: 1, bedroom: 3, dining: 1, bath: 4, pooja: 1, study: 1 } },
};

export const estimate = ({ rooms, shape, area, addons }, mult) => {
  const shapeMult = KITCHEN_SHAPES.find((s) => s.key === shape)?.mult ?? 1;
  const lines = ROOM_ITEMS.filter((r) => rooms[r.key] > 0).map((r) => ({
    key: r.key, label: r.label, qty: rooms[r.key],
    cost: r.base * rooms[r.key] * mult * (r.key === "kitchen" ? shapeMult : 1),
  }));
  ADDONS.filter((a) => addons[a.key]).forEach((a) => {
    lines.push({ key: a.key, label: a.label, qty: 1, cost: (a.flat ?? a.perSqft * area) * (a.flat ? mult : 1 + (mult - 1) * 0.5) });
  });
  const total = lines.reduce((s, l) => s + l.cost, 0);
  return { lines, total, low: total * 0.9, high: total * 1.1 };
};

export const lakh = (v) => `₹${v.toFixed(v >= 10 ? 1 : 2)}L`;
