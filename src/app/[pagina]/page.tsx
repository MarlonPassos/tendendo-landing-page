import type { Metadata } from 'next';
import { Header } from '../../components/Shell';
import { notFound } from 'next/navigation';
import { affiliate, legalLinks, pricing, site, whatsappPrivacy } from '../../data/site';

const pages = {
  'politica-de-privacidade': [
    ['Navegação e campanhas', 'A página lê os parâmetros da URL durante a visita. Os eventos locais registram visualizações e cliques, incluindo o grupo escolhido e a origem, o meio e a campanha reconhecidos. Um clique no convite não confirma a entrada no grupo. Quando a medição com a Meta está disponível, ela só é ativada após a sua autorização, pedida em um aviso na primeira visita e disponível nas Preferências de privacidade da página inicial. O serviço da Meta pode processar cookies, a URL visitada e informações do navegador de acordo com suas políticas. Sua escolha fica salva no navegador e pode ser alterada na página inicial.'],
    ['WhatsApp e marketplaces', whatsappPrivacy + ' O WhatsApp e os marketplaces têm suas próprias políticas de privacidade.'],
    ['Contato', 'Ao entrar em contato por e-mail, você compartilha seu endereço e o conteúdo da mensagem para que possamos responder.'],
  ],
  'termos-de-uso': [
    ['Sobre o serviço', 'O Tendendo divulga conteúdo, novidades e oportunidades de marketplaces. O acesso aos grupos é gratuito e voluntário.'],
    ['Compras', 'O Tendendo não realiza vendas diretas. Compras, pagamentos, entregas e atendimento do pedido são tratados pela loja responsável.'],
    ['Condições das ofertas', pricing],
  ],
  'links-de-afiliados': [
    ['Como funcionam os links', affiliate],
    ['Onde você compra', 'A compra é concluída diretamente na loja responsável. O Tendendo divulga ofertas e não realiza vendas diretas.'],
    ['Condições das ofertas', pricing],
  ],
} satisfies Record<keyof typeof legalLinks, [string, string][]>;

type Props = { params: Promise<{ pagina: string }> };

function getSlug(pagina: string) {
  if (!Object.hasOwn(pages, pagina)) notFound();
  return pagina as keyof typeof pages;
}

export function generateStaticParams() {
  return Object.keys(pages).map(pagina => ({ pagina }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = getSlug((await params).pagina);
  return { title: legalLinks[slug], alternates: { canonical: `/${slug}/` } };
}

export default async function LegalPage({ params }: Props) {
  const slug = getSlug((await params).pagina);
  return (
    <>
      <Header />
      <main id="conteudo" className="wrap section legal">
        <a href="/">Voltar ao início</a>
        <h1>{legalLinks[slug]}</h1>
        <p className="review">Texto preliminar, sujeito a revisão jurídica.</p>
        {pages[slug].map(([title, body]) => (
          <section key={title}><h2>{title}</h2><p>{body}</p></section>
        ))}
        {slug === 'politica-de-privacidade' && /^\d+$/.test(process.env.NEXT_PUBLIC_META_PIXEL_ID || '') && (
          <p><a href="/#preferencias-de-privacidade">Alterar preferências de privacidade</a></p>
        )}
        <p>Dúvidas? <a href={`mailto:${site.email}`}>{site.email}</a></p>
      </main>
    </>
  );
}
