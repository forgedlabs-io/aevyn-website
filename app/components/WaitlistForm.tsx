"use client";

import { useState } from "react";
import { getSupabase } from "../lib/supabase";

// Pragmatic client-side email check — not RFC-perfect, just enough to catch
// obvious typos before we round-trip to Supabase. The DB is the real gate.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const done = status.kind === "success";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim().toLowerCase();

    if (!EMAIL_RE.test(value)) {
      setStatus({ kind: "error", message: "Please enter a valid email." });
      return;
    }

    setStatus({ kind: "submitting" });

    let error;
    try {
      ({ error } = await getSupabase()
        .from("waitlist")
        .insert({ email: value, source: "aevyn.io" }));
    } catch {
      // getSupabase() throws only if env vars are missing (misconfiguration).
      setStatus({
        kind: "error",
        message: "Something went wrong. Please try again.",
      });
      return;
    }

    if (error) {
      // 23505 = unique_violation → they're already signed up. Treat as success.
      if (error.code === "23505") {
        setStatus({
          kind: "success",
          message: "You're already on the list — sit tight.",
        });
        return;
      }
      setStatus({
        kind: "error",
        message: "Something went wrong. Please try again.",
      });
      return;
    }

    setStatus({
      kind: "success",
      message: "You're in. Watch your inbox.",
    });
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form} noValidate>
      <div style={styles.row}>
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@email.com"
          aria-label="Email address"
          value={email}
          disabled={status.kind === "submitting" || done}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status.kind === "error") setStatus({ kind: "idle" });
          }}
          style={styles.input}
        />
        <button
          type="submit"
          disabled={status.kind === "submitting" || done}
          style={{
            ...styles.button,
            opacity: status.kind === "submitting" || done ? 0.6 : 1,
            cursor:
              status.kind === "submitting" || done ? "default" : "pointer",
          }}
        >
          {status.kind === "submitting"
            ? "Joining…"
            : done
              ? "Joined ✓"
              : "Join the waitlist"}
        </button>
      </div>

      {(status.kind === "success" || status.kind === "error") && (
        <p
          role="status"
          style={{
            ...styles.message,
            color:
              status.kind === "success"
                ? "var(--av-life)"
                : "var(--av-body)",
          }}
        >
          {status.message}
        </p>
      )}
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: { width: "100%", maxWidth: "440px" },
  row: { display: "flex", gap: "10px", flexWrap: "wrap" },
  input: {
    flex: "1 1 220px",
    minWidth: 0,
    padding: "13px 16px",
    fontSize: "15px",
    color: "var(--av-text)",
    background: "var(--av-surface)",
    border: "1px solid var(--av-border)",
    borderRadius: "12px",
    outline: "none",
  },
  button: {
    padding: "13px 22px",
    fontSize: "15px",
    fontWeight: 700,
    color: "#fff",
    background: "var(--av-accent)",
    border: "none",
    borderRadius: "12px",
    whiteSpace: "nowrap",
  },
  message: { fontSize: "14px", margin: "12px 2px 0", lineHeight: 1.4 },
};
