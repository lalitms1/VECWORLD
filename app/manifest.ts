import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VEC Studios — Visualise Every Concept',
    short_name: 'VEC Studios',
    description: 'Cinematic learning through stories, experience and discovery.',
    start_url: '/',
    display: 'standalone',
    background_color: '#07100b',
    theme_color: '#07100b',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png', purpose: 'any' },
    ],
  };
}
