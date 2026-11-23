# V39 Changes

- Reworked Ancient Door close state so the closed-door scene remains mounted underneath the chamber during the closing animation. This eliminates the black frame and leaves the gate ready for the next click immediately.
- Added dedicated cinematic door-open and door-close composite audio cues and switched the door actions to use them as single authored events.
- Kept chamber ambience delayed until after the reveal and corrected the previous stale `open` state check that could prevent ambience from starting.
- Kept Sound Off behavior compatible with the new cues by routing them through the existing tracked-audio set.
