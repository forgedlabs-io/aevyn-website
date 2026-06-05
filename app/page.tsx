/**
 * Placeholder home page. Marketing content comes later — this is intentionally
 * minimal scaffolding so the domain resolves and the legal routes are linked.
 * The legal pages (/privacy, /terms, /delete-account) are served from static
 * HTML in /public via rewrites in next.config.ts.
 */
export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "24px",
        gap: "16px",
      }}
    >
      <p
        style={{
          fontSize: "14px",
          fontWeight: 800,
          letterSpacing: "0.3em",
          color: "var(--av-accent)",
        }}
      >
        AEVYN
      </p>
      <h1
        style={{
          fontSize: "clamp(28px, 5vw, 44px)",
          fontWeight: 800,
          margin: 0,
          maxWidth: "640px",
          lineHeight: 1.15,
        }}
      >
        Coming soon.
      </h1>
      <p style={{ color: "var(--av-text-muted)", maxWidth: "520px", margin: 0 }}>
        A personal wellness and habit-tracking app by Forged Labs LLC.
      </p>
      <nav
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "12px",
          fontSize: "14px",
        }}
      >
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
        <a href="/delete-account">Delete Account</a>
      </nav>
      <footer
        style={{
          color: "var(--av-text-muted)",
          fontSize: "13px",
          marginTop: "32px",
        }}
      >
        © 2026 Forged Labs LLC
      </footer>
    </main>
  );
}
