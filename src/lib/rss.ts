export type BlogPost = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  author: string;
  category: string;
  image: string | null;
};

const FEED_URL = "https://neteon.ai/blog/rss/";
const REVALIDATE_SECONDS = 3600;

export async function fetchBlogPosts(limit = 10): Promise<BlogPost[]> {
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { "User-Agent": "NeteonSite/1.0 (+https://neteon.net)" },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseFeed(xml).slice(0, limit);
  } catch {
    return [];
  }
}

function parseFeed(xml: string): BlogPost[] {
  const items: BlogPost[] = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m: RegExpExecArray | null;
  while ((m = itemRe.exec(xml)) !== null) {
    const raw = m[1];
    items.push({
      title: pickCdata(raw, "title"),
      link: pickText(raw, "link"),
      description: stripTags(pickCdata(raw, "description")),
      pubDate: pickText(raw, "pubDate"),
      author: pickCdata(raw, "dc:creator"),
      category: firstCategory(raw),
      image: pickMediaImage(raw) ?? pickFirstImgInContent(raw),
    });
  }
  return items;
}

function pickCdata(src: string, tag: string): string {
  const re = new RegExp(`<${escapeTag(tag)}(?:\\s[^>]*)?>\\s*(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))\\s*<\\/${escapeTag(tag)}>`);
  const mm = src.match(re);
  if (!mm) return "";
  return decodeEntities((mm[1] ?? mm[2] ?? "").trim());
}

function pickText(src: string, tag: string): string {
  const re = new RegExp(`<${escapeTag(tag)}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapeTag(tag)}>`);
  const mm = src.match(re);
  return mm ? decodeEntities(mm[1].trim()) : "";
}

function firstCategory(src: string): string {
  const mm = src.match(/<category>\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*<\/category>/);
  return mm ? mm[1].trim() : "";
}

function pickMediaImage(src: string): string | null {
  const mm = src.match(/<media:content[^>]*\burl=["']([^"']+)["']/);
  return mm ? mm[1] : null;
}

function pickFirstImgInContent(src: string): string | null {
  const block = src.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/);
  const body = block ? block[1] : src;
  const mm = body.match(/<img[^>]+src=["']([^"']+)["']/i);
  return mm ? mm[1] : null;
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function escapeTag(tag: string): string {
  return tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#x2014;/g, "—")
    .replace(/&#x2013;/g, "–")
    .replace(/&#x2019;/g, "’")
    .replace(/&#x201C;/g, "“")
    .replace(/&#x201D;/g, "”")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)));
}
