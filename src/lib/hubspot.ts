export const HUBSPOT_PORTAL_ID = "8604504";
export const HUBSPOT_FORM_ID = "d074772f-87b1-4c61-867f-d724e150159b";

export type QuoteFields = {
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  phone: string;
  comment: string;
};

function readHutk(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export async function submitQuoteToHubSpot(fields: QuoteFields): Promise<void> {
  const hutk = readHutk();
  const res = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: (
          [
            ["0-1", "firstname", fields.firstname],
            ["0-1", "lastname", fields.lastname],
            ["0-1", "email", fields.email],
            ["0-1", "company", fields.company],
            ["0-1", "phone", fields.phone],
            ["0-5", "comment", fields.comment],
          ] as const
        )
          .filter(([, , v]) => v && v.trim().length > 0)
          .map(([objectTypeId, name, value]) => ({ objectTypeId, name, value })),
        context: {
          pageUri: typeof window !== "undefined" ? window.location.href : "",
          pageName: typeof document !== "undefined" ? document.title : "",
          ...(hutk ? { hutk } : {}),
        },
      }),
    },
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HubSpot ${res.status}: ${text || res.statusText}`);
  }
}
