import type { Metadata } from "next";
import Link from "next/link";
import { TrackedTelLink } from "@/components/integrations/TrackedTelLink";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/integrations/BreadcrumbJsonLd";
import { createMetadata, defaultOpenGraph, siteMetadataBase } from "@/lib/metadata";
import { agent, phones, siteIdentity } from "@/lib/site-contact";

const path = "/about";

const bombbombUrl = process.env.NEXT_PUBLIC_BOMBBOMB_EMBED_URL?.trim();

export const metadata: Metadata = createMetadata({
  title: `About ${agent.name} | ${siteIdentity.primaryArea} REALTOR®`,
  description: `${agent.name}, Nevada license ${agent.license}, represents buyers and sellers in Elkhorn Springs (${siteIdentity.zip}) with ${agent.brokerage}.`,
  alternates: { canonical: path },
  openGraph: {
    ...defaultOpenGraph,
    title: `About | ${siteIdentity.siteName}`,
    url: new URL(path, siteMetadataBase),
  },
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6 sm:py-14">
      <BreadcrumbJsonLd crumbs={[{ name: "About", path }]} />
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About Dr. Jan Duffy</h1>
        <p className="text-muted-foreground">
          {agent.name} works with {siteIdentity.primaryArea} buyers and sellers who want straight answers about
          villages, incentives, and HOA diligence—not recycled portal copy.
        </p>
      </header>

      {bombbombUrl ? (
        <section className="space-y-3" aria-label="Introduction video">
          <h2 className="text-xl font-semibold">Watch a quick introduction</h2>
          <div className="overflow-hidden rounded-xl border shadow-sm">
            <iframe
              title="Dr. Jan Duffy introduction video"
              src={bombbombUrl}
              className="aspect-video w-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      ) : (
        <section className="rounded-xl border border-dashed bg-muted/40 p-6 text-sm text-muted-foreground">
          Set <code className="rounded bg-muted px-1">NEXT_PUBLIC_BOMBBOMB_EMBED_URL</code> to embed your
          BombBomb video on this page.
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Credentials</h2>
        <ul className="list-inside list-disc text-sm text-muted-foreground">
          <li>Nevada real estate license {agent.license}</li>
          <li>{agent.brokerage}</li>
          <li>Focused service area: Elkhorn Springs &amp; Skye Canyon ({siteIdentity.zip})</li>
        </ul>
      </section>

      <section className="flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <TrackedTelLink href={`tel:${phones.primaryCtaTel}`}>Call {phones.primaryCta}</TrackedTelLink>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/contact">Request a consult</Link>
        </Button>
      </section>
    </div>
  );
}
