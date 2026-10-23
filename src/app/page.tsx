import { ArticleBrowser } from "@/components/ArticleBrowser";
import { Button } from "@/components/Button";
import { CategoryCard } from "@/components/CategoryCard";
import { DestinationTile } from "@/components/DestinationTile";
import { Hero } from "@/components/Hero";
import { Newsletter } from "@/components/Newsletter";
import { RouteCard } from "@/components/RouteCard";
import { SectionHead } from "@/components/SectionHead";
import { getAllArticles, toSummary } from "@/lib/articles";
import { CATEGORIES, DESTINATIONS } from "@/lib/site";

export default function HomePage() {
  const articles = getAllArticles().map(toSummary);

  return (
    <>
      <Hero image="/imagens/ceu-aviao.svg" imageAlt="Avião cruzando um céu azul com nuvens" />

      <section id="categorias" aria-labelledby="cat-titulo" className="py-12 sm:py-[72px]">
        <div className="container-rt">
          <SectionHead eyebrow="Categorias" titleId="cat-titulo" title="O que você quer descobrir hoje?" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((c) => (
              <CategoryCard key={c.slug} icon={c.icon} title={c.label} description={c.description} href={`/artigos/categoria/${c.slug}`} />
            ))}
          </div>
        </div>
      </section>

      <section id="artigos" aria-labelledby="art-titulo" className="bg-surface-muted py-12 sm:py-[72px]">
        <div className="container-rt">
          <SectionHead
            eyebrow="Artigos em destaque"
            titleId="art-titulo"
            title="Leituras para planejar com calma"
            action={<Button href="/artigos" variant="ghost" iconEnd="arrow-right">Ver todos os artigos</Button>}
          />
          <ArticleBrowser articles={articles} categories={CATEGORIES} limit={6} />
        </div>
      </section>

      <section id="transportes" aria-labelledby="rotas-titulo" className="py-12 sm:py-[72px]">
        <div className="container-rt grid items-center gap-12 lg:grid-cols-[5fr_7fr]">
          <div>
            <p className="eyebrow">Transporte e rotas</p>
            <h2 id="rotas-titulo" className="mt-2 mb-4 text-[28px] leading-[34px] tracking-[-0.015em] sm:text-4xl sm:leading-[42px]">
              Cada caminho leva a uma nova experiência.
            </h2>
            <p>
              Seja cruzando o céu, descobrindo novas paisagens pela estrada ou planejando o próximo destino, a Tour ajuda você a transformar planos em
              experiências.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <RouteCard image="/imagens/ceu-aviao.svg" imageAlt="Avião em voo sobre as nuvens" eyebrow="Pelo céu" title="Viagens de avião" text="Mais tempo no destino e menos tempo no caminho. Saiba como embarcar tranquilo." href="/artigos/categoria/viagens-de-aviao" />
            <RouteCard image="/imagens/estrada-onibus.svg" imageAlt="Ônibus de turismo moderno em estrada entre colinas" eyebrow="Pela estrada" title="Viagens de ônibus" text="Paisagens pela janela, paradas no caminho e conforto do embarque ao desembarque." href="/artigos/categoria/viagens-de-onibus" />
            <RouteCard image="/imagens/mapa-rota.svg" imageAlt="Mapa com rota tracejada e marcadores de destino" eyebrow="No mapa" title="Roteiros sob medida" text="Organize trajetos, dias e passeios para aproveitar cada momento." href="/artigos/categoria/roteiros-e-destinos" />
          </div>
        </div>
      </section>

      <section id="destinos" aria-labelledby="dest-titulo" className="bg-surface-sky py-12 sm:py-[72px]">
        <div className="container-rt">
          <SectionHead eyebrow="Inspiração" titleId="dest-titulo" title="Para onde vamos desta vez?" text="Destinos nacionais e internacionais para cada estilo de viagem." />
          <div className="grid auto-rows-[220px] gap-4 sm:grid-cols-2 sm:auto-rows-[250px] lg:grid-cols-3">
            {DESTINATIONS.map((d, i) => (
              <DestinationTile
                key={d.slug}
                {...d}
                href={`/artigos/tema/${d.slug}`}
                size={i === 0 ? "lg" : i === 3 ? "wide" : undefined}
                className={i === DESTINATIONS.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}
              />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
