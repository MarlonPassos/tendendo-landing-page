import type { Metadata } from 'next';
import { Header } from '../../components/Shell';
import { notFound } from 'next/navigation';
import { affiliate, legalLinks, metaPixelId, pricing, site, whatsappPrivacy } from '../../data/site';

// Atualize esta data sempre que alterar o texto das páginas legais.
const updatedAt = '26 de novembro de 2026';

const pages = {
  'politica-de-privacidade': [
    ['Quem somos', 'O Tendendo (tendendo.com) divulga ofertas e novidades de marketplaces e não possui loja, cadastro ou conta de usuário. Para qualquer assunto sobre privacidade, fale com o responsável pelo Tendendo pelo e-mail de contato desta página.'],
    ['Quais dados tratamos e para quê', 'Navegação: a página lê a origem, o meio e a campanha da URL, quando reconhecidos, e registra visualizações e cliques, incluindo o grupo escolhido, para medir se os anúncios funcionam. Esses dados só são enviados à Meta se você aceitar. Preferência: a sua escolha no aviso de cookies fica salva no seu navegador até você limpá-la. E-mail: se você nos escrever, usamos seu endereço e sua mensagem apenas para responder. O site não possui cadastro, conta ou banco de dados próprio de visitantes. Um clique no convite não confirma a entrada no grupo.'],
    ['Medição com a Meta', 'Quando a medição com a Meta está disponível, ela só é ativada após a sua autorização, pedida em um aviso na primeira visita e disponível nas Preferências de privacidade da página inicial. Com o seu consentimento, o serviço da Meta pode processar cookies (como _fbp e _fbc), seu endereço IP, a URL visitada e informações do navegador, de acordo com as políticas da Meta. Sua escolha pode ser alterada a qualquer momento na página inicial.'],
    ['Compartilhamento e transferência', 'Os dados enviados à Meta, após o seu consentimento, podem ser processados em outros países, conforme as políticas da Meta. A hospedagem do site pode registrar o endereço IP por motivos técnicos e de segurança.'],
    ['WhatsApp e marketplaces', whatsappPrivacy + ' O WhatsApp e os marketplaces têm suas próprias políticas de privacidade.'],
    ['Seus direitos', 'Você pode pedir acesso, correção ou exclusão dos seus dados, ou revogar o seu consentimento, escrevendo para o e-mail de contato desta página. Responderemos em até 15 dias. Os dados tratados pela Meta também podem ser gerenciados nas configurações da sua conta Meta e nas Preferências de privacidade da página inicial.'],
    ['Contato', 'Ao entrar em contato por e-mail, você compartilha seu endereço e o conteúdo da mensagem para que possamos responder.'],
    ['Atualizações', 'Podemos atualizar esta política. A data de última atualização, no topo da página, indica a versão em vigor.'],
  ],
  'termos-de-uso': [
    ['Sobre o serviço', 'O Tendendo divulga conteúdo, novidades e oportunidades de marketplaces. O acesso aos grupos é gratuito e voluntário.'],
    ['Grupos de WhatsApp', 'Você entra pelo link de convite e pode sair do grupo quando quiser. As ofertas são publicadas pela administração do Tendendo, e o conteúdo dos grupos se limita a ofertas e novidades. Podemos alterar, suspender ou encerrar grupos a qualquer momento. Ao entrar, outros participantes podem ver seu número ou informações do seu perfil, conforme as configurações do WhatsApp.'],
    ['Compras', 'O Tendendo não realiza vendas diretas. Compras, pagamentos, entregas e atendimento do pedido são tratados pela loja responsável.'],
    ['Condições das ofertas', pricing],
    ['Links de afiliados', 'Alguns links divulgados podem ser de afiliados. Veja a página de transparência sobre links de afiliados para saber como isso funciona.'],
    ['Responsabilidade', 'As informações das ofertas vêm das lojas e podem mudar a qualquer momento. O Tendendo não garante a disponibilidade, o preço ou o estoque e, na medida permitida pela lei, não se responsabiliza por compras, entregas, atendimento ou conteúdo de sites de terceiros. Isso não afeta os direitos que a lei garante a você como consumidor perante a loja.'],
    ['Marcas e imagens', 'Nomes, marcas e imagens de produtos pertencem aos respectivos titulares e são usados para identificar as ofertas divulgadas. A marca e o conteúdo próprio do Tendendo não podem ser copiados sem autorização.'],
    ['Alterações', 'Podemos atualizar estes termos. A data de última atualização, no topo da página, indica a versão em vigor. Aplicam-se as leis do Brasil.'],
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
        <p className="updated">Última atualização: {updatedAt}</p>
        {pages[slug].map(([title, body]) => (
          <section key={title}><h2>{title}</h2><p>{body}</p></section>
        ))}
        {slug === 'politica-de-privacidade' && metaPixelId && (
          <p><a href="/#preferencias-de-privacidade">Alterar preferências de privacidade</a></p>
        )}
        <p>Dúvidas? <a href={`mailto:${site.email}`}>{site.email}</a></p>
      </main>
    </>
  );
}
