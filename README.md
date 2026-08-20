# Piano Composer Preview

A lightweight browser player for reviewing an original piano composition before MusicXML export.

## Features

- Play, pause, stop and restart
- Tempo, speed and volume controls
- Both hands / right hand / left hand playback
- Seekable timeline with piano-roll overview
- On-screen piano with active-note highlighting
- iPhone/iPad-friendly responsive UI
- No backend and no build step
- Composition stored as structured note data in `composition.js`

## Run locally

Because the app uses ES modules, serve the directory with a small static server rather than opening `index.html` as a local file.

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## GitHub Pages

The project is static and can be served directly by GitHub Pages after the feature branch is merged into the branch selected for Pages deployment.

## Composition model

Notes are stored in beats with `hand`, `pitch`, `start`, `duration`, and `velocity`. Tempo, key, time signature and total beats are retained separately. This keeps playback editing simple and provides the information needed for a later MusicXML exporter.

The included demo, **After the Quiet Rain**, is an original F# minor piano sketch intended for preview/testing.
