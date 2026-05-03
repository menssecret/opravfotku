import "./globals.css";

// Root layout: only passes children through.
// The actual <html> + <body> is rendered by [locale]/layout.tsx
// so we can set lang attribute server-side per locale.

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}