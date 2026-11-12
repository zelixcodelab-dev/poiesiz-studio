import { useContent, list } from "./content";
import { BHK_DEFAULTS } from "./pricing";

const n = (v, d = 0) => {
  const x = Number(v);
  return v === "" || v == null || !Number.isFinite(x) ? d : x;
};

export const usePricing = () => {
  const p = useContent("pricing");
  const TIERS = list(p.tiers).map((t, i) => ({ ...t, key: t.key || `t${i}`, mult: n(t.mult, 1), features: list(t.features) }));
  const ROOM_ITEMS = list(p.rooms).map((r, i) => ({ ...r, key: r.key || `r${i}`, base: n(r.base), max: Math.max(1, n(r.max, 1)) }));
  const KITCHEN_SHAPES = list(p.kitchenShapes).map((k, i) => ({ ...k, key: k.key || `k${i}`, mult: n(k.mult, 1) }));
  const ADDONS = list(p.addons).map((a, i) => ({ ...a, key: a.key || `a${i}`, pricePerSqft: n(a.pricePerSqft), flatLakh: n(a.flatLakh) }));
  return { TIERS, ROOM_ITEMS, KITCHEN_SHAPES, ADDONS, BHK_DEFAULTS, note: p.note, cfg: { ROOM_ITEMS, KITCHEN_SHAPES, ADDONS } };
};
