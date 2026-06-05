import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aevyn",
  description:
    "Aevyn — a personal wellness and habit-tracking app by Forged Labs LLC.",
  metadataBase: new URL("https://aevyn.io"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
