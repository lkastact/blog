import fs from "node:fs";
import path from "node:path";
import { normalize, slugify } from "./site";

/** Artigo completo, lido de content/artigos/<slug>.md */
export type Article = {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  date: string; // DD/MM/AAAA
  isoDate: string; // AAAA-MM-DD
  readTime: string;
  themes: string[];
  themeSlugs: string[];
  excerpt: string;
  image: string;
  imageAlt: string;
  body: string;
};

/** Versão leve enviada para componentes de cliente (busca e filtros). */
export type ArticleSummary = Omit<Article, "body"> & { searchText: string };

const DIR = path.join(process.cwd(), "content", "artigos");

function toIso(d: string): string {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(d.trim());
  return m ? `${m[3]}-${m[2]}-${m[1]}` : "";
}

/** Lê um artigo no modelo Markdown da Rota Tour (ver README). */
export function parseArticle(md: string, slug: string): Article {
  const a: Article = {
    slug, title: "", category: "", categorySlug: "", date: "", isoDate: "", readTime: "",
    themes: [], themeSlugs: [], excerpt: "", image: "", imageAlt: "", body: "",
  };
  const body: string[] = [];
  let seenTitle = false;
  let seenImage = false;
  let firstParagraph = "";

  for (const line of md.replace(/\r/g, "").split("\n")) {
    const t = line.trim();
    let m: RegExpExecArray | null;
    if (!seenTitle && (m = /^#\s+(.*)$/.exec(t))) { a.title = m[1].trim(); seenTitle = true; continue; }
    if ((m = /^\*\*(Categoria|Data|Tempo de leitura|Temas|Resumo):\*\*\s*(.*)$/.exec(t))) {
      const [, key, value] = m;
      if (key === "Categoria") a.category = value;
      else if (key === "Data") a.date = value;
      else if (key === "Tempo de leitura") { const n = /(\d+)/.exec(value); a.readTime = n ? `${n[1]} min de leitura` : value; }
      else if (key === "Temas") a.themes = value.split(",").map((s) => s.trim()).filter(Boolean);
      else a.excerpt = value;
      continue;
    }
    if (!seenImage && (m = /^!\[([^\]]*)\]\(([^)\s]+)\)$/.exec(t))) { a.imageAlt = m[1]; a.image = m[2]; seenImage = true; continue; }
    body.push(line);
    if (!firstParagraph && t && !/^[#>!*\-\d]/.test(t)) firstParagraph = t;
  }

  a.body = body.join("\n").trim();
  a.excerpt ||= firstParagraph;
  a.categorySlug = slugify(a.category);
  a.themeSlugs = a.themes.map(slugify);
  a.isoDate = toIso(a.date);
  return a;
}

let cache: Article[] | null = null;

export function getAllArticles(): Article[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".md"));
  const list = files.map((f) => parseArticle(fs.readFileSync(path.join(DIR, f), "utf8"), f.replace(/\.md$/, "")));
  list.sort((x, y) => y.isoDate.localeCompare(x.isoDate));
  cache = list;
  return list;
}

export function getArticle(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function toSummary(a: Article): ArticleSummary {
  const { body, ...rest } = a;
  return { ...rest, searchText: normalize([a.title, a.excerpt, a.category, a.themes.join(" "), body].join(" ")) };
}

export function getRelated(a: Article, count = 3): Article[] {
  const others = getAllArticles().filter((x) => x.slug !== a.slug);
  const same = others.filter((x) => x.categorySlug === a.categorySlug);
  return [...same, ...others.filter((x) => !same.includes(x))].slice(0, count);
}
