import { defineField, defineType } from 'sanity';

export const audiencePathway = defineType({
  name: 'audiencePathway',
  title: 'Public pathway',
  type: 'document',
  fields: [
    defineField({ name: 'key', title: 'Pathway key', type: 'string', options: { list: ['wonder', 'home', 'learn', 'institution', 'build'] }, validation: (rule) => rule.required() }),
    defineField({ name: 'symbol', title: 'Symbol', type: 'string', validation: (rule) => rule.max(8) }),
    defineField({ name: 'title', title: 'Public title', type: 'string', validation: (rule) => rule.required().max(50) }),
    defineField({ name: 'microcopy', title: 'Supporting line', type: 'string', validation: (rule) => rule.max(100) }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (rule) => rule.max(240) }),
    defineField({ name: 'sortOrder', title: 'Display order', type: 'number', initialValue: 10 }),
    defineField({ name: 'isVisible', title: 'Show on public website', type: 'boolean', initialValue: true }),
  ],
  orderings: [{ title: 'Display order', name: 'displayOrder', by: [{ field: 'sortOrder', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'microcopy' } },
});
