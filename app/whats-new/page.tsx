import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import notes from "./notes.json";

/**
 * AEVYN — What's new (aevyn.io/whats-new)
 *
 * Renders the SAME release notes the app shows in-app. Source of truth is
 * aevyn-app/constants/releaseNotes.js; refresh notes.json with
 * `npm run sync:release-notes`. Screenshots live in public/whats-new/<id>/<n>.png
 * and are only rendered if the file exists at build time.
 */

export const metadata: Metadata = {
  title: "What's new — AEVYN",
  description: "The latest improvements to the AEVYN app.",
};

type Screenshot = { url: string; alt?: string };
type ReleaseNote = {
  id: string;
  date: string;
  title: string;
  bullets: string[];
  screenshots?: Screenshot[];
};

// Notes carry absolute aevyn.io URLs (the app loads them remotely). On the site,
// serve them from /public so they also work on preview deployments.
function sitePath(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?aevyn\.io/, "");
}

function hasFile(path: string): boolean {
  return existsSync(join(process.cwd(), "public", path));
}

function formatDate(ymd: string): string {
  return new Date(`${ymd}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function WhatsNew() {
  const entries = (notes as ReleaseNote[]).map((n) => ({
    ...n,
    shots: (n.screenshots ?? [])
      .map((s) => ({ src: sitePath(s.url), alt: s.alt ?? "" }))
      .filter((s) => hasFile(s.src)),
  }));

  return (
    <main style={styles.page}>
      <header style={styles.hero}>
        <Link href="/" className="av-wordmark" style={styles.wordmark}>
          AEVYN
        </Link>
        <h1 style={styles.heading}>What&apos;s new</h1>
        <p style={styles.sub}>The latest improvements to Aevyn.</p>
      </header>

      <section style={styles.list} aria-label="Release notes">
        {entries.map((n) => (
          <article key={n.id} id={n.id} style={styles.card}>
            <time dateTime={n.date} style={styles.date}>
              {formatDate(n.date)}
            </time>
            <h2 style={styles.title}>{n.title}</h2>
            <ul style={styles.bullets}>
              {n.bullets.map((b) => (
                <li key={b} style={styles.bullet}>
                  <span aria-hidden="true" style={styles.dot} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {n.shots.length > 0 && (
              <div style={styles.shots}>
                {n.shots.map((s) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={s.src}
                    src={s.src}
                    alt={s.alt}
                    loading="lazy"
                    style={styles.shot}
                  />
                ))}
              </div>
            )}
          </article>
        ))}
      </section>

      <footer style={styles.footer}>
        <nav style={styles.footerNav}>
          <Link href="/">Home</Link>
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
    maxWidth: "720px",
    textAlign: "center",
    paddingTop: "96px",
    paddingBottom: "40px",
  },
  wordmark: {
    display: "inline-block",
    fontSize: "15px",
    color: "var(--av-accent)",
    margin: "0 0 28px",
    textDecoration: "none",
  },
  heading: {
    fontSize: "clamp(32px, 5.5vw, 52px)",
    fontWeight: 800,
    lineHeight: 1.08,
    letterSpacing: "-0.02em",
    margin: 0,
  },
  sub: {
    fontSize: "clamp(16px, 2.2vw, 18px)",
    color: "var(--av-text-muted)",
    margin: "16px auto 0",
  },

  list: {
    width: "100%",
    maxWidth: "720px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    paddingBottom: "72px",
  },
  card: {
    background: "var(--av-surface)",
    border: "1px solid var(--av-border)",
    borderTop: "3px solid var(--av-accent)",
    borderRadius: "16px",
    padding: "26px 24px 28px",
    backgroundImage:
      "radial-gradient(120% 60% at 50% 0%, var(--av-glow-spirit), transparent 70%)",
    minWidth: 0,
  },
  date: {
    display: "block",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--av-accent)",
  },
  title: {
    fontSize: "22px",
    fontWeight: 800,
    margin: "6px 0 16px",
    letterSpacing: "-0.01em",
  },
  bullets: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  bullet: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
    fontSize: "15.5px",
    lineHeight: 1.55,
    color: "var(--av-text-muted)",
  },
  dot: {
    flex: "0 0 auto",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "var(--av-accent)",
    marginTop: "9px",
  },
  shots: {
    display: "flex",
    gap: "12px",
    overflowX: "auto",
    marginTop: "20px",
    paddingBottom: "4px",
  },
  shot: {
    height: "320px",
    width: "auto",
    flex: "0 0 auto",
    borderRadius: "20px",
    border: "1px solid var(--av-border)",
    boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
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
