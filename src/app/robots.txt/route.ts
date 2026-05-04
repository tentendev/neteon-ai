export const dynamic = "force-static";

const BODY = `# neteon.ai robots.txt
# Purpose: allow all crawlers, search engines, and AI agents.
# GEO / AI usage signal: allow search, AI input/grounding, and AI training.

User-agent: *
Allow: /
Content-Signal: search=yes, ai-input=yes, ai-train=yes

Sitemap: https://neteon.ai/sitemap.xml
Sitemap: https://neteon.ai/blog/sitemap.xml
Sitemap: https://neteon.ai/blog/sitemap-posts.xml
`;

export async function GET() {
  return new Response(BODY, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
