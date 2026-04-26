export const dynamic = "force-static";

const SITE = "https://neteon.ai";

export async function GET() {
  const linkset = {
    linkset: [
      {
        anchor: `${SITE}/api/md`,
        "service-desc": [
          {
            href: `${SITE}/openapi.yaml`,
            type: "application/yaml",
            title: "Neteon.ai Public Web API — OpenAPI 3.1",
          },
        ],
        "service-doc": [
          {
            href: `${SITE}/openapi.yaml`,
            type: "application/yaml",
            title: "OpenAPI specification",
          },
          {
            href: "https://github.com/tentendev/neteon-ai",
            type: "text/html",
            title: "Source repository",
          },
        ],
        "service-meta": [
          {
            href: `${SITE}/.well-known/api-catalog`,
            type: "application/linkset+json",
            title: "RFC 9727 API catalog",
          },
        ],
        status: [
          {
            href: `${SITE}/api/health`,
            type: "application/json",
            title: "Health check",
          },
        ],
        author: [
          {
            href: "mailto:ipc@neteon.net",
            title: "Neteon Technologies",
          },
        ],
        license: [
          {
            href: `${SITE}/en/privacy`,
            type: "text/html",
            title: "Privacy Policy",
          },
        ],
      },
    ],
  };

  return new Response(JSON.stringify(linkset, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/linkset+json",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
      Link: '<https://www.rfc-editor.org/rfc/rfc9727>; rel="profile"',
    },
  });
}
