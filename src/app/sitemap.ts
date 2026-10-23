import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { CATEGORIES, DESTINATIONS, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => new URL(p, SITE.url).toString();
  return [
    { url: u("/"), changeFrequency: "weekly", priority: 1 },
    { url: u("/artigos"), changeFrequency: "weekly", priority: 0.8 },
    ...CATEGORIES.map((c) => ({ url: u(`/artigos/categoria/${c.slug}`), priority: 0.6 })),
    ...DESTINATIONS.map((d) => ({ url: u(`/artigos/tema/${d.slug}`), priority: 0.5 })),
    ...getAllArticles().map((a) => ({ url: u(`/artigo/${a.slug}`), lastModified: a.isoDate || undefined, priority: 0.7 })),
  ];
}
