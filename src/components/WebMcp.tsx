"use client";

import { useEffect } from "react";

type ToolResult = { content: Array<{ type: "text"; text: string }> };

type ProvideContext = (ctx: {
  tools: Array<{
    name: string;
    description: string;
    inputSchema: Record<string, unknown>;
    execute: (args: Record<string, unknown>) => Promise<ToolResult>;
  }>;
}) => void;

declare global {
  interface Navigator {
    modelContext?: { provideContext: ProvideContext };
  }
}

export default function WebMcp({ locale }: { locale: string }) {
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const mc = navigator.modelContext;
    if (!mc?.provideContext) return;

    const tools = [
      {
        name: "open_quote_form",
        description:
          "Open the Neteon hardware quote request form so the user can submit deployment details.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        execute: async () => {
          const trigger = document.querySelector<HTMLElement>(
            '[data-quote-trigger], [href="#quote"], [data-cta="quote"]',
          );
          if (trigger) trigger.click();
          else window.location.hash = "quote";
          return {
            content: [
              {
                type: "text" as const,
                text: "Opened the quote request form.",
              },
            ],
          };
        },
      },
      {
        name: "browse_products",
        description:
          "Scroll the user to the products section listing Neteon's industrial computing portfolio.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        execute: async () => {
          const target =
            document.getElementById("products") ??
            document.querySelector<HTMLElement>('[data-section="products"]');
          target?.scrollIntoView({ behavior: "smooth", block: "start" });
          return {
            content: [
              { type: "text" as const, text: "Scrolled to the products section." },
            ],
          };
        },
      },
      {
        name: "get_home_markdown",
        description:
          "Fetch the marketing home page as markdown for an AI agent to ground its answers.",
        inputSchema: {
          type: "object",
          properties: {
            lang: {
              type: "string",
              description: "Locale code (defaults to the current page locale).",
            },
          },
          additionalProperties: false,
        },
        execute: async (args: Record<string, unknown>) => {
          const lang = (args.lang as string) || locale || "en";
          const res = await fetch(`/api/md/${lang}`, {
            headers: { Accept: "text/markdown" },
          });
          const text = await res.text();
          return { content: [{ type: "text" as const, text }] };
        },
      },
      {
        name: "open_industrial_pc_store",
        description:
          "Open Neteon's Industrial PC store (ipc.neteon.net) where catalog items can be priced and ordered.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        execute: async () => {
          window.open("https://ipc.neteon.net", "_blank", "noopener");
          return {
            content: [
              { type: "text" as const, text: "Opened https://ipc.neteon.net" },
            ],
          };
        },
      },
    ];

    try {
      mc.provideContext({ tools });
    } catch {
      // WebMCP not fully implemented in this browser.
    }
  }, [locale]);

  return null;
}
