# VEC Website V48/V49 Package Contents Audit

## Direct comparison performed
The V48 archive was compared against the V47 SEO archive after normalizing their different top-level folder names.

- V47 archive: 129 files, approximately 25.43 MB uncompressed, 24.35 MB ZIP.
- V48 archive: 136 files, approximately 26.51 MB uncompressed, 25.26 MB ZIP.
- V47 files missing from V48: **0**.
- New V48 files relative to V47: **7** (physical-kit showcase/schema, gate stage/leaf assets, release notes and a TypeScript incremental cache file).

The important V47 materials remained present in V48, including:
- Maya, Anaya, Chiku, Pip, grandparents, Old Wise Man and other character imagery.
- Lumi and world imagery.
- Discovery Spark, Anvaya Journal and Grey Ripple/villain artwork.
- Original VEC transparent logo assets and social-sharing image.
- Question Chamber and Ancient Door scene artwork.
- Door/ripple/chamber audio assets.
- Website source, routes, CMS schemas, SEO configuration and documentation.

## Why the ZIP is about 26 MB rather than about 500 MB
The 500 MB figure may have referred to a local working folder rather than the release archive. Release archives intentionally do not include generated/developer-only folders such as:
- `node_modules/` — dependencies are restored by `npm install` from package metadata.
- `.next/` — generated Next.js build output, recreated by `npm run build`.
- `.git/` — repository history and local Git objects.
- local environment files such as `.env.local` — may contain secrets and must not be distributed.

Both the V47 and V48 release archives intentionally omitted `node_modules`, `.next` and `.git`. This makes the ZIP smaller without removing the source assets or application code that were present in the V47 release archive.

## Important limitation
This comparison proves that V48 retained every file contained in the V47 release archive. It does **not** prove that it contains every file that may have existed in a separate 500 MB local folder or in an earlier working directory. Keep that older folder backed up until it has been compared separately, especially if it contains original master videos, private production assets, or other files that were never part of the V47 archive.

## V49 changes relative to V48
V49 removes one file from the V48 archive: `tsconfig.tsbuildinfo`. This is a TypeScript incremental-build cache, not source code or a media asset; it is regenerated automatically and is now ignored by Git. No V48 source file, route, schema or media asset was removed.

V49 adds:
- `public/assets/door-leaf-left-rock-v49.webp`
- `public/assets/door-leaf-right-rock-v49.webp`
- V49 release and package-audit documentation.

The V48 timber-style door-leaf assets are retained as legacy files but are no longer referenced by the active gate CSS.
