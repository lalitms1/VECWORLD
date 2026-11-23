# VEC V53 — Enquiry service activation guide

## What V53 changes
- Replaces the vague “service is being prepared” form message with an explicit notice that online submission is not active and that the message was **not sent** when email credentials are missing.
- Provides direct email and WhatsApp fallback links in that state.
- Shows distinct sending, accepted, unavailable and error states; prevents double-click submission while sending.
- Adds browser autofill hints, field length limits, clearer optional phone label and a hidden honeypot field.
- Escapes user-provided content in the email HTML (retained from V52).

## Required activation steps (Netlify)
1. Create/sign in to a Resend account.
2. Add a domain you control in Resend and complete the DNS verification records Resend supplies. Do not guess or substitute DNS records; copy the exact records shown by Resend into the domain's DNS manager. Preserve existing MX records used for receiving VEC email unless your mail provider explicitly instructs otherwise.
3. In Netlify, open **Site configuration → Environment variables** and add:
   - `RESEND_API_KEY` — secret API key from Resend (server-side only; never use a `NEXT_PUBLIC_` prefix).
   - `VEC_RECEIVE_EMAIL` — `vec.curiomaya@gmail.com`.
   - `VEC_FROM_EMAIL` — a sender address on the domain Resend has verified, e.g. `website@vecuniverse.com` only after that domain is verified.
4. Trigger a fresh deploy so the server function receives the environment variables.
5. Submit a test enquiry from the deployed site using an email address you can access. Confirm it arrives in the VEC inbox and use Reply to confirm the visitor's email is the reply-to address.
6. Test missing credentials and provider failure states on a preview/staging deployment. Never leave a fake “success” message in place.

## Local testing
Create `.env.local` in the project root (do not commit it):

```dotenv
RESEND_API_KEY=re_your_real_key
VEC_RECEIVE_EMAIL=vec.curiomaya@gmail.com
VEC_FROM_EMAIL=website@your-verified-domain.com
```

Use a sender domain verified in your Resend account. Restart `npm run dev` after editing environment variables. Without these values, the form deliberately reports that online submission is unavailable and offers direct contact links.

## Honest delivery status
An HTTP success from Resend means the provider accepted the email request; it is not proof that the message reached the recipient's inbox. Verify actual arrival with a real test before announcing the feature as operational. Provider rejections are reported as submission failures. Check Netlify function logs for server-side diagnostic details; API keys and message contents must not be exposed in browser code or public logs.

## Current limitation
V53 includes a honeypot as a basic bot deterrent. It does not include durable distributed rate limiting, CAPTCHA/Turnstile, an enquiry database, or delivery-webhook monitoring. Add those only with a suitable service and after testing. The website should not claim these protections exist until implemented.
