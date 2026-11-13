import { useEffect } from "react";
import { useContent, list, slug } from "./content";

const setMeta = (attr, key, value) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value ?? "");
};

export const useSeo = (pathname) => {
  const seo = useContent("seo");
  const projects = list(useContent("projects").items);
  useEffect(() => {
    let title = seo.homeTitle;
    let desc = seo.homeDescription;
    if (pathname.startsWith("/price-calculator")) {
      title = seo.calculatorTitle;
      desc = seo.calculatorDescription;
    } else if (pathname.startsWith("/projects/")) {
      const p = projects.find((x) => `/projects/${slug(x.name)}` === pathname);
      if (p) {
        title = `${p.name}${seo.projectSuffix ?? ""}`;
        desc = p.description || [p.label, p.place].filter(Boolean).join(" · ");
      }
    }
    if (title) document.title = title;
    setMeta("name", "description", desc);
    setMeta("name", "keywords", seo.keywords);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", desc);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", desc);
  }, [pathname, seo, projects]);
};
