# Tendendo

Landing page em Next.js (App Router), TypeScript e CSS. O build exporta a home, as páginas institucionais, o sitemap e o robots.txt para `out/`. O Cloudflare Pages ou o Nginx pode servir os arquivos estáticos.

## Desenvolvimento e validação

Requer Node.js 24+ e npm.

```sh
npm ci
cp .env.example .env
npm run dev
```

Abra [localhost:3000](http://localhost:3000). Para validar a exportação de produção:

```sh
npm run lint
npm run typecheck
npm run build
npm test
```

Os testes verificam o HTML exportado, as páginas institucionais e os cinco convites fornecidos.

## Conteúdo e configuração

- Edite `src/data/groups.ts` para alterar os cards e os convites. Troque `inviteUrl` para substituir um convite, ajuste `order` para reordenar ou use `enabled: false` para ocultar temporariamente um grupo. Reconstrua a página após cada mudança.
- Defina `SITE_URL` com a origem HTTPS de produção. Ela alimenta os links canônicos, as imagens sociais e o sitemap. `CONTACT_EMAIL` configura o contato. O link “Página Tendendo” só aparece se `FACEBOOK_URL` estiver preenchida.
- Edite as minutas em `src/app/[pagina]/page.tsx` e revise os textos jurídicos antes da publicação. Confira também os convites no WhatsApp com uma conta apropriada.
- Os arquivos em `public/assets/` são derivações rasterizadas dos materiais entregues em `docs/tendendo_assets/`.

## Campanhas

A página reconhece `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` e `fbclid`. Eles permanecem na URL durante a navegação por âncoras. Os convites mantêm suas URLs originais.

Para uma campanha específica, use `/?grupo=tecnologia`, `/?grupo=radar`, `/?grupo=casa`, `/?grupo=esportes` ou `/?grupo=escolar`. O grupo aparece destacado e recebe foco. Também é possível usar uma âncora como `/#grupo-tecnologia`.

A camada DOM emite `page_view`, `group_click`, `hero_cta_click` e `final_cta_click` no objeto `window`. Para testar, inspecione `event.detail` com `window.addEventListener('group_click', console.log)`. No clique de grupo, o evento contém `group_id` e `group_name`. Os campos `source`, `medium` e `campaign` são incluídos quando reconhecidos.

- Origens aceitas: `facebook`, `instagram`, `meta`, `fb` e `ig`.
- Meios aceitos: `paid`, `paid_social`, `social`, `cpc` e `cpm`.
- Para incluir nomes de campanhas, configure `NEXT_PUBLIC_ALLOWED_CAMPAIGNS` com valores separados por vírgula. Use identificadores sem dados pessoais.

O Meta Pixel fica desativado por padrão. Para disponibilizá-lo, preencha `NEXT_PUBLIC_META_PIXEL_ID` com o ID numérico real e execute um novo build. O SDK só carrega após autorização em **Preferências de privacidade**, na página inicial. O visitante pode recusar ou revogar no mesmo lugar. Global Privacy Control e Do Not Track desativam o envio. Quando autorizado, o SDK da Meta pode processar a URL da página e cookies próprios conforme as políticas da Meta. Os eventos da aplicação não incluem `fbclid`, `utm_content`, `utm_term`, dados de contato ou o convite do WhatsApp.

A camada DOM também é o ponto de integração para GA4. Qualquer adaptador futuro deve obedecer ao consentimento e evitar duplicação. A medição conta visualizações e cliques. A entrada efetiva no grupo requer confirmação independente.

Uma futura rota `/entrar/:slug` com resposta HTTP 302/307 e atualização de convites sem rebuild exigiria serviço próprio ou configuração consultada dinamicamente. A troca manual no arquivo mantém a operação estática.

## Cloudflare Pages pelo GitHub

Importe `MarlonPassos/tendendo-landing-page` em **Workers & Pages → Pages → Import an existing Git repository** e configure o projeto com estes valores:

| Campo | Valor |
| --- | --- |
| Framework preset | Next.js (Static HTML Export) |
| Production branch | `main` |
| Build command | `npx next build` |
| Build output directory | `out` |
| Root directory | Raiz do repositório |

O arquivo `.node-version` seleciona Node.js 24 no build. Use as variáveis de build de `.env.example` conforme necessário. Defina `SITE_URL` com a origem HTTPS pública para que os links canônicos e o sitemap apontem para o domínio correto. `TENDENDO_PORT` é usada pelo Docker Compose.

O Next.js já declara `output: 'export'` em `next.config.ts`. Os logotipos e imagens são servidos diretamente de `public/assets/`. Com a integração do GitHub habilitada, alterações na branch `main` acionam o deploy de produção.

[Guia de exportação estática do Next.js no Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)

## Docker. Deploy e atualização

```sh
cp .env.example .env
docker compose up -d --build
docker compose ps
curl -fsS http://localhost:8080/healthz
```

A porta padrão no host é 8080. Para alterá-la, defina `TENDENDO_PORT` no `.env`. Para atualizar, rode novamente `docker compose up -d --build` após editar o conteúdo ou as variáveis de build.

No domínio definitivo, configure o proxy reverso para encaminhar ao serviço na porta configurada e terminar TLS. Confirme a origem em `SITE_URL` antes do build. O apontamento DNS deve ser feito separadamente quando autorizado.
