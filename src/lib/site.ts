import type { IconName } from "@/components/Icon";

/**
 * Configurações do site. Preencha os campos vazios com os dados reais da Rota Tour.
 * Campos vazios aparecem no rodapé como placeholders, nunca com dados inventados.
 */
export const SITE = {
  name: "Rota Tour",
  title: "Rota Tour — Blog de viagens, destinos e dicas",
  description:
    "Dicas de viagem, roteiros e inspiração para viajar de avião e de ônibus com tranquilidade.",
  // Endereço público do site, usado no sitemap e nas meta tags (prévia do WhatsApp, redes sociais).
  // Ordem: NEXT_PUBLIC_SITE_URL (seu domínio) → domínio de produção da Vercel → localhost.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  /** Imagem de compartilhamento (PNG 1200×630). WhatsApp não aceita SVG. */
  ogImage: { url: "/og-image.png", width: 1200, height: 630, alt: "Rota Tour — logo" },
  about:
    "A Rota Tour ajuda você a planejar viagens de avião e de ônibus com tranquilidade — do primeiro roteiro ao retorno para casa.",
};

export const CONTACT = {
  phone: "(11) 90000-9008",
  email: "rotatour@gmail.com",
  address: "Rua Jundiaí, 123",
  hours: "9h às 18h, de segunda a sexta",
};

/** Nome nas redes sociais. Exibido só como texto (ainda não há perfis para linkar). */
export const SOCIAL_HANDLE = "@rota.tour";

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
  { slug: "praias-e-natureza", title: "Praias e natureza", text: "Mar calmo, trilhas e paisagens para recarregar.", image: "/imagens/destino-praias-rio.jpg", imageAlt: "Cristo Redentor com vista para a baía e as praias do Rio de Janeiro" },
  { slug: "cidades-e-cultura", title: "Cidades e cultura", text: "Museus, arquitetura e sabores locais.", image: "/imagens/destino-cidades-pisa.jpg", imageAlt: "Torre inclinada e catedral de Pisa, na Itália" },
  { slug: "viagens-em-familia", title: "Viagens em família", text: "Roteiros pensados para todas as idades.", image: "/imagens/destino-familia-orlando.jpg", imageAlt: "Castelo de parque temático com estátua em primeiro plano" },
  { slug: "escapadas-de-fim-de-semana", title: "Escapadas de fim de semana", text: "Destinos perto para aproveitar em poucos dias.", image: "/imagens/destino-escapadas-gramado.jpg", imageAlt: "Vista aérea de Gramado, na Serra Gaúcha, com construção em estilo enxaimel" },
  { slug: "destinos-para-descansar", title: "Destinos para descansar", text: "Natureza, silêncio e tempo livre.", image: "/imagens/destino-descansar-lago.jpg", imageAlt: "Lago de água azul-turquesa cercado por montanhas e pinheiros" },
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
