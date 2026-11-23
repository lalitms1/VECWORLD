import { defineField, defineType } from 'sanity';

export const journalArticle = defineType({
  name: 'journalArticle',
  title: 'VEC Journal article',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Article title', type: 'string', validation: (rule) => rule.required().max(120) }),
    defineField({ name: 'slug', title: 'URL slug', type: 'slug', options: { source: 'title', maxLength: 90 }, validation: (rule) => rule.required() }),
    defineField({ name: 'category', title: 'Topic category', type: 'string', options: { list: ['Learning & Memory', 'Storytelling', 'Mathematics', 'Observation', 'Science', 'Active Learning', 'Parent & Educator Guides'].map((value) => ({ title: value, value })) }, validation: (rule) => rule.required() }),
    defineField({ name: 'excerpt', title: 'Short introduction / listing summary', type: 'text', rows: 3, validation: (rule) => rule.required().max(320) }),
    defineField({ name: 'coverImage', title: 'Optional editorial image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'authorName', title: 'Author / team byline', type: 'string', initialValue: 'VEC Learning Team', validation: (rule) => rule.required() }),
    defineField({ name: 'publishedOn', title: 'Publication date', type: 'date', validation: (rule) => rule.required() }),
    defineField({ name: 'readingMinutes', title: 'Estimated reading time (minutes)', type: 'number', initialValue: 6, validation: (rule) => rule.required().min(1).max(60) }),
    defineField({ name: 'seoTitle', title: 'SEO title (optional)', type: 'string', validation: (rule) => rule.max(65) }),
    defineField({ name: 'seoDescription', title: 'SEO description (optional)', type: 'text', rows: 2, validation: (rule) => rule.max(160) }),
    defineField({ name: 'body', title: 'Article body', type: 'array', of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }, { title: 'Heading 2', value: 'h2' }, { title: 'Heading 3', value: 'h3' }, { title: 'Quote', value: 'blockquote' }], lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Numbered', value: 'number' }], marks: { decorators: [{ title: 'Bold', value: 'strong' }, { title: 'Italic', value: 'em' }], annotations: [{ name: 'link', type: 'object', title: 'External link', fields: [{ name: 'href', type: 'url', title: 'URL', validation: (rule) => rule.uri({ scheme: ['http', 'https'] }) }] }] } }] }),
    defineField({ name: 'editorialReview', title: 'Editorially reviewed and fact-checked', type: 'boolean', initialValue: false, description: 'Required before public publication.' }),
    defineField({ name: 'isVisible', title: 'Publish on public website', type: 'boolean', initialValue: false, description: 'Only reviewed and approved articles are shown publicly.' }),
  ],
  preview: { select: { title: 'title', subtitle: 'category', media: 'coverImage' } },
});
