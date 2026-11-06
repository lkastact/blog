# Rota Tour no Blogger — como instalar

O tema `tema-rota-tour.xml` reproduz o visual do site feito em Next.js. São as mesmas cores, fontes, logo, cabeçalho, hero, categorias, cards, transporte, destinos, newsletter, rodapé e página de artigo.

As fotos e o logo são carregados do seu GitHub (`lkastact/blog`, pasta `public/`). **O repositório precisa continuar público** e não pode mudar de nome. Se você apagar ou renomear uma imagem lá, ela some do blog.

## 1. Faça backup do tema atual

Blogger → **Tema** → seta ▾ ao lado de "Personalizar" → **Fazer backup** → Baixar.

## 2. Instale o tema novo

1. **Tema** → seta ▾ → **Editar HTML**.
2. Clique dentro do código, aperte **Ctrl+A** e depois **Delete**.
3. Abra `tema-rota-tour.xml` no Bloco de Notas, copie tudo (**Ctrl+A**, **Ctrl+C**) e cole no Blogger.
4. Clique em **Salvar** (ícone de disquete).

Se o Blogger mostrar uma mensagem de erro, copie o texto dela e me mande.

## 3. Configurações

- **Configurações → Postagens → Número máximo de postagens exibidas na página principal:** 6.
- **Configurações → Ícone do site (favicon):** envie uma versão quadrada do logo.
- **Configurações → Descrição do blog:** "Dicas de viagem, roteiros e inspiração para viajar de avião e de ônibus com tranquilidade."

## 4. Crie as postagens

Para cada arquivo da pasta `postagens/`:

1. **Nova postagem** → digite o **título** (tabela abaixo).
2. No canto superior esquerdo, troque **"Modo de escrever"** para **"Visualização em HTML"** (ícone `<>`).
3. Cole o conteúdo do arquivo `.html`.
4. No painel da direita:
   - **Marcadores:** coloque os da tabela, separados por vírgula e escritos **exatamente igual**, com acentos e maiúsculas. São eles que ligam a postagem às categorias e aos destinos da home.
   - **Publicada em:** a data da tabela (opcional).
   - **Link permanente → Personalizado:** o "slug" da tabela (opcional, deixa o link mais bonito).
5. **Publicar**.

| Título | Marcadores | Data | Slug |
|---|---|---|---|
| Como planejar sua próxima viagem sem estresse | Dicas para viajar melhor, Escapadas de fim de semana, Viagens em família | 20/10/2026 | como-planejar-sua-proxima-viagem-sem-estresse |
| Viagem de avião: o que você precisa saber antes de embarcar | Viagens de avião, Cidades e cultura | 14/10/2026 | viagem-de-aviao-o-que-voce-precisa-saber-antes-de-embarcar |
| Viajar de ônibus também pode ser uma experiência incrível | Viagens de ônibus, Escapadas de fim de semana, Praias e natureza, Viagens em família | 07/10/2026 | viajar-de-onibus-tambem-pode-ser-uma-experiencia-incrivel |
| Como montar um roteiro de viagem perfeito | Roteiros e destinos, Cidades e cultura, Viagens em família | 30/09/2026 | como-montar-um-roteiro-de-viagem-perfeito |
| Destinos para descansar e renovar as energias | Roteiros e destinos, Destinos para descansar, Praias e natureza | 23/09/2026 | destinos-para-descansar-e-renovar-as-energias |
| O que levar na mala para viajar com tranquilidade | Dicas para viajar melhor, Viagens em família, Praias e natureza | 16/09/2026 | o-que-levar-na-mala-para-viajar-com-tranquilidade |

**Artigos novos:** a primeira imagem da postagem vira a foto do card. A primeira categoria (Viagens de avião, Viagens de ônibus, Roteiros e destinos ou Dicas para viajar melhor) aparece acima do título.

## 5. Crie as páginas institucionais

Em **Páginas → Nova página**, crie duas, com estes títulos exatos, para os links do rodapé funcionarem:

- **Política de privacidade** (o endereço fica `/p/politica-de-privacidade.html`)
- **Termos de uso** (o endereço fica `/p/termos-de-uso.html`)

O texto delas deve vir da empresa (LGPD).

## O que muda em relação ao site Next.js

- **Busca:** usa a busca do próprio Blogger, que abre uma página de resultados, em vez de filtrar na hora enquanto você digita.
- **Categorias e destinos:** são os **marcadores** do Blogger (`/search/label/...`).
- **Tempo de leitura:** não aparece, porque o Blogger não oferece essa informação.
- **Comentários:** não estão no tema. Se quiser, dá para adicionar.
- **Newsletter:** continua demonstrativa (valida o e-mail, mas não envia).
- **Modo escuro:** acompanha o sistema do visitante, como no site.
