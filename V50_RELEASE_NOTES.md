# VEC Website V50 — Contact Configuration Update

## Confirmed public contact channels
- Public email: vec.curiomaya@gmail.com
- WhatsApp: +91 7846867395 (wa.me/917846867395)
- YouTube: https://www.youtube.com/@VECUniverse

## Changes
- Added `config/site.ts` as the central source for the website URL, public contact details and social URLs.
- Updated social link consumers and organization structured data to use the central configuration.
- Instagram and Facebook links remain unset and are hidden until official URLs are supplied.
- YouTube and WhatsApp use the confirmed official destinations.
- Added environment-variable overrides for future channel changes without editing multiple components.
- Kept enquiry delivery dependent on server-only Resend credentials; this package does not claim email delivery is active.
- Future website releases use whole-number version labels (V50, V51, V52...), not decimal subversions.

## Deployment notes
- Set `NEXT_PUBLIC_SITE_URL=https://vecuniverse.com` in the deployment environment.
- Keep `NEXT_PUBLIC_SITE_INDEXABLE=false` until the production domain, redirects, sitemap, robots.txt and launch content are verified.
- Set `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, and `NEXT_PUBLIC_YOUTUBE_URL` if deployment overrides are needed.
- Set `RESEND_API_KEY`, `VEC_RECEIVE_EMAIL=vec.curiomaya@gmail.com`, and a verified `VEC_FROM_EMAIL` on the hosting platform to activate enquiry delivery.
- Never commit actual API keys or private `.env` files to GitHub.

## Verification status
- Source references were updated and reviewed.
- A fresh dependency install, TypeScript check, lint, production build and live link test have not been run in this environment.
