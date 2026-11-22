import { Mail } from 'lucide-react';
import type { ReactNode } from 'react';
import { legalLinks, site } from '../data/site';

function Logo() {
  /* The authorized raster is already sized and compressed for static serving. */
  /* eslint-disable-next-line @next/next/no-img-element */
  return <img className="logo" src="/assets/marca.webp" alt="Tendendo.com" width="700" height="225" />;
}

export function Header({ home = false }: { home?: boolean }) {
  const prefix = home ? '' : '/';
  return (
    <header className="header">
      <div className="wrap header-inner">
        <a href="/" className="brand"><Logo /></a>
        <nav aria-label="Navegação principal">
          <a href={`${prefix}#grupos`}>Grupos</a>
          <a href={`${prefix}#como-funciona`}>Como funciona</a>
          <a href={`${prefix}#sobre`}>Sobre</a>
        </nav>
        <a href={`${prefix}#grupos`} className="button header-cta" data-dock-hide>Explorar grupos</a>
      </div>
    </header>
  );
}

const exploreLinks = [
  ['/#grupos', 'Grupos de ofertas'],
  ['/#como-funciona', 'Como funciona'],
  ['/#sobre', 'Sobre o Tendendo'],
] as const;

function FooterNav({ title, links }: { title: string; links: ReadonlyArray<readonly [string, string]> }) {
  return (
    <nav aria-label={title}>
      <h2>{title}</h2>
      <ul>
        {links.map(([href, label]) => <li key={href}><a href={href}>{label}</a></li>)}
      </ul>
    </nav>
  );
}

function FacebookLink({ children, iconOnly }: { children: ReactNode; iconOnly?: boolean }) {
  return (
    <a href={site.facebook} target="_blank" rel="noopener noreferrer"
      className={iconOnly ? 'footer-social' : undefined}
      aria-label={iconOnly ? 'Tendendo no Facebook (abre em nova aba)' : undefined}>
      {children}
      {!iconOnly && <span className="sr-only"> (abre em nova aba)</span>}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="footer" id="rodape" data-dock-hide>
      <div className="wrap">
        <div className="footer-inner">
          <div className="footer-brand">
            <a href="/" className="brand"><Logo /></a>
            <p>Tendências, tecnologia, novidades e ofertas.</p>
            <a href={site.url.href}>{site.url.hostname}</a>
            <div className="footer-socials">
              <FacebookLink iconOnly>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M14 22v-9h3l.5-3H14V8c0-1 .3-2 2-2h2V3.3C17.5 3.1 16.5 3 15.4 3 12.6 3 11 4.7 11 7.7V10H8v3h3v9z" />
                </svg>
              </FacebookLink>
            </div>
          </div>
          <FooterNav title="Explore" links={exploreLinks} />
          <FooterNav title="Informações" links={Object.entries(legalLinks).map(([slug, label]) => [`/${slug}/`, label])} />
          <div className="footer-contact">
            <h2>Contato</h2>
            <ul>
              <li>
                <a href={`mailto:${site.email}`} className="footer-email">
                  <Mail size={17} aria-hidden="true" />{site.email}
                </a>
              </li>
              <li><FacebookLink>Tendendo no Facebook</FacebookLink></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Tendendo.com. Todos os direitos reservados.</p>
          <p>Podemos receber comissão por compras feitas por links de afiliados.</p>
        </div>
      </div>
    </footer>
  );
}
