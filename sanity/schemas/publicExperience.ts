import { defineField, defineType } from 'sanity';

export const publicExperience = defineType({
  name: 'publicExperience',
  title: 'Public experience / media',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required().max(90) }),
    defineField({ name: 'slug', title: 'URL slug', type: 'slug', options: { source: 'title', maxLength: 80 }, validation: (rule) => rule.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['Film', 'Learning experience', 'Studio work', 'Announcement'] }, validation: (rule) => rule.required() }),
    defineField({ name: 'summary', title: 'Short public summary', type: 'text', rows: 3, validation: (rule) => rule.required().max(260) }),
    defineField({ name: 'thumbnail', title: 'Thumbnail image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'videoFile', title: 'Upload a web-ready video clip', type: 'file', options: { accept: 'video/mp4,video/webm' }, description: 'For short, optimized public clips. Keep 4K masters and large episode files in dedicated media/CDN storage.' }),
    defineField({ name: 'videoUrl', title: 'Or use a video/CDN URL', type: 'url', description: 'Recommended for large videos: store the master in dedicated media/CDN storage and paste its public playback URL here.' }),
    defineField({ name: 'externalUrl', title: 'Optional destination URL', type: 'url' }),
    defineField({ name: 'publishedOn', title: 'Publication date', type: 'date' }),
    defineField({ name: 'isFeatured', title: 'Feature on Studio page', type: 'boolean', initialValue: false }),
    defineField({ name: 'isVisible', title: 'Publish on public website', type: 'boolean', initialValue: false, description: 'A published document appears on the website only when this is enabled.' }),
  ],
  orderings: [{ title: 'Newest first', name: 'newest', by: [{ field: 'publishedOn', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'category', media: 'thumbnail' } },
});
