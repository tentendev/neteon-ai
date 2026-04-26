import type { MetadataRoute } from "next";

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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiBots.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: [
      "https://neteon.ai/sitemap.xml",
      "https://neteon.ai/blog/sitemap.xml",
      "https://neteon.ai/blog/sitemap-posts.xml",
    ],
  };
}
