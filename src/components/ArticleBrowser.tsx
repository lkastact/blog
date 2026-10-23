"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import type { ArticleSummary } from "@/lib/articles";
import { normalize, type Category } from "@/lib/site";
import { ArticleCard } from "./ArticleCard";
import { Button } from "./Button";
import { Icon } from "./Icon";

type Props = {
  articles: ArticleSummary[];
  categories: Category[];
  /** "state": chips filtram na própria página (home). "links": chips navegam para /artigos/categoria/... */
  mode?: "state" | "links";
  activeCategory?: string | null;
  limit?: number;
};

const chip =
  "inline-flex h-9 items-center rounded-full border-[1.5px] border-line-strong bg-surface px-4 text-sm font-semibold text-ink transition-colors hover:bg-surface-sky " +
  "aria-pressed:border-sky aria-pressed:bg-sky aria-pressed:text-on-sky aria-[current=page]:border-sky aria-[current=page]:bg-sky aria-[current=page]:text-on-sky";

export function ArticleBrowser({ articles, categories, mode = "state", activeCategory = null, limit }: Props) {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const [localCat, setLocalCat] = useState<string | null>(null);
  const cat = mode === "state" ? localCat : activeCategory;

  const results = useMemo(() => {
    const words = normalize(query).trim().split(/\s+/).filter(Boolean);
    return articles.filter((a) => {
      if (mode === "state" && cat && a.categorySlug !== cat) return false;
      return words.every((w) => a.searchText.includes(w));
    });
  }, [articles, query, cat, mode]);

  const shown = limit ? results.slice(0, limit) : results;

  function clear() {
    setQuery("");
    setLocalCat(null);
  }

  return (
    <div>
      <div role="search" className="mb-8 flex flex-col gap-4">
        <div className="relative max-w-[520px]">
          <label htmlFor={inputId} className="sr-only">
            Buscar artigos
          </label>
          <Icon name="search" size={20} className="pointer-events-none absolute top-1/2 left-[18px] -translate-y-1/2 text-ink-muted" />
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por destino, transporte, mala…"
            className="h-12 w-full rounded-full border-[1.5px] border-line-strong bg-surface pr-6 pl-12 text-base font-medium text-ink placeholder:text-ink-muted focus:outline-2 focus:outline-offset-2 focus:outline-focus"
          />
        </div>

        <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap gap-2">
          {mode === "state" ? (
            <>
              <button type="button" className={chip} aria-pressed={!cat} onClick={() => setLocalCat(null)}>
                Todos
              </button>
              {categories.map((c) => (
                <button key={c.slug} type="button" className={chip} aria-pressed={cat === c.slug} onClick={() => setLocalCat(cat === c.slug ? null : c.slug)}>
                  {c.label}
                </button>
              ))}
            </>
          ) : (
            <>
              <Link href="/artigos" className={chip} aria-current={!cat ? "page" : undefined}>
                Todos
              </Link>
              {categories.map((c) => (
                <Link key={c.slug} href={`/artigos/categoria/${c.slug}`} className={chip} aria-current={cat === c.slug ? "page" : undefined}>
                  {c.label}
                </Link>
              ))}
            </>
          )}
        </div>

        <p aria-live="polite" className="text-sm text-ink-muted">
          {results.length === 1 ? "1 artigo encontrado" : `${results.length} artigos encontrados`}
        </p>
      </div>

      {shown.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      ) : (
        <div className="rounded-card border-[1.5px] border-dashed border-line-strong bg-surface px-6 py-12 text-center">
          <h3 className="mb-2 text-[22px] leading-7">Nenhum artigo encontrado</h3>
          <p>Tente outra palavra-chave ou outra categoria.</p>
          <Button variant="ghost" className="mt-4" onClick={clear} href={mode === "links" ? "/artigos" : undefined}>
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
}
