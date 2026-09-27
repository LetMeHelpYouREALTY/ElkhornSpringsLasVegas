import type { Metadata } from "next";
import Link from "next/link";
import { TrackedTelLink } from "@/components/integrations/TrackedTelLink";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/integrations/BreadcrumbJsonLd";
import { createMetadata, defaultOpenGraph, siteMetadataBase } from "@/lib/metadata";
import { agent, phones, siteIdentity } from "@/lib/site-contact";

const path = "/sold-homes";

export const metadata: Metadata = createMetadata({
  title: `Recent sales and seller strategy in ${siteIdentity.zip}`,
  description: `Understand what recent Elkhorn Springs activity means for pricing—without cherry-picked stats. ${agent.name} prepares honest comps and a seller roadmap.`,
  alternates: { canonical: path },
  openGraph: {
    ...defaultOpenGraph,
    title: `Sold homes context | ${siteIdentity.siteName}`,
    url: new URL(path, siteMetadataBase),
  },
});

export default function SoldHomesPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
      <BreadcrumbJsonLd crumbs={[{ name: "Sold homes", path }]} />
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Recent sales and social proof in Elkhorn Springs
        </h1>
        <p className="text-muted-foreground">
          Sold data changes daily and must be interpreted with your exact floor plan, upgrades, lot, and HOA
          context. This page is a buyer-and-seller primer—request a formal CMA for numbers tied to{" "}
          <em>your</em> home.
        </p>
      </header>
      <section className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold">What sellers should do next</h2>
        <p className="text-sm text-muted-foreground">
          If you are preparing to list in {siteIdentity.primaryArea}, start with a pre-list walkthrough: minor
          repairs, staging priorities, and pricing bands that reflect current buyer objections in{" "}
          {siteIdentity.zip}.
        </p>
        <Button asChild>
          <Link href="/contact">Request a seller CMA</Link>
        </Button>
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Why generic &quot;sold&quot; pages mislead</h2>
        <p className="text-sm text-muted-foreground">
          Portals often mix unrelated subdivisions or delay sold timestamps. {agent.name} sources MLS-exported
          comps for your village and verifies adjustments with you before you choose a list price.
        </p>
        <Button variant="outline" asChild>
          <TrackedTelLink href={`tel:${phones.primaryCtaTel}`}>Call {phones.primaryCta}</TrackedTelLink>
        </Button>
      </section>
    </div>
  );
}
