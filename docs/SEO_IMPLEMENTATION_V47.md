# VEC SEO Foundation — V48

## Implemented in code
- Unique title and description metadata for each public route.
- Canonical URLs are emitted only when an approved HTTPS production URL is configured.
- Production indexation requires BOTH `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_SITE_INDEXABLE=true`.
- Netlify preview hosts, localhost and non-HTTPS URLs cannot be switched to indexable by accident.
- `robots.ts` disallows crawling until production indexation is explicitly enabled.
- `sitemap.ts` lists the real public routes, including `/how-we-learn` (not the old `/how` path).
- `/how` redirects permanently to `/how-we-learn`.
- Organization and WebSite JSON-LD are emitted only for an approved production domain.
- Open Graph / X share artwork, favicon, app icon and web manifest added.
- Public routes have a single primary H1 heading.
- About page includes a clear, factual summary of VEC's public offering.
- Content Studio route remains `noindex`; API endpoints are excluded from robots.

## Before enabling Google indexing
1. Purchase and connect the final custom domain to Netlify.
2. Set Netlify production environment variable `NEXT_PUBLIC_SITE_URL=https://YOUR-DOMAIN` (choose either www or apex as the canonical host and keep it consistent).
3. Set `NEXT_PUBLIC_SITE_INDEXABLE=true` ONLY for the production deploy context. Set it to `false` or leave unset for Deploy Previews and branch deploys.
4. Add `GOOGLE_SITE_VERIFICATION` after creating the Domain property in Google Search Console.
5. Deploy production and confirm `/robots.txt` allows public pages and points to `/sitemap.xml`.
6. Confirm `/sitemap.xml` contains the canonical domain and all listed URLs return HTTP 200.
7. Submit the sitemap in Search Console and inspect the homepage and core pages.
8. Check the response headers: Netlify Deploy Previews should retain `X-Robots-Tag: noindex`.

## Content/quality work still needed
- Approve final page copy and public service descriptions (do not claim products or curriculum coverage that are not live).
- Verify official social profile URLs before adding them to Organization `sameAs`.
- Add a final branded social-share image only if the current VEC share artwork is approved.
- Test mobile Core Web Vitals and optimize largest image assets based on real reports.
- Configure and test enquiry delivery before public promotion.
- Add a real privacy notice and terms suitable for the exact data and analytics used.

## Notes
SEO does not guarantee indexing or rankings. Search engines decide whether and when to crawl and index the site. Prioritize useful, accurate public information and clear navigation over keyword repetition.
