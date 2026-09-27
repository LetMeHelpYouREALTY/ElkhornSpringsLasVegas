import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/integrations/BreadcrumbJsonLd";
import { createMetadata, defaultOpenGraph, siteMetadataBase } from "@/lib/metadata";
import { siteIdentity } from "@/lib/site-contact";

const path = "/lifestyle";

export const metadata: Metadata = createMetadata({
  title: `Parks, dining, and daily life near Elkhorn Springs`,
  description: `Skye Canyon trails, groceries, and weekend routines around ${siteIdentity.primaryArea} (${siteIdentity.zip})—a practical amenity primer for buyers.`,
  alternates: { canonical: path },
  openGraph: {
    ...defaultOpenGraph,
    title: `Lifestyle in Skye Canyon | ${siteIdentity.siteName}`,
    url: new URL(path, siteMetadataBase),
  },
});

export default function LifestylePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
      <BreadcrumbJsonLd crumbs={[{ name: "Lifestyle", path }]} />
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Lifestyle around Elkhorn Springs &amp; Skye Canyon
        </h1>
        <p className="text-muted-foreground">
          Buyers choose {siteIdentity.zip} for mountain views, newer construction, and outdoor access. This
          guide highlights what to test on your own schedule—not a sponsored directory.
        </p>
      </header>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Where should I spend a Saturday morning?</h2>
        <p className="text-sm text-muted-foreground">
          Walk Skye Canyon Park trails, grab coffee along North Durango retail, and drive your true commute to
          Summerlin, Centennial, or the 215 belt at rush hour.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Need a tour that matches your routine?</h2>
        <p className="text-sm text-muted-foreground">
          Tell us how you live—pets, pickleball, night shifts, school pickups—and we will route a village tour
          that stress-tests real life, not just floor plans.
        </p>
        <Link className="text-sm font-medium text-primary underline-offset-4 hover:underline" href="/contact">
          Book a lifestyle tour consult
        </Link>
      </section>
    </div>
  );
}
