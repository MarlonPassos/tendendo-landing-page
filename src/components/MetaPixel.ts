import type { AnalyticsEvent } from '../data/analytics';

type Pixel = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  push?: Pixel;
  queue: unknown[][];
  loaded: boolean;
  version: string;
};

const browser = () => window as Window & { fbq?: Pixel; _fbq?: Pixel };

export const metaPixelId = /^\d+$/.test(process.env.NEXT_PUBLIC_META_PIXEL_ID || '')
  ? process.env.NEXT_PUBLIC_META_PIXEL_ID
  : undefined;

export function grantMetaConsent() {
  if (!metaPixelId) return;
  const host = browser();
  if (host.fbq) {
    host.fbq('consent', 'grant');
    return;
  }

  const pixel: Pixel = (...args) => {
    if (pixel.callMethod) pixel.callMethod(...args);
    else pixel.queue.push(args);
  };
  pixel.queue = [];
  pixel.push = pixel;
  pixel.loaded = true;
  pixel.version = '2.0';
  host.fbq = host._fbq = pixel;
  pixel('consent', 'grant');
  pixel('set', 'autoConfig', false, metaPixelId);
  pixel('init', metaPixelId);

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.append(script);
}

export function revokeMetaConsent() {
  browser().fbq?.('consent', 'revoke');
  for (const name of ['_fbp', '_fbc']) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=${location.hostname}`;
  }
}

export function trackMeta(event: AnalyticsEvent) {
  const { name, ...properties } = event;
  if (name === 'page_view') browser().fbq?.('trackSingle', metaPixelId, 'PageView', properties);
  else browser().fbq?.('trackSingleCustom', metaPixelId, name, properties);
  if (name === 'group_click') {
    // Evento padrão da Meta para otimizar anúncios pela conversão principal.
    browser().fbq?.('trackSingle', metaPixelId, 'Lead', { content_name: event.group_name, content_category: event.group_id });
  }
}
