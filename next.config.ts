import type { NextConfig } from "next";

const linkHeader = [
  '<https://neteon.ai/sitemap.xml>; rel="sitemap"; type="application/xml"',
  '<https://neteon.ai/robots.txt>; rel="describedby"; type="text/plain"',
  '<https://neteon.ai/.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '<https://neteon.ai/.well-known/mcp/server-card.json>; rel="https://modelcontextprotocol.io/server-card"; type="application/json"',
  '<https://neteon.ai/.well-known/agent-skills/index.json>; rel="https://agentskills.io/index"; type="application/json"',
  '<https://neteon.ai/openapi.yaml>; rel="service-desc"; type="application/yaml"',
  '<https://neteon.ai/api/health>; rel="status"; type="application/json"',
  '<https://neteon.ai/en/privacy>; rel="privacy-policy"',
  '<https://neteon.ai/en/cookies>; rel="license"',
  '<https://www.neteon.net>; rel="canonical"',
  '<https://ipc.neteon.net>; rel="service-doc"; title="Industrial PC Catalog"',
  '<mailto:ipc@neteon.net>; rel="author"',
].join(", ");

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Link", value: linkHeader }],
      },
    ];
  },
};

export default nextConfig;
