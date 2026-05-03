import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Oprav fotku",
    template: "%s · Oprav fotku",
  },
  description: "Uprav fotku pomocí jednoho promptu. Bez vrstev, bez pravítek.",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Oprav fotku",
    description:
      "Uprav fotku pomocí jednoho promptu. Bez vrstev, bez pravítek.",
    type: "website",
    locale: "cs_CZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs" className={`${geist.variable} ${instrument.variable}`}>
      <body className="antialiased relative z-0 flex min-h-screen flex-col">
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
