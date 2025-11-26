import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Grenze } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

const _grenze = Grenze({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grenze",
});
const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI-Powered Supply Chain Dashboard",
  description: "Created with v0",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/favicon.svg", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", sizes: "48x48", type: "image/png" },
      { url: "/favicon.svg", type: "image/x-icon" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon with explicit width and height */}
        <link rel="icon" href="/favicon.svg" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon.svg" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon.svg" sizes="48x48" type="image/png" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />

        <meta name="description" content={metadata.description} />
        <meta name="generator" content={metadata.generator} />
        <title>{metadata.title}</title>
      </head>
      <body className={`font-serif antialiased ${_grenze.variable} ${_geist.variable}`}>
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
