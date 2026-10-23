import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBrowser } from "@/components/ArticleBrowser";
import { Button } from "@/components/Button";
import { SectionHead } from "@/components/SectionHead";
import { getAllArticles, toSummary } from "@/lib/articles";
import { CATEGORIES, DESTINATIONS } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const d = DESTINATIONS.find((x) => x.slug === slug);
  return d ? { title: d.title, description: d.text } : {};
}

export default async function ThemePage({ params }: Params) {
  const { slug } = await params;
  const theme = DESTINATIONS.find((d) => d.slug === slug);
  if (!theme) notFound();
  const articles = getAllArticles().filter((a) => a.themeSlugs.includes(slug)).map(toSummary);

  return (
    <section className="py-12 sm:py-[72px]">
      <div className="container-rt">
        <SectionHead
          as="h1"
          eyebrow="Destinos"
          title={theme.title}
          text={theme.text}
          action={<Button href="/artigos" variant="ghost" size="sm" iconStart="close">Remover tema</Button>}
        />
        <ArticleBrowser articles={articles} categories={CATEGORIES} mode="links" />
      </div>
    </section>
  );
}
