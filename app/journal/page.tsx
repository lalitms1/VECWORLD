import type { Metadata } from 'next';
import SiteExperience from '../../components/SiteExperience';

export const metadata: Metadata = {
  title: 'The VEC Journal — Ideas for Curious Minds',
  description: 'Original, practical perspectives from VEC on learning through experience, curiosity, storytelling, observation and discovery.',
  alternates: { canonical: '/journal' },
  openGraph: { type: 'website', title: 'The VEC Journal | VEC Studios', description: 'Ideas for curious minds, from the VEC team.', images: ['/assets/vec-social-share.webp'] },
};

export default function JournalPage() { return <SiteExperience initialView="journal" />; }
