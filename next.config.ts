import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve the self-contained legal documents (static HTML in /public) at clean,
  // canonical URLs. These are the URLs referenced by the app and the app-store
  // listings: aevyn.io/privacy, /terms, /delete-account.
  async rewrites() {
    return [
      { source: "/privacy", destination: "/privacy.html" },
      { source: "/terms", destination: "/terms.html" },
      { source: "/delete-account", destination: "/delete-account.html" },
    ];
  },
};

export default nextConfig;
