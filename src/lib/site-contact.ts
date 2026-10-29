/**
 * Single source of truth for NAP and agent/brokerage facts.
 * Align visible copy and JSON-LD with Google Business Profile.
 */

export const siteIdentity = {
  siteName: "Elkhorn Springs Las Vegas",
  domain: "ElkhornSpringsLasVegas.com",
  /** Use NEXT_PUBLIC_SITE_URL in metadataBase; this is the public label */
  primaryArea: "Elkhorn Springs",
  zip: "89131",
  city: "Las Vegas",
  state: "NV",
  country: "US",
} as const;

export const agent = {
  name: "Dr. Jan Duffy",
  /** Never use "Janet" in copy */
  license: "S.0197614.LLC",
  brokerage: "Berkshire Hathaway HomeServices Nevada Properties",
} as const;

export const phones = {
  /** Primary CTA — match GBP if used as main business phone */
  primaryCta: "702-500-1955",
  primaryCtaTel: "+17025001955",
  professional: "702-500-1955",
  professionalTel: "+17025001955",
} as const;

export const emails = {
  primary: "drduffy@elkhornspringslasvegas.com",
} as const;

export function getStreetAddress(): string | undefined {
  const s = process.env.NEXT_PUBLIC_NAP_STREET?.trim();
  return s || undefined;
}

export function getPostalAddress() {
  return {
    streetAddress: getStreetAddress(),
    addressLocality: siteIdentity.city,
    addressRegion: siteIdentity.state,
    postalCode: siteIdentity.zip,
    addressCountry: siteIdentity.country,
  };
}

export function formatNapLine(): string {
  const street = getStreetAddress();
  const locality = `${siteIdentity.city}, ${siteIdentity.state} ${siteIdentity.zip}`;
  return street ? `${street}, ${locality}` : `${siteIdentity.primaryArea} — ${locality}`;
}
