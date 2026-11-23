# VEC Production Website V49.2

## Added
- Dedicated Play & Kits showcase using the nine supplied VEC product images.
- Product galleries for the Independence Mission Box and My Body's Secret Language.
- Dedicated VEC Journal with six original starter articles.
- Individual article pages with page-specific metadata and Article structured data.
- Sanity Content Studio schema for new Journal articles.
- Editorial review and publication controls: an article is public only when both review and visibility are approved.
- Journal and article routes included in the sitemap.
- Responsive styling for product and journal pages.

## Preserved
- Existing V49 home, Explore, Question Door, Question Chamber, character/world assets, audio, contact/enquiry and CMS architecture.
- Existing VEC logo assets; no logo recreation or replacement.

## Publishing new Journal articles
1. Configure the existing Sanity project as described in `docs/CMS_SETUP.md`.
2. Open `/content-studio` and choose **Journal articles**.
3. Add the article, excerpt, author/byline, date, reading time and body.
4. Complete editorial/fact review.
5. Enable **Editorially reviewed and fact-checked** and **Publish on public website**.

The six bundled articles remain available without a configured CMS. Future CMS articles appear after publication and the public-content cache refreshes.

## Dependency note
The V49 Sanity integration had incompatible peer ranges. V49.2 aligns React and React DOM to 19.2.3 and `next-sanity` to 13.4.0 for the existing Sanity 6.24.0 integration. Run `npm install` before local testing.

## Validation
- ZIP integrity: verified after creation.
- TypeScript/TSX syntax transpilation: no syntax diagnostics.
- A full Next.js production build was not run in this environment because dependency installation did not complete. Please treat the production build as pending local verification.
