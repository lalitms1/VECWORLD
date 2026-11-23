import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, getArticle } from '../../../content/journal/articles';
import { sanityClient } from '../../../config/sanity-client';

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '');
const previewHostPattern = /(\.netlify\.app|localhost|127\.0\.0\.1)/i;
const isIndexableProduction = (() => {
  if (process.env.NEXT_PUBLIC_SITE_INDEXABLE !== 'true' || !configuredSiteUrl || previewHostPattern.test(configuredSiteUrl)) return false;
  try { return new URL(configuredSiteUrl).protocol === 'https:'; } catch { return false; }
})();
const siteUrl = isIndexableProduction ? configuredSiteUrl! : null;
type CMSBlock = { _type?: string; style?: string; listItem?: string; children?: Array<{ text?: string; marks?: string[] }>; markDefs?: Array<{_key:string;_type:string;href?:string}> };
async function getCMSArticle(slug: string) {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch(`*[_type == "journalArticle" && slug.current == $slug && isVisible == true && editorialReview == true][0]{ title, "slug": slug.current, category, excerpt, authorName, publishedOn, readingMinutes, seoTitle, seoDescription, body }`, { slug });
  } catch { return null; }
}

export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const local = getArticle(slug);
  const cms = local ? null : await getCMSArticle(slug);
  const article = local || cms;
  if (!article) return { title: 'Article not found', robots: { index: false, follow: false } };
  const title = article.seoTitle || article.title;
  const description = article.metaDescription || article.seoDescription || article.excerpt;
  return {
    title, description,
    ...(isIndexableProduction ? { alternates: { canonical: `/journal/${slug}` } } : {}),
    openGraph: { type: 'article', title: `${title} | VEC Journal`, description, ...(siteUrl ? { url: `${siteUrl}/journal/${slug}` } : {}), siteName: 'VEC Studios', images: [{ url: '/assets/vec-social-share.webp', width: 1200, height: 630, alt: 'VEC Studios' }], locale: 'en_IN' },
    twitter: { card: 'summary_large_image', title, description, images: ['/assets/vec-social-share.webp'] },
  };
}

function CMSArticleBody({ blocks }: { blocks: CMSBlock[] }) {
  const output: ReactNode[] = []
  let list: React.ReactNode[] = [];
  let listType: string | undefined;
  const flush = () => { if (list.length) { output.push(listType === 'number' ? <ol key={`list-${output.length}`}>{list}</ol> : <ul key={`list-${output.length}`}>{list}</ul>); list = []; listType = undefined; } };
  blocks.forEach((block, index) => {
    const text = (block.children || []).map((child) => child.text || '').join('');
    if (block.listItem) {
      if (listType && listType !== block.listItem) flush();
      listType = block.listItem;
      list.push(<li key={index}>{text}</li>);
      return;
    }
    flush();
    if (block.style === 'h2') output.push(<h2 key={index}>{text}</h2>);
    else if (block.style === 'h3') output.push(<h3 key={index}>{text}</h3>);
    else if (block.style === 'blockquote') output.push(<blockquote key={index}>{text}</blockquote>);
    else if (text) output.push(<p key={index}>{text}</p>);
  });
  flush();
  return <>{output}</>;
}

export default async function JournalArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const local = getArticle(slug);
  const cms = local ? null : await getCMSArticle(slug);
  const article = local || cms;
  if (!article) notFound();
  const title = article.title;
  const category = article.category;
  const deck = article.deck || article.excerpt;
  const author = article.authorName || 'VEC Learning Team';
  const readingTime = article.readingTime || `${article.readingMinutes || 6} min read`;
  const jsonLd = siteUrl ? {
    '@context': 'https://schema.org', '@type': 'Article', headline: title,
    description: article.metaDescription || article.seoDescription || article.excerpt,
    author: { '@type': 'Organization', name: author, url: `${siteUrl}/about` },
    publisher: { '@type': 'Organization', name: 'VEC Studios', url: siteUrl, logo: { '@type': 'ImageObject', url: `${siteUrl}/assets/vec-logo-canonical-transparent.png` } },
    mainEntityOfPage: `${siteUrl}/journal/${slug}`, inLanguage: 'en-IN',
    ...(article.publishedOn ? { datePublished: article.publishedOn } : {}),
  } : null;
  return <main className="site-shell journal-article-shell">
    <header className="journal-topbar"><Link href="/" className="journal-brand">VEC <span>VISUALISE EVERY CONCEPT</span></Link><nav><Link href="/play">Play & Kits</Link><Link href="/journal">Journal</Link><Link href="/contact">Contact</Link></nav></header>
    <article className="journal-article">
      <div className="journal-article-top"><Link href="/journal">← The VEC Journal</Link><span>{category} · {readingTime}</span></div>
      <header className="journal-article-header"><small className="kicker">VEC JOURNAL · {category.toUpperCase()}</small><h1>{title}</h1><p className="journal-deck">{deck}</p><div className="journal-byline"><span className="byline-mark">V</span><div><strong>{author}</strong><small>VEC Studios · Editorial</small></div></div></header>
      <div className="journal-article-rule"><span>✦</span></div>
      <div className="journal-article-body">{local ? <><p className="journal-lead">{local.introduction}</p>{local.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}<aside className="journal-takeaway"><small>THE IDEA TO CARRY FORWARD</small><p>{local.takeaway}</p></aside></> : <CMSArticleBody blocks={cms?.body || []} />}</div>
      <footer className="journal-article-footer"><div><small>CONTINUE EXPLORING</small><h2>Keep the question <em>alive.</em></h2><p>Explore more original perspectives from the VEC team.</p></div><Link href="/journal">More from the Journal ↗</Link></footer>
    </article>
    <footer className="journal-site-footer"><Link href="/">VEC Studios</Link><span>Experience · Curiosity · Discovery</span><small>© 2026 VEC Studios</small></footer>
    {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />}
  </main>;
}
