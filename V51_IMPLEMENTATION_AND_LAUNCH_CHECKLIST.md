# VEC V51 — Implementation and launch checklist

## Confirmed website policy
- No display advertising, AdSense, banner ads or intrusive advertising pop-ups.
- GA4 and Google Search Console are the selected measurement tools.
- GA4 is optional and remains disabled until `NEXT_PUBLIC_GA4_ID` is supplied and the visitor opts in through the website privacy control.
- No behavioural advertising profiles of children.
- Monetisation is intended to come from VEC products, learning experiences, institutional partnerships/licensing and carefully disclosed sponsorships that preserve editorial independence.

## Before production deployment
1. Keep a backup of the current working website and use this V51 archive as a new development candidate, not as an automatic replacement.
2. Run `npm install`, `npm run lint`, `npm run typecheck` and `npm run build` in an environment with network access. Resolve every failure before deployment.
3. Set Netlify environment variables: `NEXT_PUBLIC_SITE_URL=https://vecuniverse.com`, `NEXT_PUBLIC_SITE_INDEXABLE=false` during staging, official contact values, and the Sanity values only if CMS is configured.
4. Configure Resend server-side: `RESEND_API_KEY`, `VEC_RECEIVE_EMAIL=vec.curiomaya@gmail.com`, and a sender address on a verified domain. Never commit secrets.
5. Test a real enquiry from the deployed staging site and confirm the email arrives and reply-to points to the visitor. Test invalid input and service failure too.
6. Create/verify the GA4 property. Add `NEXT_PUBLIC_GA4_ID=G-...` only after privacy/legal review. Test accept, reject, and changing the choice. Do not enable advertising features or personalised advertising.
7. Verify `vecuniverse.com` as a Domain property in Google Search Console and submit `/sitemap.xml` after the final domain and sitemap are confirmed.
8. Review and legally approve the Privacy Policy and Terms of Use against the actual data flows, vendors, retention, product sales and applicable jurisdictions.
9. Test all routes, mobile layouts, keyboard navigation, images, videos, links, metadata, canonical URLs, robots.txt and sitemap.xml.
10. Keep indexing disabled until HTTPS, apex/www redirects, DNS, production content and all launch checks are confirmed. Preserve existing MX/TXT email DNS records.
11. Deploy to a Netlify preview first, then production only after approval.

## Not configured or verified by this source package
- GA4 Measurement ID and live data collection.
- Search Console domain verification and sitemap submission.
- Resend credentials, sender-domain verification and real email delivery.
- Netlify environment variables, deploy configuration and live domain DNS.
- Legal approval of policy drafts.
- Live production deployment and real-device/browser QA.
