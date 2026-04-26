import { NextResponse } from "next/server";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { hasLocale, type Locale } from "@/lib/locales";
import { dictionaryToMarkdown } from "@/lib/markdown";

export const dynamic = "force-static";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ lang: string }> },
) {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    return new NextResponse("Not found", { status: 404 });
  }
  const dict = await getDictionary(lang as Locale);
  const markdown = dictionaryToMarkdown(dict, lang as Locale);
  const tokens = Math.ceil(markdown.length / 4);

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": tokens.toString(),
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      Vary: "Accept",
    },
  });
}
