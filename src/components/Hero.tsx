import Image from "next/image";
import { Button } from "./Button";

type Props = { image: string; imageAlt: string; title?: string; subtitle?: string };

export function Hero({
  image,
  imageAlt,
  title = "Sua próxima viagem começa aqui.",
  subtitle = "Descubra destinos, encontre inspiração e prepare-se para viver experiências inesquecíveis com a Rota Tour.",
}: Props) {
  return (
    <section aria-labelledby="hero-titulo" className="pt-3 sm:pt-4">
      <div className="container-rt">
        <div className="relative flex min-h-[520px] items-end overflow-hidden rounded-panel sm:min-h-[580px] sm:items-center">
          <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1200px) 1104px, 100vw" className="object-cover" />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(0deg,var(--scrim)_0%,var(--scrim)_50%,rgba(11,26,61,.15)_100%)] sm:bg-[linear-gradient(90deg,var(--scrim)_0%,var(--scrim)_38%,rgba(11,26,61,0)_78%)]"
          />
          <div className="relative max-w-[620px] px-5 py-8 text-white sm:px-12 sm:py-28">
            <h1 id="hero-titulo" className="text-[38px] leading-[42px] tracking-[-0.02em] !text-white sm:text-[56px] sm:leading-[60px]">
              {title}
            </h1>
            <p className="mt-6 max-w-[520px] text-[17px] leading-[27px] sm:text-[19px] sm:leading-[30px]">{subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/#destinos" variant="sky" size="lg" iconEnd="arrow-right">
                Explorar destinos
              </Button>
              <Button href="/artigos/categoria/dicas-para-viajar-melhor" variant="light" size="lg">
                Ver dicas de viagem
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
