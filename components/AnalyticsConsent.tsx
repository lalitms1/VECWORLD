'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'vec-analytics-consent-v1';

export default function AnalyticsConsent() {
  const measurementId = process.env.NEXT_PUBLIC_GA4_ID;
  const [choice, setChoice] = useState<'accepted' | 'rejected' | 'unset'>('unset');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'accepted' || saved === 'rejected') setChoice(saved);
    } catch {
      setChoice('rejected');
    }
    setReady(true);
  }, []);

  function choose(next: 'accepted' | 'rejected') {
    try { window.localStorage.setItem(STORAGE_KEY, next); } catch { /* Storage may be unavailable. */ }
    setChoice(next);
  }

  if (!ready) return null;

  return (
    <>
      {measurementId && choice === 'accepted' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
          <Script id="vec-ga4" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} window.gtag = gtag; gtag('js', new Date()); gtag('config', '${measurementId}', { anonymize_ip: true });`}
          </Script>
        </>
      )}
      {measurementId && choice === 'unset' && (
        <aside className="vec-consent" aria-label="Analytics choice">
          <p>VEC uses optional, privacy-conscious analytics to understand how the website is used and improve it. Analytics are off unless you choose to allow them. VEC does not use this website for display advertising.</p>
          <div>
            <button type="button" onClick={() => choose('rejected')}>Reject optional analytics</button>
            <button type="button" onClick={() => choose('accepted')}>Allow analytics</button>
          </div>
          <a href="/privacy">Privacy details</a>
        </aside>
      )}
      {measurementId && choice !== 'unset' && (
        <button className="vec-consent-settings" type="button" onClick={() => choose('unset')}>Privacy choices</button>
      )}
    </>
  );
}
