import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = "https://wanderlouge.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Wanderlouge | Travel Diaries of Darshan R",
    template: "%s | Wanderlouge",
  },
  description:
    "Wanderlouge is a travel journal by Darshan R, featuring stories, roads, food, and quiet moments documented one journey at a time.",
  keywords: [
    "Wanderlouge",
    "travel journal",
    "travel blog India",
    "Darshan R",
    "Karnataka travel",
    "India travel stories",
  ],
  authors: [{ name: "Darshan R." }],
  creator: "Darshan R.",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Wanderlouge",
    title: "Wanderlouge | Travel Diaries of Darshan R",
    description:
      "A collection of destinations, roads, experiences, and moments, documented along the way, one journey at a time.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wanderlouge | Travel Diaries of Darshan R",
    description:
      "A collection of destinations, roads, experiences, and moments, documented along the way, one journey at a time.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: "#0d2b21",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white-warm text-forest">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-forest focus:px-4 focus:py-2 focus:text-sm focus:text-white-warm"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
