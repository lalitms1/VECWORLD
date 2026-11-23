import { defineField, defineType } from 'sanity';

export const studioUpdate = defineType({
  name: 'studioUpdate',
  title: 'Verified studio update',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required().max(90) }),
    defineField({ name: 'summary', title: 'Public summary', type: 'text', rows: 3, validation: (rule) => rule.required().max(260) }),
    defineField({ name: 'publishedOn', title: 'Date', type: 'date', validation: (rule) => rule.required() }),
    defineField({ name: 'coverImage', title: 'Optional cover image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'isVerified', title: 'Fact checked and approved', type: 'boolean', initialValue: false, description: 'Only verified updates can appear publicly.' }),
    defineField({ name: 'isVisible', title: 'Show on public website', type: 'boolean', initialValue: false }),
  ],
  orderings: [{ title: 'Newest first', name: 'newest', by: [{ field: 'publishedOn', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'publishedOn', media: 'coverImage' } },
});
