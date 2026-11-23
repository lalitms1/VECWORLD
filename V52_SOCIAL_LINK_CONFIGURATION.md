# VEC V52 — Social platform links and brand icons

## What changed
- Instagram, Facebook, LinkedIn, YouTube, WhatsApp and Email are always represented in the social link areas.
- Instagram, Facebook and LinkedIn remain visible before their official accounts are created. Until a URL is configured, the icon is intentionally non-clickable and its tooltip says the link will be added.
- YouTube, WhatsApp and Email use the current VEC contact destinations.
- Platform marks use recognisable brand colours and familiar brand glyphs; no third-party logo image downloads are required.

## Where to update future profile URLs
Open `config/site.ts` and update these values in `site.social`:
- `instagram` — full official Instagram profile URL
- `facebook` — full official Facebook Page URL
- `linkedin` — full official LinkedIn company/page URL
- `youtube` — current VEC YouTube channel URL

Use full HTTPS URLs, for example `https://www.instagram.com/your-official-handle/`. Do not use personal profile URLs unless they are intended as VEC's official channel.

For Netlify production, also add/update the corresponding environment variables in **Site configuration → Environment variables**:
- `NEXT_PUBLIC_INSTAGRAM_URL`
- `NEXT_PUBLIC_FACEBOOK_URL`
- `NEXT_PUBLIC_LINKEDIN_URL`
- `NEXT_PUBLIC_YOUTUBE_URL`

After changing Netlify variables, trigger a new deploy so the public build receives them. For local testing, update `.env.local` (not committed to Git) or `config/site.ts`, then restart the dev server.

## Where the icons appear
The same social set is rendered in the fixed desktop social dock, mobile navigation popover and footer. The unconfigured social icons are visible but cannot be clicked until their official URL is supplied.
