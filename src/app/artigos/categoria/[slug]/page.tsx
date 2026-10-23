import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBrowser } from "@/components/ArticleBrowser";
import { SectionHead } from "@/components/SectionHead";
import { getAllArticles, toSummary } from "@/lib/articles";
import { CATEGORIES } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  return cat ? { title: cat.label, description: cat.description } : {};
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();
  const articles = getAllArticles().filter((a) => a.categorySlug === slug).map(toSummary);

  return (
    <section className="py-12 sm:py-[72px]">
      <div className="container-rt">
        <SectionHead as="h1" eyebrow="Categoria" title={cat.label} text={cat.description} />
        <ArticleBrowser articles={articles} categories={CATEGORIES} mode="links" activeCategory={slug} />
      </div>
    </section>
  );
}
