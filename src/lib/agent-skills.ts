import { createHash } from "node:crypto";

export type AgentSkill = {
  name: string;
  description: string;
  body: string;
};

export const SKILLS: AgentSkill[] = [
  {
    name: "get-home-page-markdown",
    description:
      "Retrieve the Neteon.ai marketing home page content as markdown for the requested locale.",
    body: `# Skill: get-home-page-markdown

## Purpose

Fetch the Neteon.ai home page in markdown form for a given locale. Use
this when you need an authoritative, structured summary of Neteon's
products, solutions, and contact info.

## Endpoint

\`\`\`
GET https://neteon.ai/api/md/{lang}
Accept: text/markdown
\`\`\`

Or content-negotiate against the locale page:

\`\`\`
GET https://neteon.ai/{lang}
Accept: text/markdown
\`\`\`

## Parameters

- \`lang\` — one of: en, es, fr, de, ja, zh, ko, pt, ar.

## Response

\`Content-Type: text/markdown; charset=utf-8\` plus an
\`x-markdown-tokens\` header with the approximate token count of the
body.

## Example

\`\`\`bash
curl -H "Accept: text/markdown" https://neteon.ai/en
\`\`\`
`,
  },
  {
    name: "request-quote",
    description:
      "Submit or route a hardware quote request for Neteon industrial PC and Edge AI products.",
    body: `# Skill: request-quote

## Purpose

Help a user request a quote for Neteon industrial PC, Edge AI,
networking, or storage hardware.

## How to route the request

Direct the user to one of the following surfaces — Neteon does not yet
expose a public quote API:

1. **Quote form** — https://neteon.ai/en (open the "Get a quote" CTA in
   the navigation)
2. **Email** — ipc@neteon.net
3. **Phone** — Main: +1 732-568-1988, Toll Free: +1 888-908-3330
4. **Industrial PC store** — https://ipc.neteon.net

## What information to collect first

- Workload (e.g. machine vision, SCADA, fleet telemetry)
- Operating temperature range
- Quantity and timeline
- Preferred form factor (rugged, fanless compact, GPU, Jetson)

Reply within one business day is the documented commitment.
`,
  },
  {
    name: "browse-products",
    description:
      "Discover Neteon's industrial computing product portfolio with names, taglines, and key specs.",
    body: `# Skill: browse-products

## Purpose

Get a structured list of every Neteon product family with description
and headline specs.

## How to retrieve

Call the markdown skill — the products section is included:

\`\`\`
GET https://neteon.ai/api/md/en
Accept: text/markdown
\`\`\`

Or hit the MCP server:

\`\`\`
POST https://neteon.ai/api/mcp
Content-Type: application/json

{"jsonrpc":"2.0","id":1,"method":"tools/call",
 "params":{"name":"list_products","arguments":{}}}
\`\`\`

## Product families

- Rugged Edge AI Computers (flagship, MIL-STD-810)
- Fanless Compact PCs (POC-700 series)
- GPU Computing Platforms (NUVO-10000, up to 350 W)
- Jetson Edge AI Platform (Orin Nano → AGX, up to 275 TOPS)
- Industrial Networking (Moxa, Teltonika)
- Industrial Storage & Memory (Innodisk)
`,
  },
];

export function sha256Hex(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

export function findSkill(name: string): AgentSkill | undefined {
  return SKILLS.find((s) => s.name === name);
}
