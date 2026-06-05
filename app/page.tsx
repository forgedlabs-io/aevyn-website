import WaitlistForm from "./components/WaitlistForm";

/**
 * AEVYN — single marketing page.
 *
 * Sections: Hero · Five-pillar feature story · Screenshots · Waitlist CTA · Footer.
 * No nav, no blog, no FAQ, no pricing (by design).
 *
 * COPY STATUS: hero promise + pillar blurbs are PLACEHOLDERS pending final copy.
 * Each is flagged with `TODO(copy)`. Brand colors come from globals.css tokens.
 */

// The five foundational pillars. Colors AND icons mirror the app —
// icons copied from aevyn-app/assets/pillar_icons (the app is the source of
// truth); colors match aevyn-app/constants/pillars.js exactly.
const PILLARS = [
  {
    name: "Spirit",
    color: "var(--av-spirit)",
    glow: "var(--av-glow-spirit)",
    icon: "/pillar-icons/spirit.png",
    blurb: "Reflect, ground, and reconnect with what matters.",
  },
  {
    name: "Mind",
    color: "var(--av-mind)",
    glow: "var(--av-glow-mind)",
    icon: "/pillar-icons/mind.png",
    blurb: "Sharpen focus, learn deeper, think clearer.",
  },
  {
    name: "Body",
    color: "var(--av-body)",
    glow: "var(--av-glow-body)",
    icon: "/pillar-icons/body.png",
    blurb: "Move, rest, and fuel — your foundation.",
  },
  {
    name: "Craft",
    color: "var(--av-craft)",
    glow: "var(--av-glow-craft)",
    icon: "/pillar-icons/craft.png",
    blurb: "Build skill and make the work that's yours.",
  },
  {
    name: "Life",
    color: "var(--av-life)",
    glow: "var(--av-glow-life)",
    icon: "/pillar-icons/life.png",
    blurb: "Tend the relationships and rhythms that hold it together.",
  },
];

const SCREENSHOTS = [
  "/screenshots/screen-1.svg",
  "/screenshots/screen-2.svg",
  "/screenshots/screen-3.svg",
];

export default function Home() {
  return (
    <main style={styles.page}>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section style={styles.hero}>
        <p className="av-wordmark" style={styles.wordmark}>
          AEVYN
        </p>
        <h1 style={styles.heroPromise}>Five pillars. One you.</h1>
        <p style={styles.heroSub}>Every part of you, growing together.</p>
      </section>

      {/* ─── Five-pillar feature story ────────────────────────── */}
      <section style={styles.pillars} aria-label="The five pillars">
        <header style={styles.leadIn}>
          <p style={styles.leadInText}>
            Most apps pick one part of you.
            <br />
            Aevyn holds all five — so progress in one feeds the rest.
          </p>
        </header>
        {PILLARS.map((p) => (
          <article
            key={p.name}
            style={{
              ...styles.pillarCard,
              // Each block is themed to its pillar color.
              borderTop: `3px solid ${p.color}`,
              backgroundImage: `radial-gradient(120% 80% at 50% 0%, ${p.glow}, transparent 70%)`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.icon}
              alt=""
              aria-hidden="true"
              width={40}
              height={40}
              style={styles.pillarIcon}
            />
            <h2 style={{ ...styles.pillarName, color: p.color }}>{p.name}</h2>
            <p style={styles.pillarBlurb}>{p.blurb}</p>
          </article>
        ))}
      </section>

      {/* ─── Screenshots ──────────────────────────────────────── */}
      <section style={styles.shots} aria-label="App screenshots">
        {SCREENSHOTS.map((src, i) => (
          // Placeholder art. Replace with real PNGs dropped in /public/screenshots.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt={`AEVYN app screenshot ${i + 1}`}
            style={styles.shot}
            width={320}
            height={660}
          />
        ))}
      </section>

      {/* ─── Waitlist CTA ─────────────────────────────────────── */}
      <section style={styles.cta} aria-label="Join the waitlist">
        <h2 style={styles.ctaHeading}>Be first in.</h2>
        <p style={styles.ctaSub}>
          Join the waitlist. We&apos;ll tell you the moment Aevyn goes live.
        </p>
        <div style={styles.ctaForm}>
          <WaitlistForm />
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────── */}
      <footer style={styles.footer}>
        <nav style={styles.footerNav}>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </nav>
        <p style={styles.copyright}>© 2026 Forged Labs LLC</p>
      </footer>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 24px",
  },

  hero: {
    width: "100%",
    maxWidth: "760px",
    textAlign: "center",
    paddingTop: "120px",
    paddingBottom: "64px",
  },
  wordmark: {
    fontSize: "15px",
    color: "var(--av-accent)",
    margin: "0 0 28px",
  },
  heroPromise: {
    fontSize: "clamp(34px, 6vw, 60px)",
    fontWeight: 800,
    lineHeight: 1.08,
    letterSpacing: "-0.02em",
    margin: 0,
  },
  heroSub: {
    fontSize: "clamp(16px, 2.2vw, 19px)",
    color: "var(--av-text-muted)",
    margin: "20px auto 0",
    maxWidth: "440px",
  },

  pillars: {
    width: "100%",
    maxWidth: "1040px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    padding: "32px 0 64px",
  },
  leadIn: {
    gridColumn: "1 / -1",
    textAlign: "center",
    margin: "0 auto 24px",
    maxWidth: "560px",
  },
  leadInText: {
    fontSize: "clamp(17px, 2.4vw, 21px)",
    lineHeight: 1.5,
    color: "var(--av-text-muted)",
    margin: 0,
  },
  pillarCard: {
    position: "relative",
    background: "var(--av-surface)",
    border: "1px solid var(--av-border)",
    borderRadius: "16px",
    padding: "26px 22px 28px",
  },
  pillarIcon: {
    display: "block",
    width: "40px",
    height: "40px",
    objectFit: "contain",
    marginBottom: "16px",
  },
  pillarName: {
    fontSize: "20px",
    fontWeight: 800,
    margin: "0 0 8px",
    letterSpacing: "0.02em",
  },
  pillarBlurb: {
    fontSize: "14.5px",
    lineHeight: 1.5,
    color: "var(--av-text-muted)",
    margin: 0,
  },

  shots: {
    width: "100%",
    maxWidth: "1040px",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "24px",
    padding: "16px 0 72px",
  },
  shot: {
    width: "min(280px, 70vw)",
    height: "auto",
    borderRadius: "32px",
    boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
  },

  cta: {
    width: "100%",
    maxWidth: "560px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px 0 96px",
  },
  ctaHeading: {
    fontSize: "clamp(26px, 4vw, 36px)",
    fontWeight: 800,
    margin: 0,
    letterSpacing: "-0.01em",
  },
  ctaSub: {
    fontSize: "16px",
    color: "var(--av-text-muted)",
    margin: "14px 0 28px",
    maxWidth: "400px",
  },
  ctaForm: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },

  footer: {
    width: "100%",
    maxWidth: "1040px",
    borderTop: "1px solid var(--av-border)",
    padding: "32px 0 56px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "14px",
  },
  footerNav: {
    display: "flex",
    gap: "24px",
    fontSize: "14px",
  },
  copyright: {
    color: "var(--av-text-faint)",
    fontSize: "13px",
    margin: 0,
  },
};
