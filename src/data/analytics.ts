type Attribution = Partial<Record<'source' | 'medium' | 'campaign', string>>;

export type AnalyticsEvent = (
  | { name: 'page_view' | 'hero_cta_click' | 'final_cta_click' | 'dock_cta_click' | 'hero_radar_click' }
  | { name: 'group_click'; group_id: string; group_name: string }
) & Attribution;

const queryKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'] as const;
const sources = new Set(['facebook', 'instagram', 'meta', 'fb', 'ig']);
const media = new Set(['paid', 'paid_social', 'social', 'cpc', 'cpm']);
const campaigns = new Set((process.env.NEXT_PUBLIC_ALLOWED_CAMPAIGNS || '').split(',').map(value => value.trim()));

export function readCampaign(search: string) {
  const params = new URLSearchParams(search);
  return Object.fromEntries(queryKeys.map(key => [key, params.get(key)]));
}

export function eventAttribution(params: ReturnType<typeof readCampaign>): Attribution {
  const source = params.utm_source?.toLowerCase();
  const medium = params.utm_medium?.toLowerCase();
  const campaign = params.utm_campaign;
  return {
    ...(source && sources.has(source) ? { source } : {}),
    ...(medium && media.has(medium) ? { medium } : {}),
    ...(campaign && campaigns.has(campaign) ? { campaign } : {}),
  };
}

export function emitAnalytics(event: AnalyticsEvent) {
  const { name, ...properties } = event;
  window.dispatchEvent(new CustomEvent(name, { detail: properties }));
}
