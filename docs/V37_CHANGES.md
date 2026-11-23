# V37 changes

- Mobile Question Chamber now preserves the source artwork's 1672:941 aspect ratio instead of stretching it into the tall phone viewport.
- The chamber artwork and creature-question overlay share the same centered aspect-ratio artboard, keeping question hotspots attached to their parchment locations.
- Mobile answer scroll is constrained to a dedicated bottom band with scrolling, preventing clipping.
- Mobile "Ask your own question" input is constrained to a separate bottom band and stays fully visible.
- Added the current local Wi-Fi address to `allowedDevOrigins` for phone testing on the development server.
