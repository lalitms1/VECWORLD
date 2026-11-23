import { defineField, defineType } from 'sanity';

export const publicGlimpse = defineType({
  name: 'publicGlimpse',
  title: 'Public visual glimpse',
  type: 'document',
  fields: [
    defineField({ name: 'label', title: 'Short label', type: 'string', validation: (rule) => rule.required().max(40) }),
    defineField({ name: 'caption', title: 'Caption', type: 'string', validation: (rule) => rule.required().max(100) }),
    defineField({ name: 'altText', title: 'Accessible image description', type: 'string', validation: (rule) => rule.required().max(160) }),
    defineField({ name: 'image', title: 'Approved public image', type: 'image', options: { hotspot: true }, validation: (rule) => rule.required() }),
    defineField({ name: 'sortOrder', title: 'Display order', type: 'number', initialValue: 10 }),
    defineField({ name: 'isVisible', title: 'Show on public website', type: 'boolean', initialValue: false, description: 'Keep off until the image and caption have been approved for public release.' }),
  ],
  orderings: [{ title: 'Display order', name: 'displayOrder', by: [{ field: 'sortOrder', direction: 'asc' }] }],
  preview: { select: { title: 'label', subtitle: 'caption', media: 'image' } },
});
