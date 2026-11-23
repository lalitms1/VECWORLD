# V41 Changes

## Reusable Ancient Door
- Added an explicit door state machine: closed -> opening -> chamber open -> closing -> closed.
- The chamber is revealed only after the physical door opening motion, and the door is re-mounted in closed state after every closing cycle.
- Re-opening from the same Explore tab triggers the full physical opening animation again without requiring navigation away and back.
- Added cropped left/right door-leaf textures from the canonical ancient-door artwork.
- Added an illuminated inner void/gap and 3D hinge-like movement so the gate reads as an actual ancient door rather than a static image.

## Sound
- Added dedicated `door-open-ancient-stone.wav` and `door-close-ancient-stone.wav` cues built from low stone movement, scraping/grinding texture, creaks, impacts, latch/lock detail and cavern resonance.
- Opening and closing timing is synchronized with the physical door state.

## Existing VEC canon retained
- Canonical transparent VEC logo remains unchanged.
- Discovery Spark, Grey Ripple, Question Chamber, creature-held questions, Lumi, Anvaya Journal and other established assets are retained.
