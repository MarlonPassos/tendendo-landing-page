import type { Metadata } from 'next';
import { LandingInteractions } from '../components/LandingInteractions';
import { Header } from '../components/Shell';
import { Icon } from '../components/Icon';
import { groups, type Group } from '../data/groups';
import { affiliate, pricing, whatsappPrivacy } from '../data/site';

export const metadata: Metadata = { alternates: { canonical: '/' } };

const benefits = [
  ['bag', 'Ofertas em um só lugar', 'Oportunidades de diferentes lojas.'],
  ['grid', 'Grupos por interesse', 'Temas relevantes para você.'],
  ['trend', 'Novidades e tendências', 'Produtos e tecnologias em destaque.'],
  ['gift', 'Acesso gratuito', 'Sem mensalidade ou assinatura.'],
  ['chat', 'Praticidade no WhatsApp', 'Conteúdos no aplicativo que você já usa.'],
] as const;

const steps = [
  ['Escolha seu grupo', 'Explore as categorias.'],
  ['Entre gratuitamente', 'Clique e participe pelo WhatsApp.'],
  ['Descubra oportunidades', 'Acompanhe as ofertas e novidades compartilhadas.'],
  ['Compre na loja parceira', 'Finalize diretamente no marketplace responsável.'],
] as const;

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <h1 id="hero-title">Ofertas e achadinhos direto no seu WhatsApp. <em>Grátis!</em></h1>
          <p>Descubra tendências, novidades, cupons e oportunidades de lojas como Amazon, Shopee e Mercado Livre.</p>
          <p>Escolha os assuntos que mais combinam com você e participe gratuitamente dos nossos grupos de ofertas.</p>
          <div className="actions" data-dock-hide>
            <a className="button primary" href="#grupos" data-analytics="hero_cta_click">Explorar grupos grátis</a>
            <a className="button secondary" href="#sobre">Conhecer o Tendendo</a>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/simbolo-360.webp" srcSet="/assets/simbolo-360.webp 304w, /assets/simbolo-720.webp 608w"
            sizes="(max-width: 680px) 165px, (max-width: 900px) 250px, 340px"
            alt="" width="304" height="360" fetchPriority="high" />
        </div>
      </div>
    </section>
  );
}

function GroupCard({ group }: { group: Group }) {
  return (
    <li id={`grupo-${group.category}`} data-category={group.category} data-group={group.id} tabIndex={-1}
      className={`group-card ${group.icon === 'flame' ? 'featured' : ''}`}>
      <span className="icon-tile"><Icon name={group.icon} /></span>
      <h3>{group.name}</h3>
      <p>{group.description}</p>
      <a className="button whatsapp" data-group-id={group.id} data-group-name={group.name} href={group.inviteUrl}
        target="_blank" rel="noopener noreferrer">
        <Icon name="whatsapp" />
        <span>Entrar grátis<span className="sr-only"> em {group.name} (WhatsApp, abre em nova aba)</span></span>
      </a>
    </li>
  );
}

export default function Home() {
  const enabledGroups = groups.filter(group => group.enabled).sort((a, b) => a.order - b.order);
  return (
    <>
      <Header home />
      <main id="conteudo">
        <Hero />
        <section className="wrap section" id="grupos" tabIndex={-1} aria-labelledby="groups-title">
          <p className="eyebrow">Grupos no WhatsApp</p>
          <h2 id="groups-title">Escolha os assuntos que mais combinam com você</h2>
          <p className="intro">Grupos gratuitos. Escolha seus assuntos favoritos e saia quando quiser.</p>
          {enabledGroups.length ? (
            <>
              <ul className="group-grid" data-dock-hide>{enabledGroups.map(group => <GroupCard group={group} key={group.id} />)}</ul>
              <p className="privacy-note"><Icon name="info" /><span>Os convites abrem o WhatsApp em nova aba. {whatsappPrivacy}</span></p>
            </>
          ) : <p>Os convites estão temporariamente indisponíveis.</p>}
        </section>
        <section className="benefits section" aria-labelledby="benefits-title">
          <div className="wrap">
            <h2 id="benefits-title">Por que acompanhar o Tendendo?</h2>
            <ul className="benefit-grid">{benefits.map(([icon, title, text]) => (
              <li key={icon}><span className="icon-tile"><Icon name={icon} /></span><h3>{title}</h3><p>{text}</p></li>
            ))}</ul>
          </div>
        </section>
        <section className="wrap section" id="como-funciona" aria-labelledby="steps-title">
          <h2 id="steps-title">Como funciona</h2>
          <ol className="steps">{steps.map(([title, text], index) => (
            <li key={title}><span className="step-number" aria-hidden="true">{index + 1}</span><h3>{title}</h3><p>{text}</p></li>
          ))}</ol>
        </section>
        <section className="about section" id="sobre" aria-labelledby="about-title">
          <div className="wrap about-inner">
            <div>
              <p className="eyebrow">Sobre o Tendendo</p>
              <h2 id="about-title">O Tendendo conecta você a novidades e oportunidades.</h2>
              <p>O Tendendo não é uma loja virtual e não realiza a venda direta dos produtos divulgados. Somos uma plataforma de conteúdo, descoberta de produtos e divulgação de ofertas. Reunimos oportunidades de marketplaces e organizamos conteúdos por interesse.</p>
            </div>
            <aside className="disclosure" aria-label="Transparência">
              <span className="icon-tile"><Icon name="info" /></span>
              <h3>Transparência</h3>
              <p>{affiliate}</p>
              <p>{pricing}</p>
            </aside>
          </div>
        </section>
        <section className="wrap section" aria-labelledby="final-title">
          <div className="final-cta">
            <h2 id="final-title">As próximas oportunidades podem estar a um clique de distância.</h2>
            <p>Faça parte da comunidade Tendendo e acompanhe as tendências e ofertas dos assuntos que você mais gosta.</p>
            <a className="button whatsapp" href="#grupos" data-analytics="final_cta_click" data-dock-hide><Icon name="whatsapp" />Escolher meu grupo no WhatsApp</a>
            <p className="signoff">Tendendo — Descubra. Acompanhe. Aproveite.</p>
          </div>
        </section>
        <LandingInteractions hasGroups={enabledGroups.length > 0} />
      </main>
    </>
  );
}
