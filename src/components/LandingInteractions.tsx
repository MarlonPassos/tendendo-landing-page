'use client';

import { useEffect, useRef, useState } from 'react';
import { emitAnalytics, eventAttribution, readCampaign, type AnalyticsEvent } from '../data/analytics';
import { grantMetaConsent, metaPixelId, revokeMetaConsent, trackMeta } from './MetaPixel';

const preferenceKey = 'tendendo:marketing-consent:v1';

function readPreference() {
  try { return localStorage.getItem(preferenceKey); }
  catch { return null; }
}

export function LandingInteractions({ hasGroups }: { hasGroups: boolean }) {
  const dock = useRef<HTMLDivElement>(null);
  const pageViewed = useRef(false);
  const metaPageViewed = useRef(false);
  const consent = useRef(false);
  const [preference, setPreference] = useState<string | null>(null);
  const [privacySignal, setPrivacySignal] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const attribution = eventAttribution(readCampaign(location.search));
    const category = query.get('grupo');
    const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-category]'));
    const selected = category && cards.find(card => card.dataset.category === category || card.dataset.group === category);
    if (selected) selected.dataset.campaignSelected = 'true';
    if (selected && !location.hash) {
      selected.focus({ preventScroll: true });
      selected.scrollIntoView({ behavior: 'instant', block: 'start' });
    }

    const currentDock = dock.current;
    const blockers = Array.from(document.querySelectorAll('[data-dock-hide]'));
    const visible = new Set<Element>();
    const observer = currentDock && new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      currentDock.hidden = visible.size > 0;
    });
    if (observer) blockers.forEach(element => observer.observe(element));

    function publish(event: AnalyticsEvent) {
      const enriched = { ...event, ...attribution };
      emitAnalytics(enriched);
      if (consent.current && event.name !== 'page_view') trackMeta(enriched);
    }

    const navigatorPrivacy = navigator as Navigator & { globalPrivacyControl?: boolean };
    const optedOut = navigatorPrivacy.globalPrivacyControl === true || navigator.doNotTrack === '1';

    function applyPreference(value: string | null) {
      setPreference(value);
      const allowed = !!metaPixelId && !optedOut && value === 'granted';
      if (allowed === consent.current) return;
      consent.current = allowed;
      if (!allowed) {
        revokeMetaConsent();
      } else {
        grantMetaConsent();
        if (!metaPageViewed.current) {
          metaPageViewed.current = true;
          trackMeta({ name: 'page_view', ...attribution });
        }
      }
    }

    function handlePreference(event: Event) {
      const value = (event as CustomEvent<string>).detail;
      applyPreference(value);
    }

    function handleStorage(event: StorageEvent) {
      if (event.key === preferenceKey || event.key === null) applyPreference(readPreference());
    }

    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || !(event.target instanceof Element)) return;
      if (event.type === 'auxclick' && event.button !== 1) return;
      const link = event.target.closest<HTMLAnchorElement>('a');
      const id = link?.dataset.groupId;
      const name = link?.dataset.groupName;
      const action = link?.dataset.analytics;
      if (id && name) publish({ name: 'group_click', group_id: id, group_name: name });
      if (action === 'hero_cta_click' || action === 'final_cta_click') publish({ name: action });
    }

    const loadPreference = metaPixelId ? window.setTimeout(() => {
      setPrivacySignal(optedOut);
      applyPreference(readPreference());
    }, 0) : undefined;
    if (!pageViewed.current) {
      pageViewed.current = true;
      publish({ name: 'page_view' });
    }

    document.addEventListener('click', handleClick);
    document.addEventListener('auxclick', handleClick);
    window.addEventListener('storage', handleStorage);
    window.addEventListener(preferenceKey, handlePreference);
    return () => {
      observer?.disconnect();
      window.clearTimeout(loadPreference);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('auxclick', handleClick);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(preferenceKey, handlePreference);
    };
  }, []);

  function choose(value: 'granted' | 'denied') {
    try { localStorage.setItem(preferenceKey, value); }
    catch { /* The preference still applies to this page. */ }
    window.dispatchEvent(new CustomEvent(preferenceKey, { detail: value }));
  }

  return (
    <>
      {metaPixelId && (
        <section className="wrap tracking-preferences" id="preferencias-de-privacidade" data-dock-hide aria-labelledby="tracking-title">
          <h2 id="tracking-title">Preferências de privacidade</h2>
          <p>A medição de campanhas com a Meta é opcional. Você pode alterar sua escolha aqui a qualquer momento.</p>
          {privacySignal ? <p>Seu navegador indica que você prefere desativar o rastreamento.</p> : (
            <>
              <div className="actions">
                <button className="button secondary" type="button" onClick={() => choose('denied')}>Recusar medição</button>
                <button className="button secondary" type="button" onClick={() => choose('granted')}>Permitir medição</button>
              </div>
              <p role="status">{preference === 'granted' ? 'Medição permitida.' : preference === 'denied' ? 'Medição recusada.' : 'Medição desativada.'}</p>
            </>
          )}
        </section>
      )}
      {hasGroups && (
        <div className="mobile-dock" ref={dock} hidden>
          <a className="button primary" href="#grupos" onClick={() => document.getElementById('grupos')?.focus({ preventScroll: true })}>Ver grupos grátis</a>
        </div>
      )}
    </>
  );
}
