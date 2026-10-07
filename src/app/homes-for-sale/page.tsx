import type { Metadata } from "next";
import { MlsDisclaimer } from "@/components/compliance/MlsDisclaimer";
import { RealScoutOfficeListings } from "@/components/integrations/RealScoutOfficeListings";
import { NearbyAmenitiesSection } from "@/components/sections/NearbyAmenitiesSection";
import { HomesForSaleIntro } from "@/components/sections/HomesForSaleIntro";
import { BreadcrumbJsonLd } from "@/components/integrations/BreadcrumbJsonLd";
import { createMetadata, defaultOpenGraph, siteMetadataBase } from "@/lib/metadata";
import { agent, siteIdentity } from "@/lib/site-contact";

const path = "/homes-for-sale";

export const metadata: Metadata = createMetadata({
  title: `Homes for sale in ${siteIdentity.primaryArea} (${siteIdentity.zip})`,
  description: `Browse active MLS listings in Elkhorn Springs and ${siteIdentity.zip} with ${agent.name}. Filter saved searches to this master plan before you tour.`,
  alternates: { canonical: path },
  openGraph: {
    ...defaultOpenGraph,
    title: `Homes for sale | ${siteIdentity.siteName}`,
    description: `MLS-powered search for Elkhorn Springs, Las Vegas ${siteIdentity.zip}.`,
    url: new URL(path, siteMetadataBase),
  },
});

export default function HomesForSalePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 sm:py-14">
      <BreadcrumbJsonLd crumbs={[{ name: "Homes for sale", path }]} />
      <header className="max-w-3xl space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Homes for sale in Elkhorn Springs ({siteIdentity.zip})
        </h1>
        <p className="leading-relaxed text-muted-foreground">
          Live MLS search below—scoped to Elkhorn Springs and {siteIdentity.zip} when your RealScout preset is
          saved in the dashboard.
        </p>
      </header>

      <HomesForSaleIntro />

      <NearbyAmenitiesSection
        id="listings-amenities"
        heading="What's near the homes you're viewing"
        subcopy="Filter restaurants, grocery, parks, healthcare, and schools around Elkhorn Springs before you write an offer."
        variant="compact"
      />

      <RealScoutOfficeListings />
      <MlsDisclaimer />
    </div>
  );
}
