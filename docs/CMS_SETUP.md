# VEC Content Studio Setup (V48)

The VEC website includes an authenticated Sanity content editor at `/content-studio`. The editor manages only approved public website content. It is not a private VEC Universe Bible or episode-production repository.

## 1. Create the Sanity project

1. Open `https://www.sanity.io/manage` and sign in with a VEC-controlled account.
2. Create a project named **VEC Studios Website Content**.
3. Create/use a dataset named `production`.
4. Copy the Project ID shown in project settings. The Project ID is public; it is not an API secret.
5. In the Sanity project API/CORS settings, allow these origins as needed:
   - `http://localhost:3000` (local testing)
   - `https://vec-studios-preview.netlify.app` (Netlify site URL)
   - the exact deploy-preview URL while testing the embedded Studio
   - the final HTTPS domain after it is registered and connected

For each embedded Studio origin, enable **Allow credentials** in the CORS entry. Sanity requires the application origin to be registered for browser-based Studio/API access.

Do not add a write token to frontend configuration. Studio uses Sanity's own sign-in/authentication flow. The public website reads only published content from the public dataset.

## 2. Local environment

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=YOUR_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=
```

Do not commit `.env.local`. It is already excluded by `.gitignore`.

## 3. Run and open the Studio

```powershell
npm install
npm run dev
```

Open `http://localhost:3000/content-studio` and sign in with an authorized Sanity account. The Studio contains:

- Website settings
- Learning areas
- Visitor pathways
- Approved visual glimpses
- Public experiences and media
- Verified studio updates
- Physical play & discovery kits

The first time, open **Website settings** and create the singleton document. Its fields contain the editable public homepage/about/approach/studio/contact wording and SEO defaults. You can then add learning areas and visitor pathways; add public glimpses, experiences and updates only after each item is approved for release. Use **Physical play & discovery kit** for approved activity kits, learning games and interactive kits; set the availability stage accurately and keep prices blank until a product is genuinely available.

## 4. Publishing rules

- Publish the Sanity document.
- For learning areas/pathways, enable **Show on public website**.
- For visual glimpses/public experiences, enable **Show on public website** only after the image/video and wording are approved for release.
- For studio updates, both **Fact checked and approved** and **Show on public website** must be enabled. For physical kits, publish only public-facing product names, approved mock-ups, short descriptions and truthful availability stages; the page does not offer checkout while items are in manufacturing.
- The public site API reads published documents only. Drafts are not exposed to the public website.
- Published CMS changes are reflected through `/api/public-content` after its short cache window (approximately one minute).

## 5. Netlify environment variables

In Netlify → `vec-studios-preview` → Project configuration → Environment variables, add:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` = your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` = `production`
- `NEXT_PUBLIC_SITE_URL` = leave unset until the final custom domain is connected and indexing is approved

Trigger a new deployment after setting the Sanity project values. The `/content-studio` page will become available after the new build. The preview remains noindex while `NEXT_PUBLIC_SITE_URL` is empty. After the preview is deployed, you may register the embedded Studio with Sanity using `npx sanity@latest deploy --external --url https://vec-studios-preview.netlify.app/content-studio`; repeat with the final domain URL when the Studio URL changes.

## 6. Images and video

- Upload approved, optimized images directly to the `Approved visual glimpses`, `Public experiences`, and `Verified studio updates` documents.
- Short web-ready MP4/WebM clips can be uploaded in `Public experiences`.
- Keep 4K masters, long episodes and large production media in dedicated object storage/CDN. Paste the public playback URL into the CMS `Video/CDN URL` field. Do not place large masters in GitHub.

## 7. Enquiry delivery (separate from the content CMS)

The enquiry API sends mail through Resend and refuses to show a success confirmation when delivery is not configured. After the final domain is registered and verified as a sending domain in Resend, set these **server-side** Netlify environment variables:

- `RESEND_API_KEY` = Resend API key (secret; never prefix with `NEXT_PUBLIC_`)
- `VEC_RECEIVE_EMAIL` = VEC inbox receiving enquiries
- `VEC_FROM_EMAIL` = a sender address on the verified domain, e.g. `website@yourdomain.com`

The current release emails enquiries to VEC. A searchable admin inbox, database persistence, visitor reply threads and WhatsApp notifications are future phases and are not claimed as implemented.

## 8. Keep private VEC IP outside the CMS

Do not upload the private VEC Universe Bible, unreleased character sheets, full episode scripts, season mysteries, internal production prompts, contracts, financial information, or confidential IP material. The public CMS intentionally has no content types for the full character bible, episode roadmap or hidden universe structure.
