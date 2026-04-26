import { handleRpc, type JsonRpcResponse } from "@/lib/mcp/server";

export const dynamic = "force-dynamic";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Mcp-Session-Id, Mcp-Protocol-Version",
  "Access-Control-Expose-Headers": "Mcp-Session-Id, Mcp-Protocol-Version",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET() {
  return new Response("Method Not Allowed. POST a JSON-RPC 2.0 request.", {
    status: 405,
    headers: { ...corsHeaders, Allow: "POST, OPTIONS", "Content-Type": "text/plain" },
  });
}

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return Response.json(
      { jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } },
      { status: 400, headers: corsHeaders },
    );
  }

  const responses: JsonRpcResponse[] = [];
  const requests = Array.isArray(payload) ? payload : [payload];

  for (const r of requests) {
    if (!r || typeof r !== "object" || (r as { jsonrpc?: string }).jsonrpc !== "2.0") {
      responses.push({
        jsonrpc: "2.0",
        id: null,
        error: { code: -32600, message: "Invalid Request" },
      });
      continue;
    }
    const res = await handleRpc(r as never);
    if (res) responses.push(res);
  }

  if (responses.length === 0) {
    return new Response(null, { status: 202, headers: corsHeaders });
  }

  const body = Array.isArray(payload) ? responses : responses[0];
  return Response.json(body, {
    status: 200,
    headers: { ...corsHeaders, "Mcp-Protocol-Version": "2025-06-18" },
  });
}
