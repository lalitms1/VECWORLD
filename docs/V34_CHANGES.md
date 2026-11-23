# V34 preview fixes

- Switched the door and chamber backgrounds to WebP for much smaller transfer sizes.
- Switched the supplied transparent VEC logo to a lossless-transparent WebP.
- Added idle prewarming of the ancient-door image after first paint.
- Made mobile navigation clearer and more touch-friendly.
- Made the mobile question chamber taller and enlarged the world while preserving overlay coordinates.
- Door close now commits the closed-door state before the fade completes so the next open is immediate.
- Reduced the hero image sizing warning by using a responsive `sizes` value.
