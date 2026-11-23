# VEC Website — V49.2.5 Domain Configuration and SEO Sitemap Update

## Scope
- The public sitemap now includes the six local launch Journal articles and dynamically queries Sanity for additional Journal articles that are both visible and editorially approved.
- The sitemap refreshes on a one-hour revalidation interval, so newly approved CMS articles can be discovered without a code release.
- Sitemap generation remains disabled unless `NEXT_PUBLIC_SITE_INDEXABLE=true` and `NEXT_PUBLIC_SITE_URL` is a valid HTTPS production domain.
- Article canonical URLs, absolute Open Graph URLs, and Article JSON-LD are emitted only when a valid indexable production domain is configured. Preview deployments no longer publish structured data or canonical URLs pointing at the preview hostname.
- No visual design, product assets, or desktop/mobile layout styles were changed in this update.

## Required before launch
1. Set `NEXT_PUBLIC_SITE_URL=https://vecuniverse.com` in the production hosting environment.
2. Keep `NEXT_PUBLIC_SITE_INDEXABLE=false` until the domain is live and the site has been reviewed.
3. After launch approval, set `NEXT_PUBLIC_SITE_INDEXABLE=true`.
4. Add the Google Search Console verification token as `GOOGLE_SITE_VERIFICATION`.
5. Replace the social URL placeholders with VEC's real official profiles.
6. Submit `https://vecuniverse.com/sitemap.xml` in Google Search Console.

## Verification status
- Source-level checks and ZIP integrity are performed for this package.
- A fresh Next.js production build, live crawl, and Core Web Vitals measurement must still be run in the deployment environment; they are not claimed as passed here.


## Domain configuration update (V49.2.5)
- Selected canonical domain: `https://vecuniverse.com`.
- `.env.example` now carries this production URL as the starting value.
- Indexing remains disabled by default (`NEXT_PUBLIC_SITE_INDEXABLE=false`). Buying the domain does not itself connect DNS or hosting; confirm the host records and HTTPS certificate before enabling indexing.
- `www.vecuniverse.com` should permanently redirect to the apex domain.
- No live DNS, hosting, HTTPS, or Google Search Console verification is claimed by this source update.
