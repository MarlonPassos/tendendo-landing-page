import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Footer } from '../components/Shell';
import { site } from '../data/site';
import '../styles/global.css';

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export const metadata: Metadata = {
  metadataBase: site.url,
  title: { default: site.title, template: '%s | Tendendo' },
  description: site.description,
  icons: { icon: '/assets/favicon.png' },
  openGraph: {
    type: 'website', locale: 'pt_BR', siteName: 'Tendendo', title: site.title,
    description: site.description,
    images: [{ url: '/assets/social.jpg', width: 1200, height: 630, alt: 'Tendendo.com' }],
  },
  twitter: {
    card: 'summary_large_image', title: site.title, description: site.description,
    images: ['/assets/social.jpg'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip" href="#conteudo">Ir para o conteúdo</a>
        {children}
        <Footer />
      </body>
    </html>
  );
}
