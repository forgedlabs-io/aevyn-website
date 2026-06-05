# aevyn-website

Marketing + legal site for **Aevyn** (Forged Labs LLC), deployed on **Vercel** at **aevyn.io**.

> Scaffolding only — no marketing content yet. Currently serves the legal pages
> required by the app and the app-store listings.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** · **Tailwind v4**
- Matches the `forged-labs-website` setup for consistency.

## Routes

| URL | Source | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Placeholder home (marketing TBD) |
| `/privacy` | `public/privacy.html` | Attorney-revised Privacy Policy (rewrite) |
| `/terms` | `public/terms.html` | Attorney-revised Terms of Service (rewrite) |
| `/delete-account` | `public/delete-account.html` | Account-deletion page (Google Play "Delete account URL" requirement) |

The legal documents are self-contained static HTML in `public/`, served at clean
URLs via `rewrites()` in `next.config.ts`. They are the canonical copies linked
from the Aevyn app (`constants/legalDocs.js`) and the store listings. When the
attorney revises the documents, regenerate these files from
`forged-labs-ops/legal/PP_ToS`.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000  → / , /privacy , /terms , /delete-account
npm run build
```

## Deploy (Vercel)

1. Create a new GitHub repo (e.g. `forgedlabs-io/aevyn-website`) and push.
2. Import it in Vercel (auto-detects Next.js — no config needed).
3. Add the `aevyn.io` domain in Vercel → Project → Settings → Domains, and point
   DNS as Vercel instructs.
4. Verify `aevyn.io/privacy`, `/terms`, and `/delete-account` resolve, then put
   those URLs into the App Store / Google Play listings and the in-app links.
