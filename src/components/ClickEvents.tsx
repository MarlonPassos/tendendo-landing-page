'use client';

import { useEffect } from 'react';

const allowedSources = new Set(['facebook', 'instagram', 'meta', 'fb', 'ig']);

export function ClickEvents() {
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const attribution = {
      utm_source: params.get('utm_source')?.toLowerCase(),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
      utm_content: params.get('utm_content'),
    };
    const allowedCampaigns = new Set((process.env.NEXT_PUBLIC_ALLOWED_CAMPAIGNS || '').split(','));

    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof Element) || event.defaultPrevented) return;
      const groupId = event.target.closest<HTMLAnchorElement>('a[data-group-id]')?.dataset.groupId;
      if (!groupId) return;

      const { utm_source: source, utm_campaign: campaign } = attribution;
      window.dispatchEvent(new CustomEvent('whatsapp_group_click', {
        detail: {
          group_id: groupId,
          timestamp: new Date().toISOString(),
          ...(source && allowedSources.has(source) ? { source } : {}),
          ...(campaign && allowedCampaigns.has(campaign) ? { campaign } : {}),
        },
      }));
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
