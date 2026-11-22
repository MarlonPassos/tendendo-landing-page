# Tendendo

Landing page em Next.js (App Router), TypeScript e CSS. O build exporta a home, as páginas institucionais, o sitemap e o robots.txt para `out/`. Em produção, o Nginx serve os arquivos estáticos.

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

As UTMs `utm_source`, `utm_medium`, `utm_campaign` e `utm_content` ficam na URL e em memória durante a visita. Use uma origem reconhecida (`facebook`, `instagram`, `meta`, `fb` ou `ig`) e, para emitir o nome da campanha, inclua o identificador em `NEXT_PUBLIC_ALLOWED_CAMPAIGNS`, separado por vírgulas.

O evento DOM `whatsapp_group_click` contém `group_id`, `timestamp` e, quando permitidos, `source` e `campaign`. Os convites recebem a URL original. A integração opcional com Meta Pixel ou Google Analytics deve configurar os IDs e carregar o SDK somente após o consentimento aplicável. O projeto vem com essas integrações desativadas e sem transmissão ou persistência dos eventos. Para medir CTR, registre impressões e cliques na mesma base de consentimento. O clique mede a abertura do convite, sem confirmar adesão.

Uma futura rota `/entrar/:slug` com resposta HTTP 302/307 e atualização de convites sem rebuild exigiria serviço próprio ou configuração consultada dinamicamente. A troca manual no arquivo mantém a operação estática.

## Docker. Deploy e atualização

```sh
cp .env.example .env
docker compose up -d --build
docker compose ps
curl -fsS http://localhost:8080/healthz
```

A porta padrão no host é 8080. Para alterá-la, defina `TENDENDO_PORT` no `.env`. Para atualizar, rode novamente `docker compose up -d --build` após editar o conteúdo ou as variáveis de build.

No domínio definitivo, configure o proxy reverso para encaminhar ao serviço na porta configurada e terminar TLS. Confirme a origem em `SITE_URL` antes do build. O apontamento DNS deve ser feito separadamente quando autorizado.
