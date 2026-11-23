import { contactLinks, site } from './site';

const mediaBase = (process.env.NEXT_PUBLIC_MEDIA_BASE_URL || '').replace(/\/$/, '');

export const media = {
  discoveryReel: mediaBase
    ? `${mediaBase}/video/vec-story-reel.mp4`
    : '/assets/video-placeholder.mp4',
};

export const social = {
  ...contactLinks,
  instagram: site.social.instagram,
  facebook: site.social.facebook,
  youtube: site.social.youtube,
  linkedin: site.social.linkedin,
};
