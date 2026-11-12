import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULTS } from "../data/defaults";
import { api } from "./api";

const Ctx = createContext({ data: DEFAULTS, reload: () => {} });

const merge = (over) => {
  const out = {};
  Object.keys(DEFAULTS).forEach((k) => {
    const o = over?.[k];
    out[k] = o && typeof o === "object" && !Array.isArray(o) ? { ...DEFAULTS[k], ...o } : DEFAULTS[k];
  });
  return out;
};

export const ContentProvider = ({ children }) => {
  const [over, setOver] = useState({});
  const reload = useCallback(async () => {
    try {
      const { data } = await api.get("/content");
      setOver(data && typeof data === "object" ? data : {});
    } catch {
      setOver({});
    }
  }, []);
  useEffect(() => { reload(); }, [reload]);
  const value = useMemo(() => ({ data: merge(over), raw: over, reload }), [over, reload]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useSite = () => useContext(Ctx);
export const useContent = (key) => useContext(Ctx).data[key] ?? DEFAULTS[key];
export const list = (v) => (Array.isArray(v) ? v : []);
