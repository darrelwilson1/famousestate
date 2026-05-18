import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maison Noir — Private Listings & Off-Market Estates",
  description:
    "An invitation-only collective for buyers and sellers of the world's most discreet residences. Off-market estates, private listings, and bespoke representation.",
  openGraph: {
    title: "Maison Noir — Private Listings & Off-Market Estates",
    description:
      "An invitation-only collective for buyers and sellers of the world's most discreet residences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans bg-bone text-ink">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
