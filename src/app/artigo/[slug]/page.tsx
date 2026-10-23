import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { Icon } from "@/components/Icon";
import { Markdown } from "@/components/Markdown";
import { getAllArticles, getArticle, getRelated, toSummary } from "@/lib/articles";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.excerpt,
    openGraph: { type: "article", title: a.title, description: a.excerpt, publishedTime: a.isoDate, images: a.image ? [a.image] : undefined },
  };
}

export default async function ArticlePage({ params }: Params) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const related = getRelated(a).map(toSummary);

  return (
    <article aria-labelledby="artigo-titulo" className="pt-12 pb-12 sm:pb-[72px]">
      <div className="container-rt">
        <header className="mx-auto max-w-[760px]">
          <Link href="/artigos" className="mb-8 inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent hover:underline underline-offset-4">
            <Icon name="arrow-left" size={18} /> Todos os artigos
          </Link>
          <p>
            <Link href={`/artigos/categoria/${a.categorySlug}`} className="eyebrow">
              {a.category}
            </Link>
          </p>
          <h1 id="artigo-titulo" className="mt-3 mb-4 text-[32px] leading-[38px] tracking-[-0.015em] sm:text-[42px] sm:leading-[48px]">
            {a.title}
          </h1>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="calendar" size={16} />
              <time dateTime={a.isoDate}>{a.date}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="clock" size={16} />
              {a.readTime}
            </span>
          </p>
        </header>

        {a.image && (
          <figure className="relative mx-auto mt-8 aspect-[16/8] max-w-[1000px] overflow-hidden rounded-panel bg-surface-sky">
            <Image src={a.image} alt={a.imageAlt} fill priority sizes="(min-width: 1000px) 1000px, 100vw" className="object-cover" />
          </figure>
        )}

        <Markdown source={a.body} className="mt-12" />

        {related.length > 0 && (
          <section aria-labelledby="relacionados" className="mt-[72px]">
            <h2 id="relacionados" className="mb-6 text-[28px] leading-[34px]">
              Continue explorando
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ArticleCard key={r.slug} article={r} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
