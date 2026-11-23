import type { Metadata, Viewport } from 'next';
import StudioClient from '../StudioClient';
import { metadata as studioMetadata, viewport as studioViewport } from 'next-sanity/studio';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  ...studioMetadata,
  title: 'VEC Content Studio',
  robots: { index: false, follow: false, noarchive: true },
};
export const viewport: Viewport = studioViewport;

export default function ContentStudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 32, background: '#07100b', color: '#f6f0df', fontFamily: 'system-ui' }}>
        <section style={{ maxWidth: 680, padding: 32, border: '1px solid rgba(240,210,130,.24)', borderRadius: 24, background: 'rgba(255,255,255,.03)' }}>
          <p style={{ color: '#e9c977', letterSpacing: '.18em', textTransform: 'uppercase', fontSize: 12 }}>VEC Studios</p>
          <h1>Content Studio is not connected yet.</h1>
          <p>Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in your local environment and Netlify site settings, then redeploy.</p>
        </section>
      </main>
    );
  }
  return <StudioClient />;
}
