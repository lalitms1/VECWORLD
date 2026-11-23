# VEC Website — Future Content Workflow

## What should be uploaded where

Small website assets that are directly used by the site can live under `public/assets/` (optimized images, icons, small audio assets).

Content metadata that controls what appears on the public site should live under `content/` and be reviewed before publication.

Large videos, animation masters, long audio, and other heavy media should live in the future VEC media/CDN storage rather than inside GitHub.

## How a new item reaches the website

1. Add the approved public asset to the appropriate media/content location.
2. Update the relevant content record.
3. Run the local site and test it.
4. Commit the reviewed change to GitHub.
5. Netlify rebuilds the site from the repository.

The site is intentionally designed so the public website exposes only approved glimpses of the VEC universe and does not publish the private VEC canon.

## V49.2 — public Journal and approved learning kits

### Public Journal
- Public index: `/journal`; article pages: `/journal/{slug}`.
- Six original starter articles are bundled in `content/journal/articles.ts`.
- New articles can be drafted in the Sanity Content Studio under **Journal articles**.
- Required publishing sequence: write the complete article, add a clear excerpt and accurate byline, set publication date and reading time, complete editorial/fact review, then enable **Publish on public website**.
- Only documents with both `editorialReview == true` and `isVisible == true` are exposed by the public content API.
- Article pages include page-specific title/description, canonical path, Open Graph/Twitter metadata and Article JSON-LD.
- Do not publish unreleased character designs, scripts, episode titles, story arcs, production schedules, private assets or confidential development details.
- Use accurate bylines. Do not invent individual credentials or imply expert review that has not happened.

### Physical activity and game kits
- The Play page includes the approved product showcase images supplied for V49.2.
- Product image assets are converted to WebP and stored in `public/assets/products/`.
- Public status is deliberately set to **In development** until the team confirms availability. No price or launch date is implied.
- Sanity Physical learning kits can supplement the bundled product catalogue; keep only approved public images and copy visible.

### Dependency compatibility note
- The CMS integration requires `next-sanity` and `sanity`; V49.2 aligns `next-sanity` to 13.4.0 and React/React DOM to 19.2.3 to satisfy the peer range used by Sanity 6.24.0.
- The website source was updated without removing the existing CMS routes or schemas.
