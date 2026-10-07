import type { Metadata } from "next";
import { JsonLd } from "@/components/integrations/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";
import { HeroBuyer } from "@/components/sections/HeroBuyer";
import { NeighborhoodPreviewGrid } from "@/components/sections/NeighborhoodPreviewGrid";
import { NearbyAmenitiesSection } from "@/components/sections/NearbyAmenitiesSection";
import { OpenHouseMapSection } from "@/components/sections/OpenHouseMapSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { getValidatedOpenHouseEvents, openHouseFaqs } from "@/config/open-house";
import { createMetadata, defaultOpenGraph, siteMetadataBase } from "@/lib/metadata";
import { faqPageJsonLd, openHouseEventsJsonLd } from "@/lib/schema";
import { agent, phones, siteIdentity } from "@/lib/site-contact";

const path = "/";

export const metadata: Metadata = createMetadata({
  title: `Open houses & homes | ${siteIdentity.primaryArea} (${siteIdentity.zip})`,
  description: `Weekend open houses in Elkhorn Springs, Las Vegas ${siteIdentity.zip}. Map, directions, and tours with ${agent.name}. Call ${phones.primaryCta}.`,
  alternates: { canonical: path },
  openGraph: {
    ...defaultOpenGraph,
    title: `${siteIdentity.siteName} | Open houses ${siteIdentity.zip}`,
    description: `Open houses and homes in Elkhorn Springs (${siteIdentity.zip}) with ${agent.name} — ${agent.brokerage}.`,
    url: new URL(path, siteMetadataBase),
  },
});

export default function HomePage() {
  const events = getValidatedOpenHouseEvents();
  const eventLd = events ? openHouseEventsJsonLd(events) : null;
  const faqLd = openHouseFaqs.length > 0 ? faqPageJsonLd(openHouseFaqs) : null;

  return (
    <>
      {eventLd ? <JsonLd data={eventLd} /> : null}
      {faqLd ? <JsonLd data={faqLd} /> : null}
      <HeroBuyer />
      <OpenHouseMapSection />
      <NearbyAmenitiesSection />
      <TrustStrip />
      <NeighborhoodPreviewGrid />
      <CtaBand />
    </>
  );
}
