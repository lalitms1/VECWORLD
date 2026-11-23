# VEC Website V51 — Production Readiness Foundation

## Built on
V50 Contact System archive. Existing cinematic experience, assets, product imagery, navigation and contact configuration are retained.

## V51 additions
- Added public Privacy Policy and Terms of Use pages with page metadata. These are draft website policies and require professional review before launch.
- Added a sitewide legal footer linking to privacy, terms and contact.
- Added optional GA4 loading behind an explicit visitor choice. Analytics does not load unless `NEXT_PUBLIC_GA4_ID` is configured and the visitor opts in. Visitors can reject and revisit their choice.
- Added a clear no-display-advertising statement to the privacy notice, reflecting VEC's confirmed policy. No AdSense or display ad integration was added.
- Added privacy/terms routes to the sitemap.
- Kept production indexing disabled by default. Search Console verification remains a deployment setting.
- Added `NEXT_PUBLIC_GA4_ID` to `.env.example`; no measurement ID or credentials are included.

## Important limitations
- GA4 and Search Console are not live until the owner configures the GA4 Measurement ID and verifies the domain property in Search Console.
- Email delivery still requires server-side Resend credentials and a verified sender domain.
- The policies are starter drafts, not legal advice; they must be checked against the actual live data flows and reviewed professionally.
- This package has not been deployed to Netlify and the public domain has not been tested.
