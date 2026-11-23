# VEC Production Website — Deployment

## 1. GitHub
Push this folder to your VEC repository. The production video is intentionally NOT inside the repository.

## 2. Media storage
Use object storage/CDN for the 4K/10-second reel and future animation files. Cloudflare R2 is a suitable fit: public objects can be served through a custom domain and cached through Cloudflare; `r2.dev` is intended for development, while a custom domain is recommended for production.

Example:
- `https://media.yourvecdomain.com/video/vec-story-reel.mp4`

Then set:
`NEXT_PUBLIC_MEDIA_BASE_URL=https://media.yourvecdomain.com`

## 3. Social profiles
Set the exact official VEC account URLs:
`NEXT_PUBLIC_INSTAGRAM_URL`
`NEXT_PUBLIC_FACEBOOK_URL`
`NEXT_PUBLIC_YOUTUBE_URL`

## 4. Website host
Deploy the Next.js app to your chosen production host. Use environment variables/secrets from the host dashboard; do not commit `.env`.

## 5. Enquiries
The included API route is the safe frontend/backend boundary. Before production:
- connect a real database,
- add authenticated admin inbox,
- add SMTP/email delivery,
- add Meta WhatsApp Cloud API delivery,
- add anti-spam / rate limiting,
- add visitor conversation IDs and reply/webhook handling.

## 6. Mobile
The layout includes touch-sized controls, responsive grids/forms, mobile spacing, and safe-area-aware social controls.
