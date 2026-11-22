import type { MetadataRoute } from 'next';
import { legalLinks, site } from '../data/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', ...Object.keys(legalLinks).map(slug => `/${slug}/`)]
    .map(path => ({ url: new URL(path, site.url).href }));
}
