# V2 notes

- Replaced frame-dependent note triggering with a 35 ms look-ahead scheduler.
- Audio events are scheduled against the Web Audio clock to avoid dropped notes on mobile Safari.
- Piano-like synthesis now layers body, warm fundamental and a subtle upper harmonic, with a longer natural release.
- Added a restrained ambience/delay path for space without external dependencies.
- Reworked the demo into a longer musical arc: sparse intro, theme, development, climax and resolving outro.
- Added deterministic micro-timing on playback for a less rigid feel while keeping notation data unchanged.

The audio engine intentionally remains dependency-free so GitHub Pages works without downloading a large sample library. A future V3 can add locally hosted, licensed piano samples for a more realistic grand-piano timbre.
