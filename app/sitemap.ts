import type { MetadataRoute } from 'next';
import { articles } from '../content/journal/articles';
import { sanityClient } from '../config/sanity-client';

// Refresh the sitemap periodically so newly approved CMS journal articles are discoverable.
export const revalidate = 3600;

const routes = [
  '/',
  '/about',
  '/how-we-learn',
  '/explore',
  '/play',
  '/journal',
  '/for-you',
  '/studio',
  '/enquiry',
  '/contact',
  '/privacy',
  '/terms',
];

function getIndexableSiteUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '');
  if (!siteUrl || process.env.NEXT_PUBLIC_SITE_INDEXABLE !== 'true') return null;
  try {
    const parsed = new URL(siteUrl);
    if (parsed.protocol !== 'https:' || /(^|\.)((netlify\.app)|localhost|127\.0\.0\.1)$/i.test(parsed.hostname)) return null;
    return parsed.origin;
  } catch {
    return null;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getIndexableSiteUrl();
  if (!siteUrl) return [];

  const localArticleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteUrl}/journal/${article.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  let cmsArticleEntries: MetadataRoute.Sitemap = [];
  if (sanityClient) {
    try {
      const cmsArticles: Array<{ slug: string; publishedOn?: string; _updatedAt?: string }> = await sanityClient.fetch(
        `*[_type == "journalArticle" && isVisible == true && editorialReview == true && defined(slug.current)]{ "slug": slug.current, publishedOn, _updatedAt }`
      );
      const localSlugs = new Set(articles.map((article) => article.slug));
      cmsArticleEntries = (cmsArticles || [])
        .filter((article) => article.slug && !localSlugs.has(article.slug))
        .map((article) => ({
          url: `${siteUrl}/journal/${encodeURIComponent(article.slug)}`,
          ...(article._updatedAt || article.publishedOn
            ? { lastModified: new Date(article._updatedAt || article.publishedOn!) }
            : {}),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        }));
    } catch {
      // Keep the local sitemap available if the CMS is temporarily unreachable.
    }
  }

  const pageEntries: MetadataRoute.Sitemap = routes.map((route, index) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : index < 5 ? 0.8 : 0.6,
  }));

  return [...pageEntries, ...localArticleEntries, ...cmsArticleEntries];
}
