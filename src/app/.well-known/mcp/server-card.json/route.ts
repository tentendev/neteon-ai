import { MCP_SERVER_INFO, MCP_PROTOCOL_VERSION, SERVER_CAPABILITIES } from "@/lib/mcp/server";

export const dynamic = "force-static";

const SITE = "https://neteon.ai";

export async function GET() {
  const card = {
    $schema:
      "https://raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/main/schema/server-card.schema.json",
    serverInfo: MCP_SERVER_INFO,
    protocolVersion: MCP_PROTOCOL_VERSION,
    description:
      "Read-only MCP server for the Neteon.ai industrial PC and Edge AI marketing site.",
    homepage: SITE,
    publisher: {
      name: "Neteon Technologies, Inc.",
      url: SITE,
      contact: "mailto:ipc@neteon.net",
    },
    transport: {
      type: "http",
      url: `${SITE}/api/mcp`,
    },
    transports: [
      {
        type: "http",
        url: `${SITE}/api/mcp`,
        description: "Streamable HTTP (JSON-RPC POST)",
      },
    ],
    capabilities: SERVER_CAPABILITIES,
    authentication: { type: "none" },
    skills: `${SITE}/.well-known/agent-skills/index.json`,
  };

  return new Response(JSON.stringify(card, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
