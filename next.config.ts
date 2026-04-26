import type { NextConfig } from "next";

const linkHeader = [
  '<https://neteon.ai/sitemap.xml>; rel="sitemap"; type="application/xml"',
  '<https://neteon.ai/robots.txt>; rel="describedby"; type="text/plain"',
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
