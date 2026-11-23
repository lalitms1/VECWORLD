/**
 * VEC public contact and social configuration.
 * UPDATE SOCIAL LINKS HERE when official accounts are created.
 * Also update the matching NEXT_PUBLIC_* variables in Netlify's environment settings.
 * Instagram, Facebook and LinkedIn remain visible on the website while their URLs are blank.
 */
const cleanUrl = (value: string | undefined) => {
  const trimmed = value?.trim();
  return trimmed && /^https:\/\//i.test(trimmed) ? trimmed : '';
};

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://vecuniverse.com',
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'vec.curiomaya@gmail.com',
    whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917846867395').replace(/\D/g, ''),
    phoneDisplay: '+91 7846867395',
  },
  social: {
    instagram: cleanUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    facebook: cleanUrl(process.env.NEXT_PUBLIC_FACEBOOK_URL),
    youtube: cleanUrl(process.env.NEXT_PUBLIC_YOUTUBE_URL) || 'https://www.youtube.com/@VECUniverse',
    linkedin: cleanUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL),
  },
};

export const contactLinks = {
  email: `mailto:${site.contact.email}`,
  whatsapp: `https://wa.me/${site.contact.whatsappNumber}`,
  phone: `tel:+${site.contact.whatsappNumber}`,
};
