# aevyn-website

Marketing + legal site for **AEVYN** (Forged Labs LLC), deployed on **Vercel** at **aevyn.io**.

> Single-page marketing site (hero · five-pillar story · screenshots · waitlist CTA)
> plus the legal pages required by the app and the app-store listings.
> Copy is final; pillar icons mirror the app. Only the app screenshots are still placeholder.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** · **Tailwind v4**
- Matches the `forged-labs-website` setup for consistency.

## Routes

| URL | Source | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Marketing page: hero, five-pillar story, screenshots, waitlist CTA, footer |
| `/privacy` | `public/privacy.html` | Attorney-revised Privacy Policy (rewrite) |
| `/terms` | `public/terms.html` | Attorney-revised Terms of Service (rewrite) |
| `/delete-account` | `public/delete-account.html` | Account-deletion page (Google Play "Delete account URL" requirement) |

The legal documents are self-contained static HTML in `public/`, served at clean
URLs via `rewrites()` in `next.config.ts`. They are the canonical copies linked
from the Aevyn app (`constants/legalDocs.js`) and the store listings. When the
attorney revises the documents, regenerate these files from
`forged-labs-ops/legal/PP_ToS`.

## Waitlist (email capture)

The CTA inserts emails into `public.waitlist` in the **shared AEVYN Supabase
project** (`nwvhvbjmhwilqbqfjxec`) via `supabase-js`, using the **anon key only**
(never `service_role` — this client ships to the browser). RLS allows `anon`
INSERT but no SELECT, so the list can't be read client-side; `UNIQUE(email)`
gives free dedup (a repeat signup raises `23505`, handled as "already on the list").

- Table definition lives in **`aevyn-app/supabase/migrations`** (that repo owns
  this project's migration history). Migration: `20260605000000_waitlist.sql`.
- Client wiring: `app/lib/supabase.ts` (lazy client) + `app/components/WaitlistForm.tsx`.

### Environment

Copy `env.local.example` → `.env.local` for dev; set the same in Vercel →
Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://nwvhvbjmhwilqbqfjxec.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
```

## Develop

```bash
npm install
npm run dev            # http://localhost:3000  → / , /privacy , /terms , /delete-account
npm run build
npm run test:waitlist  # E2E: anon insert + 23505 dedup + RLS no-leak (needs env vars)
```

## Deploy (Vercel)

1. Create a new GitHub repo (e.g. `forgedlabs-io/aevyn-website`) and push.
2. Import it in Vercel (auto-detects Next.js — no config needed).
3. Add the `aevyn.io` domain in Vercel → Project → Settings → Domains, and point
   DNS as Vercel instructs.
4. Verify `aevyn.io/privacy`, `/terms`, and `/delete-account` resolve, then put
   those URLs into the App Store / Google Play listings and the in-app links.
