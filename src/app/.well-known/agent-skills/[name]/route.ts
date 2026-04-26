import { findSkill, SKILLS } from "@/lib/agent-skills";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return SKILLS.map((s) => ({ name: `${s.name}.md` }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  const slug = name.replace(/\.md$/i, "");
  const skill = findSkill(slug);
  if (!skill) {
    return new Response("Not found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  return new Response(skill.body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
