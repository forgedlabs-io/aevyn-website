import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser Supabase client for the AEVYN marketing site.
 *
 * ANON KEY ONLY. This client ships to the browser, so it must never hold the
 * service_role key. The only thing it does is INSERT into `public.waitlist`,
 * which RLS allows for the `anon` role (insert-only; no select/update/delete).
 *
 * Created lazily (on first use, in the browser) rather than at module load —
 * otherwise prerendering the page on the server, where NEXT_PUBLIC_* env may be
 * absent, would throw "supabaseUrl is required" at build time.
 *
 * Env (set in Vercel → Project → Settings → Environment Variables, and in
 * .env.local for dev — see env.local.example):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY — " +
        "waitlist is not configured."
    );
  }

  client = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
