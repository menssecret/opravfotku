import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
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
  icons: {
    icon: [{ url: "/logo-amber.svg", type: "image/svg+xml" }],
    apple: { url: "/logo-amber.svg" },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "opravfotku",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0c0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${geist.variable} ${instrument.variable}`}>
      <body className="antialiased relative z-0 flex min-h-screen flex-col">
        {children}
      </body>
    </html>
  );
}
