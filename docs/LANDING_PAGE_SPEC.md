# LANDING_PAGE_SPEC.md — Tendendo.com

> Especificação executável para agente de desenvolvimento. Objetivo: construir uma landing page profissional, mobile-first, que converta visitantes de campanhas Meta Ads em participantes voluntários dos grupos temáticos de WhatsApp do Tendendo.

## 1. Instruções ao agente

- Implemente a página integralmente, não apenas um mockup. Preserve a identidade da marca e o conteúdo factual deste documento.
- Priorize clareza, confiança, velocidade, acessibilidade e conversão; não use contadores falsos, escassez artificial, depoimentos inventados ou promessas de descontos garantidos.
- Use os arquivos visuais fornecidos pelo usuário como fonte de verdade. Não redesenhe o logotipo, não substitua a marca por ícones genéricos e não confunda o símbolo com o logotipo completo.
- Caso esteja trabalhando em repositório existente, identifique framework, convenções, scripts e deploy antes de modificar. Caso seja projeto novo, use Astro + TypeScript + CSS (ou Tailwind, se facilitar), com saída estática e Docker multi-stage + Nginx. Não é necessário banco de dados nem n8n para a primeira versão.
- Não presuma que a página já está publicada em tendendo.com: prepare configuração de domínio e deploy; não altere DNS sem autorização.
- Evite dependências desnecessárias, chamadas a APIs externas em tempo de execução e trackers ativados sem consentimento aplicável.

## 2. Identidade e posicionamento

**Marca:** Tendendo / Tendendo.com  
**Assinatura visual:** “TENDÊNCIAS • OFERTAS • EM ALTA”  
**Frase institucional:** “Tendendo — Descubra. Acompanhe. Aproveite.”  
**Proposta:** plataforma digital de descoberta de tendências, produtos, tecnologia, novidades e ofertas de marketplaces como Amazon, Shopee e Mercado Livre. Comunidades temáticas gratuitas no WhatsApp. Não é loja virtual e não realiza vendas diretas.

### Arquivos de referência fornecidos

- `assets/logo-principal.jpeg`: composição vertical completa com logotipo, nome e assinatura.
- `assets/brand-variacoes.png`: prancha de identidade com versões principal, horizontal, símbolo, aplicativos e monocromáticas; **é uma prancha de referência, não usar a imagem inteira como logo no site**.
- `assets/simbolo.png`: símbolo T flamejante em fundo preto, adequado para usos visuais e, após derivação apropriada, favicon.

**Importante:** os arquivos enviados são imagens rasterizadas. Para obter um logotipo horizontal recortado da prancha, recorte cuidadosamente apenas a região da marca horizontal, preservando proporções, sem fundo/textos adjacentes. Não invente versão vetorial. Se não conseguir extrair com qualidade, use a composição vertical ou o símbolo com o nome em texto como solução temporária claramente identificada para revisão.

### Direção visual

- Tema preferencial escuro, inspirado no preto de fundo e no laranja/vermelho/amarelo da marca; aparência tecnológica, energética, mas legível e acolhedora.
- **Paleta aproximada extraída visualmente das imagens (validar no design):** fundo `#080808`, superfície `#151518`, texto `#F7F7F7`, texto secundário `#C6C6CC`, amarelo `#FFD21A`, laranja `#FF8A00`, vermelho-laranja `#F04413`, vermelho `#D71912`. Estas cores são aproximações, não valores oficiais de manual.
- Use o gradiente de marca amarelo → laranja → vermelho apenas em destaques, bordas/ícones e elementos decorativos; preserve contraste. CTA de WhatsApp pode ser verde (`#16A34A` ou variante com contraste suficiente) para reconhecimento imediato, em harmonia com a identidade.
- Tipografia contemporânea de fácil leitura, por exemplo Inter ou system font. Não alegar que uma fonte específica é oficial. Cabeçalhos fortes; texto de corpo confortável; cantos arredondados; sombras sutis; animações discretas e respeitando `prefers-reduced-motion`.
- Ícones consistentes e sem dependência de imagens genéricas de promoções. Se usar imagens de produtos, só usar materiais licenciados/autorizados; preferir ilustrações abstratas e ícones.

## 3. Público e conversão

Público vindo de Facebook e Instagram, principalmente no celular, interessado em ofertas e descobertas por categoria. **Conversão primária:** clique em “Entrar no grupo” que abre o convite do WhatsApp. **Conversão observável:** clique no link; a entrada efetiva no grupo não pode ser inferida automaticamente desse clique.

CTAs claros e repetidos em locais apropriados. Não exigir cadastro. Abrir convites reais por links HTTPS. Informar que a adesão é gratuita e voluntária, e que ao entrar participantes podem ver informações do perfil/número conforme as configurações do WhatsApp.

## 4. Estrutura e copy obrigatórias

### 4.1 Cabeçalho

Marca Tendendo, links âncora “Grupos”, “Como funciona”, “Sobre” e CTA “Explorar grupos”. Em mobile, navegação enxuta, sem prejudicar a dobra inicial. Cabeçalho acessível e opcionalmente sticky.

### 4.2 Hero

**Título:** “Descubra o que está em alta. Aproveite as melhores oportunidades.”

**Subtítulo:** “Tecnologia, produtos para casa, esportes, materiais escolares e muito mais. No Tendendo, você encontra tendências, novidades e ofertas selecionadas de lojas como Amazon, Shopee e Mercado Livre.”

**Complemento:** “Entre gratuitamente nos nossos grupos de WhatsApp e acompanhe as oportunidades que combinam com você.”

CTA primário: **Explorar grupos de ofertas** (âncora `#grupos`).  
CTA secundário: **Conhecer o Tendendo** (âncora `#sobre`).

Incluir a marca e elementos gráficos coerentes com o símbolo flamejante, sem saturar a tela.

### 4.3 Grupos de WhatsApp — seção `#grupos`

**Título:** “Escolha os assuntos que mais combinam com você”  
**Descrição:** “Participe gratuitamente de um ou mais grupos e acompanhe as novidades de acordo com seus interesses.”

Exibir cinco cards responsivos com ícone, nome, descrição e CTA individual. Os convites abaixo são **dados fornecidos pelo usuário**; preservar exatamente:

| Grupo | Descrição | CTA | URL |
|---|---|---|---|
| 🔥 Radar de Ofertas | Oportunidades de diferentes categorias: produtos populares, promoções, achados e novidades em um só lugar. | Entrar no Radar de Ofertas | https://chat.whatsapp.com/Hv6LSL0y0Z04ZODzvAlgPd |
| 💻 Ofertas de Tecnologia | Eletrônicos, acessórios, informática, gadgets e produtos inteligentes. | Entrar no grupo de Tecnologia | https://chat.whatsapp.com/CC4v27uoukuKeyEIAeOn57 |
| 🏋️ Esportes e Fitness | Esportes, exercícios, atividades físicas, acessórios esportivos e bem-estar. | Entrar no grupo de Esportes e Fitness | https://chat.whatsapp.com/ECCm9RHJNF04smRSx66cC0 |
| 📚 Escolar e Pedagógico | Materiais escolares, papelaria, recursos pedagógicos e organização dos estudos. | Entrar no grupo Escolar e Pedagógico | https://chat.whatsapp.com/BQNHvawkTSFF9JZKnppy7u |
| 🏡 Ofertas Casa e Estilo | Casa, decoração, cozinha, organização e utilidades domésticas. | Entrar no grupo Casa e Estilo | https://chat.whatsapp.com/CygPqiCg21kFtgQZ7xB5LK |

Abrir links externos com `target="_blank" rel="noopener noreferrer"` quando apropriado. Fornecer indicação acessível de abertura em nova aba. Não afirmar que os links estão ativos sem teste real.

### 4.4 Benefícios

**Título:** “Por que acompanhar o Tendendo?”

Cinco benefícios, com ícones:
1. **Ofertas em um só lugar:** oportunidades de diferentes lojas.
2. **Grupos por interesse:** temas relevantes para você.
3. **Novidades e tendências:** produtos e tecnologias em destaque.
4. **Acesso gratuito:** sem mensalidade ou assinatura.
5. **Praticidade no WhatsApp:** conteúdos no aplicativo que você já usa.

### 4.5 Como funciona — seção `#como-funciona`

Quatro passos:
1. **Escolha seu grupo:** explore as categorias.
2. **Entre gratuitamente:** clique e participe pelo WhatsApp.
3. **Descubra oportunidades:** acompanhe as ofertas e novidades compartilhadas.
4. **Compre na loja parceira:** finalize diretamente no marketplace responsável.

### 4.6 Sobre e transparência — seção `#sobre`

**Título:** “O Tendendo conecta você a novidades e oportunidades.”

Texto institucional: “O Tendendo não é uma loja virtual e não realiza a venda direta dos produtos divulgados. Somos uma plataforma de conteúdo, descoberta de produtos e divulgação de ofertas. Reunimos oportunidades de marketplaces e organizamos conteúdos por interesse.”

Aviso de afiliados em destaque discreto, porém legível: “Alguns links compartilhados são links de afiliados. Podemos receber comissão por compras elegíveis, sem custo adicional decorrente dessa comissão para você.”

Aviso de preços: “Preços, disponibilidade, frete e promoções podem mudar sem aviso prévio. Confirme as condições finais na loja responsável.”

### 4.7 CTA final

**Título:** “As próximas oportunidades podem estar a um clique de distância.”

**Texto:** “Faça parte da comunidade Tendendo e acompanhe as tendências e ofertas dos assuntos que você mais gosta.”

CTA: **Escolher meu grupo no WhatsApp** → `#grupos`.

Fechamento: “Tendendo — Descubra. Acompanhe. Aproveite.”

### 4.8 Rodapé

- Marca e assinatura “Tendências, tecnologia, novidades e ofertas.”
- Site: https://tendendo.com
- Facebook: “Página Tendendo” — **não inventar URL**; exibir somente quando URL for configurada.
- Contato: mailto:tendendo.oficial@gmail.com
- Links: Sobre o Tendendo, Política de Privacidade, Termos de Uso, Transparência sobre Links de Afiliados, Contato.
- Criar páginas simples e honestas para Política de Privacidade, Termos e Afiliados, com campos editáveis e marcação de revisão jurídica; **não apresentar textos gerados como parecer jurídico**.

## 5. Arquitetura de links e grupos

Criar arquivo de configuração tipado, por exemplo `src/data/groups.ts`, com `id`, `name`, `description`, `icon`, `inviteUrl`, `enabled`, `order` e opcional `campaignTag`. A lista dos cinco grupos acima deve funcionar sem backend.

Para MVP, os botões podem apontar diretamente aos convites. Para evolução futura, prever uma rota interna como `/entrar/:slug` que registre clique com consentimento e redirecione via HTTP 302/307 para o convite configurado. **Não implementar redirecionamento dinâmico fingindo que funciona em site 100% estático**: caso seja necessário trocar links sem rebuild, adicionar serviço/backend ou arquivo de configuração servido dinamicamente e documentar trade-offs. Não implementar distribuição automática por capacidade sem fonte confiável para verificar vagas; oferecer desativação e substituição manual dos convites.

## 6. Analytics, privacidade e campanhas

- Preparar UTMs para campanhas Meta Ads (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`); preservá-las para atribuição local quando aplicável.
- Definir evento `whatsapp_group_click` com apenas `group_id`, origem/campanha permitida e timestamp, sem número de telefone ou dados pessoais sensíveis.
- Meta Pixel/Google Analytics **opcionais e desabilitados por padrão** até ID/configuração e mecanismo de consentimento adequados. Não enviar eventos a serviços de terceiros antes de consentimento quando exigido.
- Se houver backend para eventos, limitar dados coletados, definir retenção, proteção contra abuso e documentação na Política de Privacidade.
- Não prometer rastrear ingresso efetivo nos grupos; métrica principal é CTR dos botões e cliques por grupo.
- A página deve explicar claramente o destino do clique e não usar redirecionamentos enganosos.

## 7. SEO, performance e acessibilidade

- Idioma `pt-BR`; `title` sugerido: “Tendendo | Tendências, novidades e grupos de ofertas no WhatsApp”.
- Meta description sugerida: “Descubra tendências, novidades e ofertas de tecnologia, casa, esportes e mais. Participe gratuitamente dos grupos de WhatsApp do Tendendo.”
- Open Graph/Twitter Cards com imagem social da marca, gerada a partir de assets autorizados; favicon derivado do símbolo fornecido.
- HTML semântico, um H1, headings em ordem, landmarks, navegação por teclado, foco visível, alt adequado, contraste WCAG AA e alvos de toque confortáveis.
- Lazy loading de imagens abaixo da dobra, dimensões explícitas, formatos otimizados (WebP/AVIF se viável), evitar layout shift.
- Objetivos indicativos: Lighthouse >= 90 em Performance, Acessibilidade, Boas Práticas e SEO em ambiente de teste, com atenção especial a LCP, CLS e INP. Não afirmar resultados sem executar auditoria.
- Layout: 320 px a desktop amplo; testar 360, 390, 768, 1024 e 1440 px. Sem scroll horizontal.

## 8. Entregáveis técnicos

Se projeto novo:

```text
/
├── src/
│   ├── components/ (Header, Hero, GroupCard, Benefits, Steps, Disclosure, Footer)
│   ├── data/groups.ts
│   ├── pages/index.astro
│   └── styles/global.css
├── public/assets/ (logos e símbolos fornecidos/derivados)
├── public/robots.txt
├── Dockerfile
├── docker-compose.yml
├── nginx.conf (se necessário)
├── .env.example
└── README.md
```

- Criar Dockerfile multi-stage com build estático e Nginx não privilegiado, se viável; mapear porta local configurável, por exemplo `8080:8080`, sem prometer que `80` esteja livre.
- Incluir `docker compose up -d --build`, instruções de atualização, volumes apenas se necessários e healthcheck.
- Não incorporar segredos no código/imagem. IDs de analytics e URLs institucionais devem ser configuráveis.
- Criar testes básicos de renderização e de correspondência exata dos cinco links; rodar lint/build/teste antes de concluir.

## 9. Critérios de aceite

- [ ] Página completa, navegável e responsiva com identidade Tendendo.
- [ ] Uso fiel dos arquivos de marca, sem distorção nem recriação não autorizada.
- [ ] Todos os cinco cards exibidos com nomes, descrições e URLs exatas.
- [ ] CTAs do hero e final rolam para os grupos; CTAs dos cards abrem convites corretos.
- [ ] Textos institucionais, transparência de afiliados e variação de preços presentes.
- [ ] SEO e acessibilidade básicos implementados.
- [ ] Eventos de clique preparados sem rastreamento invasivo ou promessa de ingresso confirmado.
- [ ] Páginas institucionais presentes ou explicitamente pendentes de revisão, sem links quebrados.
- [ ] Build, testes e Docker Compose validados (ou limitações documentadas).
- [ ] README explica instalação, edição de grupos, atualização dos links e deploy.

## 10. Ordem de execução para o agente

1. Inspecionar repositório e assets; relatar dependências e eventuais lacunas.
2. Implementar estrutura, tema e componentes mobile-first.
3. Inserir conteúdo e cinco convites exatamente como fornecidos.
4. Criar páginas institucionais e configuração de grupos.
5. Adicionar SEO, acessibilidade, métricas opt-in e imagens otimizadas.
6. Preparar Docker e documentação.
7. Executar build, testes e checagens; corrigir problemas.
8. Entregar resumo do que foi feito, comandos para executar e pendências de revisão (especialmente URLs externas, textos jurídicos e analytics).

**Não bloquear a implementação por perguntas secundárias:** use defaults indicados e registre pendências. Pergunte somente se houver impedimento real, como ausência de acesso aos assets ou conflito irreconciliável com o projeto existente.
