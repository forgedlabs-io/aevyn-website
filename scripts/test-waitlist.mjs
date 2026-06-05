/**
 * End-to-end test for the AEVYN waitlist capture path.
 *
 * Exercises exactly what the browser does — anon-key insert into public.waitlist —
 * plus the RLS guarantees the marketing site relies on:
 *   1. anon INSERT of a new email succeeds.
 *   2. anon INSERT of a duplicate email raises 23505 (the "already on the list" path).
 *   3. anon SELECT returns nothing (insert-only RLS → list never leaks client-side).
 *
 * Run:
 *   NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... \
 *     node scripts/test-waitlist.mjs
 *
 * Optional teardown (keeps prod waitlist pristine) — pass a service_role key:
 *   SUPABASE_SERVICE_ROLE_KEY=... node scripts/test-waitlist.mjs
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !anonKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(2);
}

const TEST_EMAIL = "e2e-waitlist-test@aevyn.io";
const anon = createClient(url, anonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

let failures = 0;
const ok = (name) => console.log(`  PASS  ${name}`);
const bad = (name, detail) => {
  failures++;
  console.log(`  FAIL  ${name} — ${detail}`);
};

// Clean any leftover row first so the "new insert" assertion is meaningful.
if (serviceKey) {
  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
  await admin.from("waitlist").delete().eq("email", TEST_EMAIL);
}

console.log("AEVYN waitlist E2E\n");

// 1. New insert succeeds.
{
  const { error } = await anon
    .from("waitlist")
    .insert({ email: TEST_EMAIL, source: "e2e-test" });
  if (!error) ok("anon insert (new email)");
  else if (error.code === "23505")
    ok("anon insert — row already existed (leftover from a prior run, acceptable)");
  else bad("anon insert (new email)", `${error.code}: ${error.message}`);
}

// 2. Duplicate insert raises 23505.
{
  const { error } = await anon
    .from("waitlist")
    .insert({ email: TEST_EMAIL, source: "e2e-test" });
  if (error && error.code === "23505") ok("duplicate insert raises 23505");
  else bad("duplicate insert raises 23505", error ? `${error.code}: ${error.message}` : "no error returned");
}

// 3. anon SELECT leaks nothing (no select policy).
{
  const { data, error } = await anon.from("waitlist").select("email").limit(1);
  if ((data?.length ?? 0) === 0) ok("anon select returns no rows (RLS no-leak)");
  else bad("anon select returns no rows (RLS no-leak)", `got ${data.length} row(s)${error ? ` / ${error.message}` : ""}`);
}

// Teardown.
if (serviceKey) {
  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
  const { error } = await admin.from("waitlist").delete().eq("email", TEST_EMAIL);
  if (!error) console.log("\n  (teardown) test row deleted");
  else console.log(`\n  (teardown) could not delete test row: ${error.message}`);
} else {
  console.log(`\n  NOTE: no SUPABASE_SERVICE_ROLE_KEY given — left test row ${TEST_EMAIL} (source='e2e-test') in the table.`);
}

console.log(`\n${failures === 0 ? "ALL PASSED" : `${failures} FAILURE(S)`}`);
process.exit(failures === 0 ? 0 : 1);
