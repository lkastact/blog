import type { Metadata } from "next";
import { ArticleBrowser } from "@/components/ArticleBrowser";
import { SectionHead } from "@/components/SectionHead";
import { getAllArticles, toSummary } from "@/lib/articles";
import { CATEGORIES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Todos os artigos",
  description: "Guias, dicas e inspirações para planejar cada etapa da viagem.",
};

export default function ArticlesPage() {
  return (
    <section className="py-12 sm:py-[72px]">
      <div className="container-rt">
        <SectionHead as="h1" eyebrow="Blog Tour" title="Todos os artigos" text="Guias, dicas e inspirações para planejar cada etapa da viagem." />
        <ArticleBrowser articles={getAllArticles().map(toSummary)} categories={CATEGORIES} mode="links" />
      </div>
    </section>
  );
}
