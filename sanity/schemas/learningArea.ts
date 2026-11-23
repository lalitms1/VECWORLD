import { defineField, defineType } from 'sanity';

export const learningArea = defineType({
  name: 'learningArea',
  title: 'Learning area',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Public title', type: 'string', validation: (rule) => rule.required().max(60) }),
    defineField({ name: 'symbol', title: 'Symbol', type: 'string', description: 'A short symbol or glyph for the discovery map.', validation: (rule) => rule.max(8) }),
    defineField({ name: 'teaser', title: 'Short teaser', type: 'string', validation: (rule) => rule.required().max(90) }),
    defineField({ name: 'sortOrder', title: 'Display order', type: 'number', initialValue: 10 }),
    defineField({ name: 'isVisible', title: 'Show on public website', type: 'boolean', initialValue: true }),
  ],
  orderings: [{ title: 'Display order', name: 'displayOrder', by: [{ field: 'sortOrder', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'teaser' } },
});
