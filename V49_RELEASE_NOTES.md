# VEC Website V49 — Ancient Rock Gate Material Update

## What changed from V48
- Replaced the timber-looking door leaf artwork with two new individually split, alpha-transparent weathered-stone slabs.
- The new gate is a monolithic carved-rock double door with rough chipped stone edges, embedded owl and stag reliefs, root/leaf carvings, deep stone grain and heavy ring knockers.
- Widened and realigned the leaf artwork within the existing arched scene so the joined slabs read as one substantial stone gate.
- Refined the 3D hinge swing, perspective, easing and side-edge shading to suggest heavy mass and thickness rather than glass or thin panels.
- Preserved the existing open-scene stage, Question Chamber, repeatable door state logic, sound system, Physical Play showcase, mobile social layout, SEO safeguards, CMS schemas and all existing V48 assets.

## Scope
This is a 2.5D gate treatment using isolated stone-leaf artwork and CSS perspective. It is not a full 3D mesh or physics simulation. The leaves pivot at their outer edges; the interior scene remains behind them.

## Local verification
Run:

```powershell
npm install
npm run build
npm run dev -- --hostname 0.0.0.0
```

Test repeated door cycles: open → close → open → close, without navigating away from Explore.
