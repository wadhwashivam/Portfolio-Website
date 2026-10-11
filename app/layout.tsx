import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-inter-tight",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const siteTitle = "Shivam Wadhwa — Full-stack developer";
const siteDescription =
  "Full-stack developer in Ontario building web apps end to end with React, Node.js and PostgreSQL.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: "%s — Shivam Wadhwa" },
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName: "Shivam Wadhwa",
    locale: "en_CA",
    title: siteTitle,
    description: siteDescription,
  },
};

export const viewport: Viewport = { themeColor: "#EDEDED" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={interTight.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2 focus:text-xs"
        >
          Skip to content
        </a>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}