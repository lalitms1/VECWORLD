# VEC Website — V49.2.3 Mobile & SEO Audit Notes

## Changes from V49.2.2
- At narrow mobile widths (max-width: 600px), the six-step learning-cycle cards now stack in one column for readable, uncluttered presentation.
- Tablet layout remains two columns; desktop rules are unchanged.
- Existing V49.2.2 mobile menu behaviour, hero spacing, and development-indicator setting are retained.

## SEO source audit
- Global title template, description, keywords, Open Graph, Twitter metadata, and icon metadata are configured.
- Section pages provide distinct titles/descriptions, canonicals on indexable production, and social metadata.
- Journal articles provide article metadata, canonicals, and Article JSON-LD.
- Organization and WebSite JSON-LD are emitted only when production indexing is enabled.
- robots.txt and sitemap.xml are intentionally disabled until NEXT_PUBLIC_SITE_INDEXABLE=true and a valid HTTPS NEXT_PUBLIC_SITE_URL are configured.
- Sitemap currently enumerates the known public routes and six launch journal articles; future published CMS articles need sitemap integration before relying on organic discovery for them.

## Launch configuration still required
1. Set NEXT_PUBLIC_SITE_URL to the final HTTPS domain.
2. Set NEXT_PUBLIC_SITE_INDEXABLE=true only after the domain is live and reviewed.
3. Add the Google Search Console verification token.
4. Replace social URL placeholders in the deployment environment.
5. Submit /sitemap.xml in Google Search Console after launch.

## Verification limits
- ZIP integrity was checked after packaging.
- A production build and live crawl/Core Web Vitals audit must still be run in the actual deployment environment; this source review does not claim those have passed.
