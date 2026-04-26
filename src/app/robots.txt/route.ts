export const dynamic = "force-static";

const aiBots = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "GoogleOther",
  "Applebot",
  "Applebot-Extended",
  "Bytespider",
  "Amazonbot",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "FacebookBot",
  "cohere-ai",
  "cohere-training-data-crawler",
  "DuckAssistBot",
  "MistralAI-User",
  "YouBot",
  "PanguBot",
  "Diffbot",
  "ImagesiftBot",
  "Timpibot",
  "Webzio-Extended",
  "AwarioRssBot",
  "AwarioSmartBot",
];

const CONTENT_SIGNAL = "ai-train=no, search=yes, ai-input=no";

export async function GET() {
  const blocks: string[] = [];

  blocks.push(
    [
      "User-agent: *",
      "Allow: /",
      `Content-Signal: ${CONTENT_SIGNAL}`,
    ].join("\n"),
  );

  for (const ua of aiBots) {
    blocks.push(
      [
        `User-agent: ${ua}`,
        "Allow: /",
        `Content-Signal: ${CONTENT_SIGNAL}`,
      ].join("\n"),
    );
  }

  const sitemaps = [
    "https://neteon.ai/sitemap.xml",
    "https://neteon.ai/blog/sitemap.xml",
    "https://neteon.ai/blog/sitemap-posts.xml",
  ];

  const body =
    blocks.join("\n\n") +
    "\n\n" +
    sitemaps.map((s) => `Sitemap: ${s}`).join("\n") +
    "\n";

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
