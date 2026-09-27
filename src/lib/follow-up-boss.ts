import { siteIdentity } from "@/lib/site-contact";

/** FUB source/system/tag — must match the live site domain for lead attribution */
const FUB_SYSTEM = siteIdentity.domain.toLowerCase();

export type FubEventType =
  | "General Inquiry"
  | "Seller Inquiry"
  | "Property Inquiry"
  | "Registration";

export type ContactLeadInput = {
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  sourceUrl?: string;
  formName: string;
  pagePath: string;
  type?: FubEventType;
};

export type FubSendResult =
  | { ok: true }
  | { ok: false; reason: "missing_key" }
  | { ok: false; reason: "fub_error"; status: number }
  | { ok: false; reason: "network" };

export function validateContactLead(input: {
  name?: string;
  email?: string;
  phone?: string;
}): string | null {
  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const phone = input.phone?.trim() ?? "";

  if (!name) {
    return "Missing required fields";
  }
  if (!email && !phone) {
    return "Missing required fields";
  }
  return null;
}

function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ");
  return { firstName, lastName };
}

export function buildFubEventBody(input: ContactLeadInput) {
  const { firstName, lastName } = splitName(input.name);
  const type = input.type ?? "General Inquiry";
  const fieldLines = [
    input.email ? `Email: ${input.email}` : null,
    input.phone ? `Phone: ${input.phone}` : null,
  ].filter(Boolean);

  const messageBody = [input.message?.trim(), fieldLines.join("\n")]
    .filter((part) => part && part.length > 0)
    .join("\n\n");

  const message = messageBody || "Contact form submission";

  return {
    source: FUB_SYSTEM,
    system: FUB_SYSTEM,
    type,
    message,
    description: `${input.formName} — ${input.pagePath}`,
    sourceUrl: input.sourceUrl,
    person: {
      firstName,
      lastName,
      emails: input.email ? [{ value: input.email }] : [],
      phones: input.phone ? [{ value: input.phone }] : [],
      tags: [FUB_SYSTEM, input.formName],
    },
  };
}

export async function sendContactLeadToFub(
  input: ContactLeadInput,
  fetchImpl: typeof fetch = fetch,
): Promise<FubSendResult> {
  const apiKey = process.env.FOLLOW_UP_BOSS_API_KEY?.trim();
  if (!apiKey) {
    console.error(
      "FOLLOW_UP_BOSS_API_KEY is not set; cannot send leads to Follow Up Boss.",
    );
    return { ok: false, reason: "missing_key" };
  }

  const body = buildFubEventBody(input);
  const auth = Buffer.from(`${apiKey}:`, "utf8").toString("base64");

  try {
    const response = await fetchImpl("https://api.followupboss.com/v1/events", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
        "X-System": FUB_SYSTEM,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error(`Follow Up Boss API responded with status ${response.status}`);
      return { ok: false, reason: "fub_error", status: response.status };
    }

    return { ok: true };
  } catch {
    console.error("Follow Up Boss API request failed");
    return { ok: false, reason: "network" };
  }
}
