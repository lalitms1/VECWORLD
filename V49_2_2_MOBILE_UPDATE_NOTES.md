VEC WEBSITE — V49.2.2 MOBILE RESPONSIVENESS UPDATE

Base: VEC_Production_Website_V49_2_1_COMPLETE.zip (the working version supplied in this conversation).

Changes:
- Mobile navigation now closes when the hamburger is tapped again, when the user taps outside the navigation, when Escape is pressed, and when a navigation link is selected.
- Added accessible expanded state, control relationship, and dynamic button labels.
- Hid the Next.js development indicator so it does not sit over the site's own mobile navigation.
- Added mobile-only spacing and sizing corrections for the VEC Approach page so the Discovery Spark artwork no longer overlaps the heading.
- Adjusted the Approach page's mobile card grid and menu sizing.

Desktop protection:
- Existing desktop CSS rules and desktop navigation layout were not changed. New visual rules are limited to max-width media queries.
- Shared navigation component changes only affect the mobile menu state and accessibility; desktop navigation links remain unchanged.

Important verification note:
- Archive integrity is checked.
- A fresh dependency installation and production build could not be completed in this environment due to installation timeout. Please run `npm install` and `npm run build` locally before deploying.
- No dependency versions were changed in package.json.
