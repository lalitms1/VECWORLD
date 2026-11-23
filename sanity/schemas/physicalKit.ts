import { defineField, defineType } from 'sanity';

export const physicalKit = defineType({
  name: 'physicalKit',
  title: 'Physical play & discovery kit',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Public product name', type: 'string', validation: (rule) => rule.required().max(90) }),
    defineField({ name: 'slug', title: 'URL slug', type: 'slug', options: { source: 'title', maxLength: 80 }, validation: (rule) => rule.required() }),
    defineField({ name: 'category', title: 'Collection', type: 'string', options: { list: [
      { title: 'Activity kit', value: 'Activity kit' },
      { title: 'Learning game', value: 'Learning game' },
      { title: 'Interactive kit', value: 'Interactive kit' },
    ] }, validation: (rule) => rule.required() }),
    defineField({ name: 'summary', title: 'Short public description', type: 'text', rows: 3, validation: (rule) => rule.required().max(260) }),
    defineField({ name: 'description', title: 'Additional public details', type: 'text', rows: 6 }),
    defineField({ name: 'heroImage', title: 'Product image / approved mock-up', type: 'image', options: { hotspot: true }, description: 'Use only approved product photography or mock-ups. Keep internal manufacturing drawings private.' }),
    defineField({ name: 'stage', title: 'Public availability stage', type: 'string', options: { list: [
      { title: 'In development', value: 'development' },
      { title: 'Manufacturing', value: 'manufacturing' },
      { title: 'Coming soon', value: 'comingSoon' },
      { title: 'Available', value: 'available' },
    ] }, initialValue: 'manufacturing', validation: (rule) => rule.required() }),
    defineField({ name: 'price', title: 'Public price (only when available)', type: 'number', validation: (rule) => rule.min(0) }),
    defineField({ name: 'enquiryLabel', title: 'Enquiry link label', type: 'string', initialValue: 'Ask about this kit' }),
    defineField({ name: 'isFeatured', title: 'Feature prominently', type: 'boolean', initialValue: true }),
    defineField({ name: 'isVisible', title: 'Publish on public website', type: 'boolean', initialValue: false, description: 'Only approved public product details appear on the website.' }),
    defineField({ name: 'sortOrder', title: 'Display order', type: 'number', initialValue: 10 }),
  ],
  orderings: [{ title: 'Display order', name: 'sortOrder', by: [{ field: 'sortOrder', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'category', media: 'heroImage' } },
});
