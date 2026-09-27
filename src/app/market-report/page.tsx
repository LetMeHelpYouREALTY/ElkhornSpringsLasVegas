import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/integrations/BreadcrumbJsonLd";
import { createMetadata, defaultOpenGraph, siteMetadataBase } from "@/lib/metadata";
import { agent, siteIdentity } from "@/lib/site-contact";

const path = "/market-report";

export const metadata: Metadata = createMetadata({
  title: `Monthly ${siteIdentity.zip} market snapshot (Elkhorn Springs)`,
  description: `Interpret Las Vegas ${siteIdentity.zip} trends with local context—without hype. ${agent.name} pairs MLS stats with on-the-ground buyer feedback.`,
  alternates: { canonical: path },
  openGraph: {
    ...defaultOpenGraph,
    title: `Market report | ${siteIdentity.siteName}`,
    url: new URL(path, siteMetadataBase),
  },
});

export default function MarketReportPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
      <BreadcrumbJsonLd crumbs={[{ name: "Market report", path }]} />
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {siteIdentity.zip} market context for Elkhorn Springs
        </h1>
        <p className="text-muted-foreground">
          Macro stats rarely match a single village inside the master plan. Use this page as a framework—then
          request micro-comps for your exact product type (single-story, two-story, gated, builder phase).
        </p>
      </header>
      <section className="space-y-3 rounded-xl border bg-muted/40 p-6">
        <h2 className="text-xl font-semibold">What moves the needle in Skye Canyon?</h2>
        <p className="text-sm text-muted-foreground">
          Watch months of supply by price band, new-build incentives, and resale inventory with similar HOA
          fee loads. {agent.name} tracks showing feedback so you are not surprised by recurring buyer
          objections.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Want numbers tailored to your home?</h2>
        <p className="text-sm text-muted-foreground">
          Public charts age quickly. Request a private CMA or buyer briefing so data reflects today&apos;s
          contracts—not last quarter&apos;s headlines.
        </p>
        <Link className="text-sm font-medium text-primary underline-offset-4 hover:underline" href="/contact">
          Request a CMA / briefing
        </Link>
      </section>
    </div>
  );
}
