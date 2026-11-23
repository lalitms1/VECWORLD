# VEC Website V48 — Physical Play Showcase & Gate Experience

## Included
- New `/play` page: Beyond the Screen / physical activity kits, learning games and interactive kits.
- Public Content Studio schema for approved physical kits (`physicalKit`).
- Public content API returns visible, featured kit records. The page uses category-level teasers until approved product records are published.
- Manufacturing/development status is shown; no checkout or payment flow is implied. Prices appear only for records marked Available and with an explicit price.
- Mobile social links no longer float over page content. On mobile they appear in the menu and footer; desktop keeps the vertical social rail.
- Rebuilt Ancient Door stage: the approved full scene is preserved; separate transparent arched door-leaf cutouts rotate outward from outer hinges with CSS 3D perspective, revealing the Question Chamber image behind the stone arch. Closing returns the arched leaves to the same closed gate.
- Existing V47 SEO metadata, sitemap, robots/indexing safeguards and Content Studio are preserved.

## Door rendering note
The gate is a carefully aligned 2.5D scene using the existing approved artwork, transparent door-leaf cutouts and CSS perspective. It is not a real-time WebGL 3D mesh. The scene is designed to be repeatable: Closed → Opening → Open → Closing → Closed.

## Local setup
```powershell
npm install
npm run dev
```
For phone testing on the same Wi-Fi:
```powershell
npm run dev -- --hostname 0.0.0.0
```
Open `http://<PC-WIFI-IP>:3000` on the phone.

Before deployment:
```powershell
npm run build
```

## Sanity
The Content Studio adds **Physical play & discovery kit**. Publish only approved public product names, summaries and imagery. Keep cost sheets, manufacturing drawings and private production information out of the public CMS.
