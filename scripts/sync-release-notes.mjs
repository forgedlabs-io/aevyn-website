// Copy the app's release notes into app/whats-new/notes.json.
//
// The app is the source of truth: aevyn-app/constants/releaseNotes.js, emitted
// as JSON by `node scripts/build-release-notes-json.js` in that repo.
//
// Usage:
//   npm run sync:release-notes                      # reads ../aevyn-app/constants/release-notes.json
//   node scripts/sync-release-notes.mjs <path/to/release-notes.json>
//
// Also creates public/whats-new/<id>/ for each entry and lists which
// screenshots are still missing (the page hides missing ones).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(
  process.argv[2] ||
    process.env.AEVYN_RELEASE_NOTES ||
    join(ROOT, "..", "aevyn-app", "constants", "release-notes.json"),
);
const OUT = join(ROOT, "app", "whats-new", "notes.json");

const notes = JSON.parse(readFileSync(SRC, "utf8"));
if (!Array.isArray(notes) || notes.length === 0) {
  throw new Error(`${SRC}: expected a non-empty array of release notes`);
}
for (const n of notes) {
  if (!n.id || !n.date || !n.title || !Array.isArray(n.bullets)) {
    throw new Error(`${SRC}: entry ${JSON.stringify(n.id)} is missing id/date/title/bullets`);
  }
}

writeFileSync(OUT, JSON.stringify(notes, null, 2) + "\n");
console.log(`Wrote app/whats-new/notes.json from ${SRC} (${notes.length} entries, latest ${notes[0].id})`);

const missing = [];
for (const n of notes) {
  mkdirSync(join(ROOT, "public", "whats-new", n.id), { recursive: true });
  for (const s of n.screenshots ?? []) {
    const rel = s.url.replace(/^https?:\/\/(www\.)?aevyn\.io\//, "");
    if (!existsSync(join(ROOT, "public", rel))) missing.push(`public/${rel}  (${s.alt ?? ""})`);
  }
}
if (missing.length) {
  console.log(`Screenshots not added yet (hidden on the page until they exist):\n  ${missing.join("\n  ")}`);
}
