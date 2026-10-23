import type { IconName } from "@/components/Icon";

/**
 * Configurações do site. Preencha os campos vazios com os dados reais da Tour.
 * Campos vazios aparecem no rodapé como placeholders, nunca com dados inventados.
 */
export const SITE = {
  name: "Tour",
  title: "Tour — Blog de viagens, destinos e dicas",
  description:
    "Dicas de viagem, roteiros e inspiração para viajar de avião e de ônibus com tranquilidade.",
  // Troque pelo domínio real ao publicar (usado no sitemap e nas meta tags).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  about:
    "A Tour ajuda você a planejar viagens de avião e de ônibus com tranquilidade — do primeiro roteiro ao retorno para casa.",
};

export const CONTACT = {
  phone: "", // ex.: "(00) 00000-0000"
  email: "", // ex.: "contato@seudominio.com.br"
  address: "",
  hours: "",
};

export const SOCIAL: { label: string; href: string }[] = [
  { label: "Instagram", href: "" },
  { label: "Facebook", href: "" },
  { label: "YouTube", href: "" },
];

export const NAV = [
  { id: "inicio", label: "Início", href: "/" },
  { id: "destinos", label: "Destinos", href: "/#destinos" },
  { id: "dicas", label: "Dicas de viagem", href: "/artigos/categoria/dicas-para-viajar-melhor" },
  { id: "roteiros", label: "Roteiros", href: "/artigos/categoria/roteiros-e-destinos" },
  { id: "sobre", label: "Sobre nós", href: "#sobre" },
  { id: "contato", label: "Contato", href: "#contato" },
];

export type Category = { slug: string; label: string; icon: IconName; description: string };

export const CATEGORIES: Category[] = [
  { slug: "viagens-de-aviao", label: "Viagens de avião", icon: "plane", description: "Embarque, bagagem e conforto a bordo para voar com tranquilidade." },
  { slug: "viagens-de-onibus", label: "Viagens de ônibus", icon: "bus", description: "Como aproveitar a estrada com conforto, segurança e boas paradas." },
  { slug: "roteiros-e-destinos", label: "Roteiros e destinos", icon: "map", description: "Ideias de lugares e roteiros prontos para inspirar a próxima viagem." },
  { slug: "dicas-para-viajar-melhor", label: "Dicas para viajar melhor", icon: "backpack", description: "Planejamento, orçamento e mala: o essencial para viajar leve." },
];

export type Destination = { slug: string; title: string; text: string; image: string; imageAlt: string };

export const DESTINATIONS: Destination[] = [
  { slug: "praias-e-natureza", title: "Praias e natureza", text: "Mar calmo, trilhas e paisagens para recarregar.", image: "/imagens/praia.svg", imageAlt: "Praia tranquila com mar calmo e coqueiro" },
  { slug: "cidades-e-cultura", title: "Cidades e cultura", text: "Museus, arquitetura e sabores locais.", image: "/imagens/cidade.svg", imageAlt: "Silhueta de cidade histórica ao entardecer" },
  { slug: "viagens-em-familia", title: "Viagens em família", text: "Roteiros pensados para todas as idades.", image: "/imagens/campo-chale.svg", imageAlt: "Chalé no campo cercado de árvores" },
  { slug: "escapadas-de-fim-de-semana", title: "Escapadas de fim de semana", text: "Destinos perto para aproveitar em poucos dias.", image: "/imagens/estrada-onibus.svg", imageAlt: "Ônibus de turismo em estrada panorâmica" },
  { slug: "destinos-para-descansar", title: "Destinos para descansar", text: "Natureza, silêncio e tempo livre.", image: "/imagens/montanha-lago.svg", imageAlt: "Montanhas refletidas em um lago sereno" },
];

export function slugify(s: string): string {
  return String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalize(s: string): string {
  return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}
