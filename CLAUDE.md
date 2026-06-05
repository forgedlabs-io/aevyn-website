# Aevyn Website — Claude Reference

Marketing + legal site for **Aevyn** (Forged Labs LLC), hosted on **Vercel** at **aevyn.io**.

> **Status:** scaffolding only — legal pages live, no marketing content yet (that comes next).
> Stack mirrors `forged-labs-website`: Next.js 16 (App Router), React 19, TypeScript, Tailwind v4.

## Structure

```
app/
  layout.tsx        # root layout + metadata (metadataBase https://aevyn.io)
  page.tsx          # placeholder home (marketing TBD)
  globals.css       # Tailwind v4 + Aevyn tokens (purple #8B5CF6 on dark slate #0F172A)
public/
  privacy.html          # → /privacy   (rewrite)
  terms.html            # → /terms     (rewrite)
  delete-account.html   # → /delete-account (rewrite)
next.config.ts      # rewrites mapping clean legal URLs to the static HTML
```

## Legal docs

- Self-contained static HTML in `public/`, served at clean URLs via `rewrites()` in `next.config.ts`.
- Canonical copies of the attorney-revised PP/ToS (policy version 2026-06-03) + the account-deletion page.
- Source of truth for regeneration: `forged-labs-ops/legal/PP_ToS`. The in-app bundled copies live in `aevyn-app/constants/legalDocs.js`. Keep all three in sync when the attorney revises.
- `/delete-account` exists specifically for the Google Play "Delete account URL" requirement (and the Apple equivalent).

## Conventions

- Brand: Aevyn purple `#8B5CF6` (NOT Forged Labs sapphire `#5A86E8`). Dark slate background `#0F172A`.
- Don't convert the legal HTML to React — they're standalone documents; serve them static.
- Marketing pages, when added, go under `app/` as normal Next routes.

## Deploy

Vercel auto-detects Next.js. Add `aevyn.io` in Vercel → Settings → Domains. After deploy, confirm `/privacy`, `/terms`, `/delete-account` resolve, then wire those URLs into the store listings and the app.
