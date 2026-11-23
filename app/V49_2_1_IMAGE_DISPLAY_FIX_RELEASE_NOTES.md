# VEC Website V49.2.1 — Product Image Display Fix

## What changed
- Fixed the Play & Discover product gallery layout in `app/globals.css`.
- Explicitly stretches `.play-kit-media` children so the Next.js `Image` `fill` wrapper receives a non-zero width.
- Preserves all existing pages, product assets, journal content, brand assets, and dependencies.

## Root cause
An earlier `.play-kit-media` rule used `place-items: center` while the element was a grid. A later rule changed it to a flex column but did not reset the resulting `align-items: center`. The image wrapper therefore collapsed to zero width.

## Installation
This is a complete website project archive. Extract it, open the project folder in Command Prompt, run `npm install`, then `npm run dev`.
