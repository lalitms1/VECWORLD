import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '');
  const indexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === 'true';
  let validProductionUrl = false;

  if (siteUrl && indexable && !/(\.netlify\.app|localhost|127\.0\.0\.1)/i.test(siteUrl)) {
    try { validProductionUrl = new URL(siteUrl).protocol === 'https:'; } catch { validProductionUrl = false; }
  }

  if (!validProductionUrl) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/content-studio', '/api/'] }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
