# Blog Tour

Blog da agência de viagens **Tour**, feito com **Next.js (App Router)**, **React** e **Tailwind CSS v4**.

## Como rodar

Você precisa do [Node.js](https://nodejs.org) 20 ou mais recente.

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

Para gerar a versão de produção:

```bash
npm run build
npm start
```

## Marca

- **Logo oficial:** `public/logo/logo-tour.png` (azul-escuro, para fundos claros) e `public/logo/logo-tour-claro.png` (azul-claro da paleta, para o rodapé e o modo escuro). Ele é usado pelo componente `src/components/Brand.tsx`.
- **Regras do manual:** não alterar a cor (use só as cores da paleta), não cortar, não rotacionar, não colocar sobre ilustrações e não aplicar sombras, efeitos ou opacidade.
- **Paleta:** azul-escuro `#142c63`, verde-azulado `#1cabb0` e azul-claro `#caf5f7`. Os tons usados em cada contexto estão em `src/app/globals.css`.

## Estrutura

```
content/artigos/        Artigos em Markdown (um arquivo por artigo)
public/logo/            Logo oficial (PNG transparente)
public/imagens/         Imagens (ilustrações provisórias — troque por fotos reais)
src/app/                Páginas (rotas)
  page.tsx                Home
  artigos/                Lista de artigos, por categoria e por tema
  artigo/[slug]/          Leitura de um artigo
  privacidade/, termos/   Páginas institucionais (texto a definir)
  globals.css             Cores, fontes e estilos da marca (tokens)
  sitemap.ts, robots.ts   SEO
src/components/         Componentes React (Header, Hero, cards, busca, newsletter, rodapé…)
src/lib/site.ts         Configurações: contato, redes, menu, categorias, destinos
src/lib/articles.ts     Leitura dos arquivos Markdown
```

## Personalizar

- **Contato e redes sociais:** preencha `CONTACT` e `SOCIAL` em `src/lib/site.ts`. Campos vazios aparecem como placeholders no rodapé.
- **Domínio:** crie um arquivo `.env.local` com `NEXT_PUBLIC_SITE_URL=https://seudominio.com.br` (usado no sitemap e nas meta tags).
- **Cores:** edite as variáveis no topo de `src/app/globals.css`. Elas viram classes do Tailwind (`bg-sky`, `text-ink`, `bg-surface-sky`…). O tema escuro segue o sistema do visitante.
- **Imagens:** substitua os arquivos em `public/imagens/` por fotografias (JPG/WebP) e atualize os caminhos.
- **Newsletter:** hoje é demonstrativa (valida o e-mail, mas não envia). Para integrar, passe `onSubscribe` e `demo={false}` ao componente `Newsletter`.

## Escrever um artigo novo

Crie `content/artigos/<slug>.md` (o nome do arquivo vira a URL `/artigo/<slug>`):

```markdown
# Título do artigo

**Categoria:** Dicas para viajar melhor
**Data:** DD/MM/AAAA
**Tempo de leitura:** 5 minutos
**Temas:** Praias e natureza, Viagens em família
**Resumo:** Uma frase que aparece no card e na busca do Google.

![Descrição da imagem](/imagens/sua-imagem.jpg)

Introdução...

## Primeiro tópico

Texto...

## Dicas práticas

- Primeira dica.
- Segunda dica.

## Conclusão

Resumo e convite para continuar explorando o blog.
```

- **Categoria:** Viagens de avião, Viagens de ônibus, Roteiros e destinos ou Dicas para viajar melhor.
- **Temas** (opcional): Praias e natureza, Cidades e cultura, Viagens em família, Escapadas de fim de semana, Destinos para descansar.
- Links internos: `[texto](/artigo/outro-slug)`, `[texto](/artigos/categoria/roteiros-e-destinos)`.
