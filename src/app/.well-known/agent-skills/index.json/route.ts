import { SKILLS, sha256Hex } from "@/lib/agent-skills";

export const dynamic = "force-static";

const SITE = "https://neteon.ai";

export async function GET() {
  const body = {
    $schema: "https://agentskills.io/schemas/v0.2.0/index.schema.json",
    name: "Neteon.ai Agent Skills",
    description:
      "Skills published by neteon.ai for AI agents discovering Neteon's industrial PC and Edge AI catalog.",
    version: "0.2.0",
    publisher: {
      name: "Neteon Technologies, Inc.",
      url: SITE,
      contact: "mailto:ipc@neteon.net",
    },
    skills: SKILLS.map((s) => ({
      name: s.name,
      type: "skill",
      description: s.description,
      url: `${SITE}/.well-known/agent-skills/${s.name}.md`,
      sha256: sha256Hex(s.body),
      mediaType: "text/markdown",
    })),
  };

  return new Response(JSON.stringify(body, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
