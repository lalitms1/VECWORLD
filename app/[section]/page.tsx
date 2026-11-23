import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteExperience from '../../components/SiteExperience';

const previewHostPattern = /(\.netlify\.app|localhost|127\.0\.0\.1)/i;
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '');
const isIndexableProduction = (() => {
  if (process.env.NEXT_PUBLIC_SITE_INDEXABLE !== 'true' || !configuredSiteUrl || previewHostPattern.test(configuredSiteUrl)) return false;
  try { return new URL(configuredSiteUrl).protocol === 'https:'; } catch { return false; }
})();
const socialImage = '/assets/vec-social-share.webp';

const sections = {
  about: {
    view: 'about' as const,
    title: 'About',
    description: 'Meet VEC Studios, an India-based cinematic learning studio developing story-led educational videos and experiences shaped by curiosity and discovery.',
  },
  'how-we-learn': {
    view: 'approach' as const,
    title: 'The VEC Approach to Learning',
    description: 'Discover how VEC turns experience and curiosity into understanding through stories, exploration, discovery and real-world application.',
  },
  explore: {
    view: 'explore' as const,
    title: 'Explore Worlds of Discovery',
    description: 'Explore how VEC is developing story-led learning across mathematics, science, physics, chemistry, biology, history, geography, language and creativity.',
  },
  play: {
    view: 'play' as const,
    title: 'Play & Discover — VEC Physical Learning Kits',
    description: 'Discover VEC physical activity kits, playful learning games and interactive kits taking shape for hands-on exploration. Product details and availability will be shared as releases are ready.',
  },
  'for-you': {
    view: 'audiences' as const,
    title: 'Find Your Way into VEC',
    description: 'Discover ways to experience VEC at home, in learning environments and through creative and educational collaboration.',
  },
  studio: {
    view: 'studio' as const,
    title: 'Studio',
    description: 'Explore selected glimpses of original visual storytelling, learning experiences and verified updates from VEC Studios.',
  },
  enquiry: {
    view: 'enquiry' as const,
    title: 'Enquiry',
    description: 'Start a conversation with VEC Studios about story-led learning experiences, educational content and collaboration.',
  },
  contact: {
    view: 'contact' as const,
    title: 'Contact',
    description: 'Contact VEC Studios to ask a question, discuss an opportunity or begin a conversation about cinematic learning experiences.',
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  const item = sections[section as keyof typeof sections];
  if (!item) return { title: 'Page not found', robots: { index: false, follow: false } };

  const canonical = isIndexableProduction ? `/${section}` : undefined;
  return {
    title: item.title,
    description: item.description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      type: 'website',
      siteName: 'VEC Studios',
      title: `${item.title} | VEC Studios`,
      description: item.description,
      images: [{ url: socialImage, width: 1200, height: 630, alt: 'VEC Studios — Visualise Every Concept' }],
      ...(isIndexableProduction ? { url: `${configuredSiteUrl}/${section}` } : {}),
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${item.title} | VEC Studios`,
      description: item.description,
      images: [{ url: socialImage, alt: 'VEC Studios — Visualise Every Concept' }],
    },
    robots: isIndexableProduction
      ? { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } }
      : { index: false, follow: false },
  };
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const item = sections[section as keyof typeof sections];
  if (!item) notFound();
  return <SiteExperience initialView={item.view} />;
}
