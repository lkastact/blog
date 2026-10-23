import Image from "next/image";
import Link from "next/link";
import type { ArticleSummary } from "@/lib/articles";
import { Icon } from "./Icon";

type CardArticle = Pick<ArticleSummary, "slug" | "title" | "category" | "date" | "isoDate" | "readTime" | "excerpt" | "image" | "imageAlt">;

export function ArticleCard({ article: a }: { article: CardArticle }) {
  return (
    <article className="flex">
      <Link
        href={`/artigo/${a.slug}`}
        className="group flex flex-1 flex-col overflow-hidden rounded-card border border-line bg-surface shadow-soft transition duration-200 hover:-translate-y-[3px] hover:shadow-lift"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-sky">
          {a.image && (
            <Image src={a.image} alt={a.imageAlt} fill sizes="(min-width: 1080px) 360px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-6">
          <p className="eyebrow">{a.category}</p>
          <h3 className="mt-0.5 text-[21px] leading-[27px]">{a.title}</h3>
          <p className="line-clamp-2 text-[15px] leading-6">{a.excerpt}</p>
          <p className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-3 text-sm font-medium text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="calendar" size={16} />
              <time dateTime={a.isoDate}>{a.date}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="clock" size={16} />
              {a.readTime}
            </span>
          </p>
        </div>
      </Link>
    </article>
  );
}
