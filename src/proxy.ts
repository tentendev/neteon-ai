import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "@/lib/locales";

function pickLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const requested = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase());
  for (const tag of requested) {
    const primary = tag.split("-")[0];
    const match = (SUPPORTED_LOCALES as readonly string[]).find(
      (l) => l === tag || l === primary,
    );
    if (match) return match as Locale;
  }
  return DEFAULT_LOCALE;
}

function prefersMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  let mdQ = -1;
  let htmlQ = -1;
  for (const part of accept.split(",")) {
    const [type, ...params] = part.trim().split(";").map((s) => s.trim());
    const qParam = params.find((p) => p.startsWith("q="));
    const q = qParam ? Number.parseFloat(qParam.slice(2)) : 1;
    if (type === "text/markdown") mdQ = Math.max(mdQ, q);
    else if (type === "text/html") htmlQ = Math.max(htmlQ, q);
  }
  return mdQ > 0 && mdQ >= htmlQ;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accept = request.headers.get("accept");

  const localeMatch = SUPPORTED_LOCALES.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );

  if (localeMatch) {
    if (pathname === `/${localeMatch}` && prefersMarkdown(accept)) {
      const url = request.nextUrl.clone();
      url.pathname = `/api/md/${localeMatch}`;
      const res = NextResponse.rewrite(url);
      res.headers.set("Vary", "Accept");
      return res;
    }
    const res = NextResponse.next();
    res.headers.append("Vary", "Accept");
    return res;
  }

  const locale = pickLocale(request.headers.get("accept-language"));

  if (pathname === "/" && prefersMarkdown(accept)) {
    const url = request.nextUrl.clone();
    url.pathname = `/api/md/${locale}`;
    const res = NextResponse.rewrite(url);
    res.headers.set("Vary", "Accept, Accept-Language");
    return res;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|images|videos|seo|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|webmanifest)).*)",
  ],
};
