import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Inter, full weight range — the wordmark uses Black (800).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AEVYN",
  description:
    "AEVYN — a personal wellness and habit-tracking app by Forged Labs LLC.",
  metadataBase: new URL("https://aevyn.io"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
