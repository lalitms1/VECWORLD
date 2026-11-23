# VEC Public Website Content

This folder documents the public content model. The live content is edited through the authenticated Sanity Studio at `/content-studio` after Sanity is connected.

## Public content types
- `siteSettings`: selected public website copy, contact information and default SEO text.
- `learningArea`: short, public-facing learning-area labels and teasers.
- `audiencePathway`: visitor pathways shown on the public website.
- `publicGlimpse`: a deliberately curated set of approved public images and captions.
- `publicExperience`: approved public previews, trailers or learning-experience showcases.
- `studioUpdate`: fact-checked and approved studio updates.
- `physicalKit`: approved public information about physical activity kits, games and interactive kits, including the current public availability stage.

## Deliberate exclusions
There are no public CMS schemas for the full character bible, episode roadmap, complete universe structure, unreleased storylines, internal production processes, or private IP documents. Do not upload supplier quotes, cost sheets, manufacturing drawings or unreleased product specifications. Only assets and wording explicitly approved for public release belong in this CMS.

## Publishing rule
A content record must be published in Sanity and have its `Show on public website` flag enabled. Studio updates also require `Fact checked and approved`. Draft/unpublished records are not returned by the public API.

Large video masters should remain in dedicated media storage/CDN; the CMS stores the public playback URL and thumbnail.
