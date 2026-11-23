import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Website settings',
  type: 'document',
  fields: [
    defineField({ name: 'homeEyebrow', title: 'Home eyebrow', type: 'string', initialValue: 'VEC STUDIOS · VISUALISE EVERY CONCEPT' }),
    defineField({ name: 'homeLine1', title: 'Home headline — first line', type: 'string', initialValue: 'Let curiosity' }),
    defineField({ name: 'homeEmphasis', title: 'Home headline — emphasis', type: 'string', initialValue: 'lead.' }),
    defineField({ name: 'homeDescription', title: 'Home description', type: 'text', rows: 3, initialValue: 'A cinematic learning studio creating stories, experiences and worlds where understanding is something you discover.' }),
    defineField({ name: 'aboutHeadline', title: 'About headline', type: 'string', initialValue: 'Every child is born' }),
    defineField({ name: 'aboutEmphasis', title: 'About headline — emphasis', type: 'string', initialValue: 'curious.' }),
    defineField({ name: 'aboutDescription', title: 'About description', type: 'text', rows: 4, initialValue: 'Our responsibility is not to fill minds with facts, but to create experiences that awaken the knowledge already waiting to be discovered.' }),
    defineField({ name: 'approachHeadline', title: 'How VEC headline', type: 'string', initialValue: 'Knowledge is not the destination.' }),
    defineField({ name: 'approachEmphasis', title: 'How VEC headline — emphasis', type: 'string', initialValue: 'It is the reward for curiosity.' }),
    defineField({ name: 'approachDescription', title: 'How VEC description', type: 'text', rows: 3, initialValue: 'Our stories create a need to know before they reveal what is known.' }),
    defineField({ name: 'studioHeadline', title: 'Studio headline', type: 'string', initialValue: 'Building something' }),
    defineField({ name: 'studioEmphasis', title: 'Studio headline — emphasis', type: 'string', initialValue: 'worth discovering.' }),
    defineField({ name: 'studioDescription', title: 'Studio description', type: 'text', rows: 3, initialValue: 'The website shows only a window into a much larger body of work. We reveal the value; the deeper universe stays deeper.' }),
    defineField({ name: 'contactEmail', title: 'Public contact email', type: 'string', initialValue: 'vec.curiomaya@gmail.com' }),
    defineField({ name: 'contactPhone', title: 'Public contact phone', type: 'string', initialValue: '+91 7846867395' }),
    defineField({ name: 'seoTitle', title: 'Default search title', type: 'string', initialValue: 'VEC Studios — Visualise Every Concept' }),
    defineField({ name: 'seoDescription', title: 'Default search description', type: 'text', rows: 3, initialValue: 'VEC Studios is a cinematic learning studio creating stories, experiences and worlds where understanding is something learners discover.' }),
    defineField({ name: 'socialShareImage', title: 'Social sharing image', type: 'image', options: { hotspot: true }, description: 'A public image used when the website is shared on social platforms.' }),
  ],
  preview: { prepare: () => ({ title: 'VEC website settings', subtitle: 'Public website copy, contact and SEO defaults' }) },
});
