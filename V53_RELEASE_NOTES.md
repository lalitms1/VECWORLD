# VEC V53 — Enquiry Experience Update

- Improved enquiry form feedback for sending, success, unconfigured email service and delivery errors.
- Explicitly tells visitors their message was not sent when email configuration is missing.
- Adds direct email and WhatsApp fallback links in unavailable/error states.
- Adds basic honeypot spam deterrent, input limits, autocomplete and clearer field guidance.
- Retains VEC social platform icons and their existing configuration approach.

## Future social link updates
Edit `config/site.ts` → `site.social` (`instagram`, `facebook`, `linkedin`, `youtube`) for local source defaults. For Netlify production, set `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_FACEBOOK_URL`, `NEXT_PUBLIC_LINKEDIN_URL`, and `NEXT_PUBLIC_YOUTUBE_URL` under Site configuration → Environment variables, then redeploy. Use the official full HTTPS profile/page URLs only. WhatsApp and email destinations are in `config/site.ts` under `site.contact`.

## Verification status
Source changes and ZIP integrity are checked. Real Resend delivery requires the account/API key and verified sender domain and has not been tested by this package build. Run `npm install`, `npm run typecheck`, `npm run lint`, and `npm run build` in the project before production deployment.
