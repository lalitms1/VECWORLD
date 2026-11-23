import { NextResponse } from 'next/server';
import { sanityClient } from '../../../config/sanity-client';

export const revalidate = 60;

export async function GET() {
  if (!sanityClient) {
    return NextResponse.json({ configured: false }, { headers: { 'Cache-Control': 'no-store' } });
  }

  try {
    const [settings, learningAreas, pathways, glimpses, experiences, updates, physicalKits, journalArticles] = await Promise.all([
      sanityClient.fetch(`*[_type == "siteSettings" && _id == "siteSettings"][0]{
        homeEyebrow, homeLine1, homeEmphasis, homeDescription,
        aboutHeadline, aboutEmphasis, aboutDescription,
        approachHeadline, approachEmphasis, approachDescription,
        studioHeadline, studioEmphasis, studioDescription,
        contactEmail, contactPhone, seoTitle, seoDescription
      }`),
      sanityClient.fetch(`*[_type == "learningArea" && isVisible == true] | order(sortOrder asc) { "id": _id, title, symbol, teaser }`),
      sanityClient.fetch(`*[_type == "audiencePathway" && isVisible == true] | order(sortOrder asc) { "id": _id, key, symbol, title, microcopy, description }`),
      sanityClient.fetch(`*[_type == "publicGlimpse" && isVisible == true && defined(image.asset->url)] | order(sortOrder asc) { "id": _id, label, caption, altText, "imageUrl": image.asset->url }`),
      sanityClient.fetch(`*[_type == "publicExperience" && isVisible == true && isFeatured == true] | order(publishedOn desc) { "id": _id, title, category, summary, "thumbnailUrl": thumbnail.asset->url, "videoFileUrl": videoFile.asset->url, videoUrl, externalUrl }`),
      sanityClient.fetch(`*[_type == "studioUpdate" && isVisible == true && isVerified == true] | order(publishedOn desc)[0...6] { "id": _id, title, summary, publishedOn, "coverUrl": coverImage.asset->url }`),
      sanityClient.fetch(`*[_type == "physicalKit" && isVisible == true && isFeatured == true] | order(sortOrder asc) { "id": _id, title, "slug": slug.current, category, summary, description, stage, price, enquiryLabel, "imageUrl": heroImage.asset->url }`),
      sanityClient.fetch(`*[_type == "journalArticle" && isVisible == true && editorialReview == true] | order(publishedOn desc) { "id": _id, title, "slug": slug.current, category, excerpt, authorName, publishedOn, readingMinutes, seoTitle, seoDescription, "coverUrl": coverImage.asset->url }`),
    ]);

    return NextResponse.json(
      { configured: true, settings, learningAreas, pathways, glimpses, experiences, updates, physicalKits, journalArticles },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } },
    );
  } catch (error) {
    console.error('[VEC PUBLIC CONTENT]', error);
    return NextResponse.json({ configured: true, contentAvailable: false }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
