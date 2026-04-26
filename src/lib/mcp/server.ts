import { getDictionary } from "@/app/[lang]/dictionaries";
import { hasLocale, SUPPORTED_LOCALES, type Locale } from "@/lib/locales";
import { dictionaryToMarkdown } from "@/lib/markdown";

export const MCP_SERVER_INFO = {
  name: "neteon-ai",
  title: "Neteon.ai",
  version: "1.0.0",
} as const;

export const MCP_PROTOCOL_VERSION = "2025-06-18";

type Tool = {
  name: string;
  title: string;
  description: string;
  inputSchema: Record<string, unknown>;
  handler: (args: Record<string, unknown>) => Promise<{
    content: Array<{ type: "text"; text: string }>;
    isError?: boolean;
  }>;
};

const tools: Tool[] = [
  {
    name: "get_home_markdown",
    title: "Get home page (markdown)",
    description:
      "Return the Neteon.ai home page content as markdown for the requested locale.",
    inputSchema: {
      type: "object",
      properties: {
        lang: {
          type: "string",
          enum: SUPPORTED_LOCALES as readonly string[],
          description: "Two-letter locale code.",
          default: "en",
        },
      },
      additionalProperties: false,
    },
    handler: async (args) => {
      const lang = (args.lang as string | undefined) ?? "en";
      if (!hasLocale(lang)) {
        return {
          content: [{ type: "text", text: `Unknown locale: ${lang}` }],
          isError: true,
        };
      }
      const dict = await getDictionary(lang as Locale);
      return {
        content: [{ type: "text", text: dictionaryToMarkdown(dict, lang as Locale) }],
      };
    },
  },
  {
    name: "list_products",
    title: "List products",
    description:
      "List Neteon's industrial computing product families with descriptions and key specs.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    handler: async () => {
      const dict = await getDictionary("en");
      const lines = ["# Neteon product families", ""];
      for (const item of Object.values(dict.products.items)) {
        lines.push(`## ${item.name} (${item.tag})`);
        lines.push("");
        lines.push(item.description);
        lines.push("");
        lines.push(`**Specs:** ${item.specs.join(" · ")}`);
        lines.push("");
      }
      return { content: [{ type: "text", text: lines.join("\n") }] };
    },
  },
  {
    name: "get_contact_info",
    title: "Get contact info",
    description:
      "Return Neteon's sales, support, and engineering contact channels.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    handler: async () => {
      const text = [
        "# Neteon contact",
        "",
        "- Email: ipc@neteon.net",
        "- Phone (Main): +1 732-568-1988",
        "- Phone (Toll Free): +1 888-908-3330",
        "- Quote form: https://neteon.ai/en",
        "- Industrial PC store: https://ipc.neteon.net",
        "- Corporate site: https://www.neteon.net",
        "",
        "Reply commitment: one business day.",
      ].join("\n");
      return { content: [{ type: "text", text }] };
    },
  },
];

const toolsForListing = tools.map(({ handler: _h, ...rest }) => rest);

type JsonRpcRequest = {
  jsonrpc: "2.0";
  id?: number | string | null;
  method: string;
  params?: Record<string, unknown>;
};

type JsonRpcSuccess = {
  jsonrpc: "2.0";
  id: number | string | null;
  result: unknown;
};

type JsonRpcError = {
  jsonrpc: "2.0";
  id: number | string | null;
  error: { code: number; message: string; data?: unknown };
};

export type JsonRpcResponse = JsonRpcSuccess | JsonRpcError;

function ok(id: number | string | null | undefined, result: unknown): JsonRpcSuccess {
  return { jsonrpc: "2.0", id: id ?? null, result };
}

function err(
  id: number | string | null | undefined,
  code: number,
  message: string,
  data?: unknown,
): JsonRpcError {
  return { jsonrpc: "2.0", id: id ?? null, error: { code, message, data } };
}

export const SERVER_CAPABILITIES = {
  tools: { listChanged: false },
} as const;

export async function handleRpc(req: JsonRpcRequest): Promise<JsonRpcResponse | null> {
  switch (req.method) {
    case "initialize":
      return ok(req.id, {
        protocolVersion: MCP_PROTOCOL_VERSION,
        capabilities: SERVER_CAPABILITIES,
        serverInfo: MCP_SERVER_INFO,
        instructions:
          "Read-only MCP server for Neteon.ai. Use list_products and get_home_markdown to ground responses about industrial PC and Edge AI products.",
      });

    case "notifications/initialized":
    case "notifications/cancelled":
      return null;

    case "ping":
      return ok(req.id, {});

    case "tools/list":
      return ok(req.id, { tools: toolsForListing });

    case "tools/call": {
      const params = req.params ?? {};
      const name = params.name as string | undefined;
      const args = (params.arguments as Record<string, unknown> | undefined) ?? {};
      const tool = tools.find((t) => t.name === name);
      if (!tool) return err(req.id, -32602, `Unknown tool: ${name}`);
      try {
        const result = await tool.handler(args);
        return ok(req.id, result);
      } catch (e) {
        return err(req.id, -32603, "Tool execution failed", String(e));
      }
    }

    default:
      return err(req.id, -32601, `Method not found: ${req.method}`);
  }
}
