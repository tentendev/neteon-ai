import type { Dictionary } from "@/types/dictionary";
import type { Locale } from "@/lib/locales";

const SITE_URL = "https://neteon.ai";

export function dictionaryToMarkdown(dict: Dictionary, locale: Locale): string {
  const productItems = dict.products.items;
  const solutionItems = dict.solutions.items;
  const whyCards = dict.why.cards;
  const edgeRows = dict.edgeAccordion.rows;
  const platformRows = dict.platformAccordion.rows;

  const lines: string[] = [
    `# ${dict.meta.title}`,
    "",
    `> ${dict.meta.description}`,
    "",
    `- Site: ${SITE_URL}/${locale}`,
    `- Locale: ${locale}`,
    `- Industrial PC Catalog: https://ipc.neteon.net`,
    `- Corporate site: https://www.neteon.net`,
    "",
    "---",
    "",
    `## ${dict.hero.titleLine1} ${dict.hero.titleLine2Emphasis}`,
    "",
    `*${dict.hero.eyebrow}*`,
    "",
    dict.hero.sub,
    "",
    dict.hero.distributorLine,
    "",
    "**Capabilities:** " +
      [dict.hero.chips.jetson, dict.hero.chips.temp, dict.hero.chips.milstd, dict.hero.chips.pcie].join(" · "),
    "",
    "---",
    "",
    `## ${dict.edgeAccordion.eyebrow}`,
    "",
    `### ${edgeRows.rugged.title}`,
    "",
    edgeRows.rugged.body,
    "",
    `### ${edgeRows.gpu.title}`,
    "",
    edgeRows.gpu.body,
    "",
    `### ${edgeRows.jetson.title}`,
    "",
    edgeRows.jetson.body,
    "",
    "---",
    "",
    `## ${dict.products.tag} — ${dict.products.titleLine1} ${dict.products.titleLine2}`,
    "",
    dict.products.sub,
    "",
  ];

  for (const item of Object.values(productItems)) {
    lines.push(`### ${item.name} *(${item.tag})*`);
    lines.push("");
    lines.push(item.description);
    lines.push("");
    lines.push(`**Specs:** ${item.specs.join(" · ")}`);
    lines.push("");
  }

  lines.push("---", "");
  lines.push(`## ${dict.platformAccordion.eyebrow}`, "");
  lines.push(`### ${platformRows.networking.title}`, "", platformRows.networking.body, "");
  lines.push(`### ${platformRows.storage.title}`, "", platformRows.storage.body, "");
  lines.push(`### ${platformRows.compact.title}`, "", platformRows.compact.body, "");

  lines.push("---", "");
  lines.push(`## ${dict.solutions.tag} — ${dict.solutions.titleLine1} ${dict.solutions.titleLine2}`, "");
  lines.push(dict.solutions.sub, "");
  for (const item of Object.values(solutionItems)) {
    lines.push(`- **${item.name}** — ${item.description}`);
  }
  lines.push("");

  lines.push("---", "");
  lines.push(`## ${dict.why.tag} — ${dict.why.titleLine1} ${dict.why.titleLine2}`, "");
  lines.push(dict.why.sub, "");
  for (const card of Object.values(whyCards)) {
    lines.push(`### ${card.title} *(${card.eyebrow})*`, "", card.body, "");
  }

  lines.push("---", "");
  lines.push(`## ${dict.testimonials.titleLine1} ${dict.testimonials.titleLine2}`, "");
  for (const t of dict.testimonials.items) {
    lines.push(`> ${t.quote}`, ">", `> — ${t.author}, ${t.role}`, "");
  }

  lines.push("---", "");
  lines.push(`## ${dict.contact.tag} — ${dict.contact.title}`, "");
  lines.push(dict.contact.sub, "");
  lines.push(`- ${dict.footer.phoneMain}`);
  lines.push(`- ${dict.footer.phoneTollFree}`);
  lines.push(`- Email: ipc@neteon.net`);
  lines.push("");

  lines.push("---", "");
  lines.push("## Resources", "");
  lines.push(`- [Industrial Insights Blog](${SITE_URL}/blog)`);
  lines.push(`- [Privacy Policy](${SITE_URL}/${locale}/privacy)`);
  lines.push(`- [Cookie Policy](${SITE_URL}/${locale}/cookies)`);
  lines.push(`- [Sitemap](${SITE_URL}/sitemap.xml)`);
  lines.push("");

  return lines.join("\n");
}
