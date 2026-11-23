# Domain, Source Control and Search Launch Checklist

## Domain

Select one primary `.com` domain after checking live registration availability and trademark conflicts. Do not assume a candidate is available merely because it appears in this document. Register under a VEC-controlled account, enable MFA and auto-renew, and retain control of the DNS account.

## GitHub

Use the existing VEC website repository selected by the owner: `robost897/Visualize-Every-concept`. Confirm repository visibility before pushing. Keep secrets, `.env.local`, API tokens, unreleased VEC canon and heavy master media out of GitHub. Use a separate branch for each foundation update and merge only after the preview is approved.

## Netlify

The existing `vec-studios-preview` project was deployed manually through the CLI. Link the selected GitHub repository in Netlify at Project configuration → Developer settings → Continuous deployment → Repository. Once linked, Netlify can build and deploy pushes and create Deploy Previews for pull requests.

Build command: `npm run build`. Let Netlify detect the Next.js runtime; do not manually set the publish directory to `.next` unless Netlify explicitly instructs you to.

Keep preview deployments out of search indexes. Netlify Deploy Previews normally carry `X-Robots-Tag: noindex`; also keep the app-level production-indexing switch disabled on previews.

## Production environment variables — only after the final domain is connected

Set in the Netlify **Production** deploy context only:

- `NEXT_PUBLIC_SITE_URL=https://vecuniverse.com`
- `NEXT_PUBLIC_SITE_INDEXABLE=true`

For Deploy Preview and branch contexts:

- `NEXT_PUBLIC_SITE_INDEXABLE=false` (or leave unset)
- Do not point `NEXT_PUBLIC_SITE_URL` at the custom domain unless that preview should deliberately use it for canonical testing.

Choose a single canonical host (www or apex) and consistently redirect the other host to it. Preserve MX/TXT records if email or domain verification already uses them.

## Google Search Console

After the final domain resolves over HTTPS:
1. Add a **Domain property** in Google Search Console.
2. Verify ownership with the DNS TXT record Google provides.
3. Set `GOOGLE_SITE_VERIFICATION` if using the HTML-meta verification method; for a Domain property, DNS TXT verification is the preferred method.
4. Confirm the production environment variables above and redeploy.
5. Check `/robots.txt` and `/sitemap.xml` on the canonical domain.
6. Submit the sitemap in Search Console.
7. Inspect the homepage and core public routes, then request indexing where appropriate.

## SEO quality checks

- Unique, accurate page titles and descriptions.
- One descriptive H1 per public page and logical heading hierarchy.
- Crawlable navigation links and descriptive image alt text.
- Correct canonical URLs and sitemap paths.
- Open Graph / X share image and favicon.
- Organization and WebSite structured data only on the real production domain.
- No indexing of `/content-studio`, APIs, drafts or preview deployments.
- Useful, factual public content. Do not claim services, curriculum coverage, awards or partnerships that are not actually available or verified.

SEO does not guarantee indexing or rankings. Search engines decide whether and when to crawl and index the site. Prioritize useful, accurate information and clear navigation over keyword repetition.


## VEC domain decision (2026-11-22)
- Canonical host selected: `https://vecuniverse.com` (apex/root domain).
- Configure the production environment with `NEXT_PUBLIC_SITE_URL=https://vecuniverse.com`.
- Keep `NEXT_PUBLIC_SITE_INDEXABLE=false` until DNS points to the production host, HTTPS is valid, and both apex and `www` behavior are verified.
- After those checks and launch approval, set `NEXT_PUBLIC_SITE_INDEXABLE=true` and redeploy.
- Configure `www.vecuniverse.com` to redirect permanently to `https://vecuniverse.com` at the hosting/DNS layer. Do not create conflicting canonical hosts.
