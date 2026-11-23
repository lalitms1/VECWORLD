'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'vec-website-content',
  title: 'VEC Studios — Public Website Content',
  basePath: '/content-studio',
  // Replace this fallback by setting NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local and Netlify.
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vecsetup',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool({
    structure: (S) => S.list().title('VEC public website').items([
      S.listItem().title('Website settings').id('siteSettings').child(
        S.document().schemaType('siteSettings').documentId('siteSettings'),
      ),
      S.divider(),
      S.documentTypeListItem('learningArea').title('Learning areas'),
      S.documentTypeListItem('audiencePathway').title('Visitor pathways'),
      S.documentTypeListItem('publicGlimpse').title('Approved visual glimpses'),
      S.documentTypeListItem('publicExperience').title('Public experiences and media'),
      S.documentTypeListItem('studioUpdate').title('Verified studio updates'),
      S.documentTypeListItem('physicalKit').title('Physical learning kits'),
      S.documentTypeListItem('journalArticle').title('Journal articles'),
    ]),
  })],
  schema: { types: schemaTypes },
});
