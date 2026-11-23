import './globals.css';
import type { Metadata } from 'next';
import { sanityClient } from '../config/sanity-client';
import { site } from '../config/site';
import AnalyticsConsent from '../components/AnalyticsConsent';

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '');
const previewHostPattern = /(\.netlify\.app|localhost|127\.0\.0\.1)/i;
const isHttpsSiteUrl = (() => {
  if (!configuredSiteUrl) return false;
  try { return new URL(configuredSiteUrl).protocol === 'https:'; } catch { return false; }
})();
const isIndexableProduction =
  process.env.NEXT_PUBLIC_SITE_INDEXABLE === 'true' &&
  isHttpsSiteUrl &&
  !previewHostPattern.test(configuredSiteUrl || '');
const metadataBase = new URL(isHttpsSiteUrl ? configuredSiteUrl! : 'https://vec-studios-preview.netlify.app');
const socialImage = '/assets/vec-social-share.webp';
const defaultTitle = 'VEC Studios | Cinematic Learning & Educational Stories';
const defaultDescription = 'VEC Studios is an India-based cinematic learning studio developing story-led educational videos and interactive experiences across the learning spectrum.';

const baseMetadata: Metadata = {
  metadataBase,
  title: {
    default: defaultTitle,
    template: '%s | VEC Studios',
  },
  description: defaultDescription,
  applicationName: 'VEC Studios',
  creator: 'VEC Studios',
  publisher: 'Visualise Every Concept Private Limited',
  category: 'Education',
  referrer: 'strict-origin-when-cross-origin',
  keywords: [
    'VEC Studios',
    'Visualise Every Concept',
    'cinematic learning studio',
    'story-led learning',
    'educational storytelling',
    'educational animation',
    'experiential learning',
    'learning through stories',
    'interactive learning experiences',
    'mathematics and science learning',
    'history and geography learning',
  ],
  alternates: isIndexableProduction ? { canonical: '/' } : undefined,
  openGraph: {
    type: 'website',
    siteName: 'VEC Studios',
    title: defaultTitle,
    description: defaultDescription,
    images: [{ url: socialImage, width: 1200, height: 630, alt: 'VEC Studios — Visualise Every Concept' }],
    ...(isIndexableProduction ? { url: configuredSiteUrl } : {}),
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: [{ url: socialImage, alt: 'VEC Studios — Visualise Every Concept' }],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  robots: isIndexableProduction
    ? { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } }
    : { index: false, follow: false, googleBot: { index: false, follow: false, noimageindex: true } },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export async function generateMetadata(): Promise<Metadata> {
  if (!sanityClient) return baseMetadata;
  try {
    const settings = await sanityClient.fetch(`*[_type == "siteSettings" && _id == "siteSettings"][0]{ seoTitle, seoDescription, "shareImageUrl": socialShareImage.asset->url }`);
    if (!settings) return baseMetadata;
    const title = settings.seoTitle || defaultTitle;
    const description = settings.seoDescription || defaultDescription;
    const image = settings.shareImageUrl || socialImage;
    return {
      ...baseMetadata,
      title: { default: title, template: '%s | VEC Studios' },
      description,
      openGraph: {
        ...(baseMetadata.openGraph as object),
        title,
        description,
        images: [{ url: image, width: 1200, height: 630, alt: 'VEC Studios — Visualise Every Concept' }],
      },
      twitter: { ...(baseMetadata.twitter as object), title, description, images: [{ url: image, alt: 'VEC Studios — Visualise Every Concept' }] },
    };
  } catch {
    return baseMetadata;
  }
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationId = isIndexableProduction ? `${configuredSiteUrl}/#organization` : undefined;
  const websiteJsonLd = isIndexableProduction ? [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': organizationId,
      name: 'VEC Studios',
      legalName: 'Visualise Every Concept Private Limited',
      alternateName: 'Visualise Every Concept',
      url: configuredSiteUrl,
      logo: `${configuredSiteUrl}/assets/vec-logo-canonical-transparent.png`,
      image: `${configuredSiteUrl}${socialImage}`,
      description: 'A cinematic learning studio creating story-led educational videos and experiences that help learners discover knowledge through curiosity, exploration and application.',
      email: site.contact.email,
      telephone: '+91-7846867395',
      sameAs: [
        site.social.instagram,
        site.social.facebook,
        site.social.youtube,
      ].filter((value): value is string => Boolean(value && /^https:\/\//.test(value))),
      contactPoint: [{
        '@type': 'ContactPoint',
        contactType: 'business enquiries',
        email: site.contact.email,
        telephone: '+91-7846867395',
        availableLanguage: ['English'],
      }],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${configuredSiteUrl}/#website`,
      name: 'VEC Studios',
      alternateName: 'Visualise Every Concept',
      url: configuredSiteUrl,
      publisher: { '@id': organizationId },
      inLanguage: 'en-IN',
    },
  ] : null;

  return (
    <html lang="en-IN">
      <body>
        {/* Netlify Forms build-time detection form. The visible client form submits the same field names. */}
        <form name="vec-enquiries" data-netlify="true" netlify-honeypot="bot-field" hidden>
          <input type="hidden" name="form-name" value="vec-enquiries" />
          <input name="name" /><input name="email" /><input name="phone" />
          <input name="audience" /><input name="subject" /><textarea name="message" />
          <input name="bot-field" />
        </form>
        {children}
        <footer className="legal-footer"><span>© {new Date().getFullYear()} VEC Studios · Visualise Every Concept</span><nav aria-label="Legal information"><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Use</a><a href={`mailto:${site.contact.email}`}>Contact</a></nav></footer>
        <AnalyticsConsent />
        {websiteJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, '\\u003c') }} />}
      </body>
    </html>
  );
}
