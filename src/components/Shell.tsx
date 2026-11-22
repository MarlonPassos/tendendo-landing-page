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

export function Footer() {
  return (
    <footer className="footer" data-dock-hide>
      <div className="wrap footer-inner">
        <div>
          <a href="/" className="brand"><Logo /></a>
          <p>Tendências, tecnologia, novidades e ofertas.</p>
          <a href={site.url.href}>{site.url.hostname}</a>
          {site.facebook && <a href={site.facebook} className="facebook">Página Tendendo</a>}
        </div>
        <nav aria-label="Links institucionais">
          <a href="/#sobre">Sobre o Tendendo</a>
          {Object.entries(legalLinks).map(([slug, label]) => <a href={`/${slug}/`} key={slug}>{label}</a>)}
          <a href={`mailto:${site.email}`}>Contato</a>
        </nav>
        <div className="footer-contact">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <p>Descubra. Acompanhe. Aproveite.</p>
        </div>
      </div>
    </footer>
  );
}
