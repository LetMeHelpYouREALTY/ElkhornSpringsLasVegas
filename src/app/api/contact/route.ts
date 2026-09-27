import { NextResponse } from "next/server";
import {
  sendContactLeadToFub,
  validateContactLead,
} from "@/lib/follow-up-boss";
import { phones } from "@/lib/site-contact";

const FORM_NAME = "Contact form";
const PAGE_PATH = "/contact";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const name = typeof body.name === "string" ? body.name : "";
  const email = typeof body.email === "string" ? body.email : "";
  const phone = typeof body.phone === "string" ? body.phone : "";
  const message = typeof body.message === "string" ? body.message : "";
  const sourceUrl =
    typeof body.sourceUrl === "string"
      ? body.sourceUrl
      : request.headers.get("referer") ?? undefined;

  const validationError = validateContactLead({ name, email, phone });
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const result = await sendContactLeadToFub({
    name: name.trim(),
    email: email.trim() || undefined,
    phone: phone.trim() || undefined,
    message: message.trim() || undefined,
    sourceUrl,
    formName: FORM_NAME,
    pagePath: PAGE_PATH,
    type: "General Inquiry",
  });

  if (result.ok) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  if (result.reason === "missing_key") {
    return NextResponse.json(
      { error: "Lead capture is temporarily unavailable." },
      { status: 503 },
    );
  }

  return NextResponse.json(
    {
      error: `Sorry, something went wrong sending your message. Please call or text Dr. Jan Duffy at ${phones.primaryCta}.`,
    },
    { status: 502 },
  );
}
