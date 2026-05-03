import { NextRequest, NextResponse } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/config";

// Next.js 16: middleware was renamed to "proxy.ts" at the project root.
// This proxy redirects "/" to a locale-prefixed URL based on the
// Accept-Language header. All other paths are passed through.

function pickLocale(req: NextRequest): string {
  const header = req.headers.get("accept-language") ?? "";
  const candidates = header
    .split(",")
    .map((part) => {
      const [tag, qPart] = part.trim().split(";");
      const q = qPart?.startsWith("q=") ? parseFloat(qPart.slice(2)) : 1;
      return { lang: tag.toLowerCase().split("-")[0], q: isNaN(q) ? 1 : q };
    })
    .sort((a, b) => b.q - a.q);

  for (const c of candidates) {
    if ((LOCALES as readonly string[]).includes(c.lang)) return c.lang;
  }
  return DEFAULT_LOCALE;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    const locale = pickLocale(req);
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
