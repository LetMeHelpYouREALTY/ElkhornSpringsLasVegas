import type { Metadata } from "next";
import Link from "next/link";
import { MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbJsonLd } from "@/components/integrations/BreadcrumbJsonLd";
import { createMetadata, defaultOpenGraph, siteMetadataBase } from "@/lib/metadata";
import { neighborhoods } from "@/lib/neighborhoods";
import { agent, siteIdentity } from "@/lib/site-contact";

const path = "/neighborhoods";

export const metadata: Metadata = createMetadata({
  title: `Elkhorn Springs neighborhoods & villages (${siteIdentity.zip})`,
  description: `Compare The Preserve, Elkhorn Grove, Northern Lights, and every Elkhorn Springs village with ${agent.name}. Hyperlocal guides—not generic portal blurbs.`,
  alternates: { canonical: path },
  openGraph: {
    ...defaultOpenGraph,
    title: `Neighborhoods | ${siteIdentity.siteName}`,
    url: new URL(path, siteMetadataBase),
  },
});

export default function NeighborhoodsHubPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 sm:py-14">
      <BreadcrumbJsonLd crumbs={[{ name: "Neighborhoods", path }]} />
      <header className="max-w-3xl space-y-4">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <MapPinned className="size-3.5 shrink-0" aria-hidden />
          {siteIdentity.zip} · Village hub
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Elkhorn Springs neighborhoods &amp; villages
        </h1>
        <p className="leading-relaxed text-muted-foreground">
          Start with the village that matches your lifestyle—gated vs builder-new vs interior quiet blocks—then
          pair your short list with a live MLS search on{" "}
          <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/homes-for-sale">
            homes for sale
          </Link>
          .
        </p>
      </header>

      <div className="rounded-2xl border border-border bg-muted/25 p-5 sm:p-8 dark:bg-muted/15">
        <ul className="grid list-none gap-5 p-0 sm:grid-cols-2">
          {neighborhoods.map((n) => (
            <li key={n.slug}>
              <Card className="card-elevated group h-full gap-0 overflow-hidden rounded-2xl border border-border bg-card py-0 ring-0">
                <div
                  className="h-1 w-full bg-linear-to-r from-primary/40 via-accent/60 to-primary/30 dark:from-primary/50 dark:via-accent/40 dark:to-primary/35"
                  aria-hidden
                />
                <CardHeader className="rounded-none px-5 pb-2 pt-5 sm:px-6">
                  <CardTitle className="text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
                    {n.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-5 pb-6 pt-0 sm:px-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">{n.description}</p>
                  <Button asChild>
                    <Link href={`/neighborhoods/${n.slug}`}>Open village guide</Link>
                  </Button>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
