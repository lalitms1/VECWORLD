# VEC Studios Website — V51 Production Readiness Foundation

V51 is based on the V50 Contact System website archive. It retains the existing VEC cinematic experience, content, assets, product imagery, contact configuration and Next.js/Sanity structure, and adds a first production-readiness layer.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## V51 additions
- Public Privacy Policy and Terms of Use starter pages.
- Sitewide footer links to legal information and contact.
- Optional GA4 integration behind an explicit visitor choice. Analytics loads only when `NEXT_PUBLIC_GA4_ID` is set and the visitor opts in.
- No display advertising integration. VEC's no-display-advertising policy is stated in the privacy notice.
- Privacy and terms pages added to the sitemap.
- Production indexing remains disabled by default.
- Full launch checklist in `V51_IMPLEMENTATION_AND_LAUNCH_CHECKLIST.md`.

## Important
This archive is a development candidate, not a deployed or fully verified production release. Dependencies must be installed and lint, typecheck and production build must be run before use. GA4, Search Console, Resend email delivery, DNS, Netlify deployment and legal review all require owner configuration and testing. Read the launch checklist before enabling indexing.
