"use server";

import { headers } from "next/headers";
import {
  sendContactLeadToFub,
  validateContactLead,
} from "@/lib/follow-up-boss";
import { phones } from "@/lib/site-contact";

export type ContactState = { ok?: boolean; error?: string };

const FORM_NAME = "Contact form";
const PAGE_PATH = "/contact";

const failureMessage = `Sorry, something went wrong sending your message. Please call or text Dr. Jan Duffy at ${phones.primaryCta}.`;

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const validationError = validateContactLead({ name, email, phone });
  if (validationError) {
    return { error: "Please enter your name and email or phone." };
  }

  const headerList = await headers();
  const sourceUrl =
    String(formData.get("sourceUrl") ?? "").trim() ||
    headerList.get("referer") ||
    undefined;

  const result = await sendContactLeadToFub({
    name,
    email: email || undefined,
    phone: phone || undefined,
    message: message || undefined,
    sourceUrl,
    formName: FORM_NAME,
    pagePath: PAGE_PATH,
    type: "General Inquiry",
  });

  if (!result.ok) {
    return { error: failureMessage };
  }

  return { ok: true };
}
