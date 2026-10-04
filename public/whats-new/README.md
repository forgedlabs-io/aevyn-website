# What's new screenshots

Screenshots for aevyn.io/whats-new and the in-app What's new screen (the app
loads them from `https://aevyn.io/whats-new/<id>/<n>.png`).

- One folder per release-notes entry, named by its id (e.g. `2026-10-04/`).
- Files are numbered PNGs: `1.png`, `2.png`, ... in the order listed in the
  entry's `screenshots` array (aevyn-app `constants/releaseNotes.js`).
- Portrait phone screenshots work best. Missing files are simply hidden, both
  on the site and in the app.
- `npm run sync:release-notes` lists which ones are still missing.
