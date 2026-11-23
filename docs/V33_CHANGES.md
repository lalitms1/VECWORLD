# V33 changes

- Re-anchored all six Question Chamber text hotspots to the actual parchment signs in `question-chamber-world.png` (1672×941) and forced the chamber background to the source image's exact aspect-ratio rendering so cover-cropping cannot shift the anchors.
- Rebuilt chamber audio control with tracked audio instances and cancellable timers so Sound Off actually stops all active/queued chamber audio and Sound On resumes ambient audio without restarting the visual story timer.
- Added a real closing sequence: the Close button now animates the chamber out, plays a closing/latch sound, clears pending timers/audio, then returns to the door; Escape also closes the chamber.
- Kept question answer/input overlays beneath the question layer and controls so the parchment questions remain clickable and visually stable.
