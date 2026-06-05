# Aevyn Website — Claude Reference

Marketing + legal site for **Aevyn** (Forged Labs LLC), hosted on **Vercel** at **aevyn.io**.

> **Status:** single-page marketing site live (hero · five-pillar story · screenshots · waitlist CTA · footer) + legal pages. Final copy in place. Pillar icons copied from `aevyn-app/assets/pillar_icons` (the app is the source of truth — re-copy if the app's change); only the app screenshots remain placeholder.
> Stack mirrors `forged-labs-website` (Next.js 16 App Router, React 19, TS, Tailwind v4) — but AEVYN uses its OWN look, NOT forgedlabs.io "Obsidian & Sapphire".

## Structure

```
app/
  layout.tsx        # root layout + metadata (metadataBase https://aevyn.io) + Inter font
  page.tsx          # marketing page (hero, 5 pillars, screenshots, CTA, footer)
  globals.css       # Tailwind v4 + AEVYN tokens (surface #0B0F1A, five-pillar palette)
  components/WaitlistForm.tsx  # client: anon-key Supabase insert + dedup handling
  lib/supabase.ts              # lazy browser client (anon key only)
public/
  screenshots/          # placeholder app screenshots (SVG) — replace with real PNGs
  privacy.html          # → /privacy   (rewrite)
  terms.html            # → /terms     (rewrite)
  delete-account.html   # → /delete-account (rewrite)
next.config.ts      # rewrites mapping clean legal URLs to the static HTML
env.local.example   # NEXT_PUBLIC_SUPABASE_URL + ANON_KEY (copy → .env.local)
```

## Waitlist
- CTA inserts into `public.waitlist` in the SHARED AEVYN Supabase project (`nwvhvbjmhwilqbqfjxec`), anon key ONLY (never service_role — client ships to browser). RLS: anon insert-only, no select (no leak); `UNIQUE(email)` dedup → `23505` handled as "already on the list".
- The migration (`20260605000000_waitlist.sql`) lives in **`aevyn-app/supabase/migrations`** — that repo owns this project's migration history; do NOT push migrations from here.
- `npm run test:waitlist` runs the E2E check (insert + dedup + RLS no-leak).

## Legal docs

- These are **Aevyn's** docs (operated by Forged Labs LLC). They are NOT Forged Labs' own company PP/ToU — those are separate docs that live in `forged-labs-ops/legal/Forged Labs/` and must NEVER be hosted here. Nothing on this site references forgedlabs.io legal.
- Self-contained static HTML in `public/` (`privacy.html`, `terms.html`, `delete-account.html`), served at clean URLs via `rewrites()` in `next.config.ts`. Internal effective date: **Last Updated June 3, 2026** (PP/ToS); delete-account June 5, 2026.
- **The finalized HTML that gets dropped into `public/` lives in `aevyn-app/legal/`** (`2026.06.03_aevyn_privacy_policy.html`, `..._terms_of_service.html`, `2026.06.05_aevyn_delete_account.html` — filenames track each doc's internal effective date) — copy from there, renaming to the `public/` filenames. As of 2026-06-05 the `public/` copies are byte-identical to that folder.
- Upstream source of truth: attorney-revised docs in `forged-labs-ops/legal/PP_ToS` (.docx). The in-app bundled copies live in `aevyn-app/constants/legalDocs.js`. On every attorney revision, keep all of these in sync: `forged-labs-ops/PP_ToS` (.docx) → `aevyn-app/legal/*.html` → this `public/` + `aevyn-app/constants/legalDocs.js`.
- `/delete-account` exists specifically for the Google Play "Delete account URL" requirement (and the Apple equivalent).

## Conventions

- Brand: AEVYN's own premium-dark look. Surface `#0B0F1A`. Five-pillar palette — Spirit `#8B5CF6` · Mind `#F59E0B` · Body `#EF4444` · Craft `#3B82F6` · Life `#10B981` (mirrors `aevyn-app/constants/pillars.js`). Accent = Spirit. Wordmark: Inter Black (800), 0.31em tracking. NOT Forged Labs sapphire `#5A86E8`.
- Don't convert the legal HTML to React — they're standalone documents; serve them static.
- Marketing pages, when added, go under `app/` as normal Next routes.

## Deploy

Vercel auto-detects Next.js. Add `aevyn.io` in Vercel → Settings → Domains. After deploy, confirm `/privacy`, `/terms`, `/delete-account` resolve, then wire those URLs into the store listings and the app.
