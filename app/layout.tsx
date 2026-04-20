import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "opravfotku.cz – AI oprava fotografií online",
  description:
    "Oprava starých a poškozených fotografií online. Obarvení černobílých snímků, odstranění škrábanců a zlepšení kvality pomocí AI.",
  keywords: [
    "oprava fotografií",
    "AI oprava fotek",
    "obarvení černobílých fotografií",
    "vylepšení kvality fotografií",
    "obnova starých fotek",
    "opravfotku.cz",
  ],
  openGraph: {
    title: "opravfotku.cz – AI oprava fotografií online",
    description:
      "Nahrajte fotografii a nechte ji opravit. Odstranění poškození, obarvení černobílých snímků a zlepšení kvality.",
    url: "https://opravfotku.vercel.app",
    siteName: "opravfotku.cz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "opravfotku.cz – AI oprava fotografií online",
    description:
      "Jednoduchá online AI oprava fotografií pro desktop i mobil.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}