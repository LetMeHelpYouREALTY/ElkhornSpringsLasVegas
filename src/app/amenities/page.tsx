import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/integrations/JsonLd";
import { AmenityMapLazy } from "@/components/amenities/AmenityMapLazy";
import { TrackedTelLink } from "@/components/integrations/TrackedTelLink";
import { CuratedAmenityList } from "@/components/amenities/CuratedAmenityList";
import { Button } from "@/components/ui/button";
import {
  amenityWrittenSections,
  amenitiesFaqs,
  curatedNearbyPlaces,
} from "@/config/amenities-content";
import { communityMapCenter } from "@/config/community-map";
import { createMetadata, defaultOpenGraph, siteMetadataBase } from "@/lib/metadata";
import {
  breadcrumbListJsonLd,
  communityPlaceJsonLd,
  faqPageJsonLd,
  featuredPlacesItemListJsonLd,
} from "@/lib/schema";
import { agent, emails, formatNapLine, phones, siteIdentity } from "@/lib/site-contact";

const path = "/amenities";

export const metadata: Metadata = createMetadata({
  title: `Nearby amenities in ${siteIdentity.primaryArea}, ${siteIdentity.city}`,
  description: `Grocery, parks, healthcare, schools, and dining near Elkhorn Springs (${siteIdentity.zip}). Interactive map and hyperlocal guide from ${agent.name}.`,
  alternates: { canonical: path },
  openGraph: {
    ...defaultOpenGraph,
    title: `Nearby Amenities | ${siteIdentity.siteName}`,
    description: `Explore what is near Elkhorn Springs, Las Vegas ${siteIdentity.zip}—map, FAQs, and commute context.`,
    url: new URL(path, siteMetadataBase),
  },
});

export default function AmenitiesPage() {
  const breadcrumbLd = breadcrumbListJsonLd([{ name: "Nearby amenities", path }]);
  const faqLd = faqPageJsonLd(amenitiesFaqs);
  const placesLd = featuredPlacesItemListJsonLd(
    curatedNearbyPlaces.map((p) => ({
      name: p.name,
      address: p.address,
      schemaType: p.schemaType,
    })),
  );
  const placeLd = communityPlaceJsonLd({
    lat: communityMapCenter.lat,
    lng: communityMapCenter.lng,
  });

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={placesLd} />
      <JsonLd data={placeLd} />

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-10 sm:px-6 sm:py-14">
        <header className="max-w-3xl space-y-4">
          <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link className="text-primary underline-offset-4 hover:underline" href="/">
              Home
            </Link>
            <span aria-hidden> / </span>
            <span>Nearby amenities</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Nearby Amenities in {siteIdentity.primaryArea}, {siteIdentity.city}
          </h1>
          <p className="leading-relaxed text-muted-foreground">
            Elkhorn Springs sits in Centennial Hills ({siteIdentity.zip}) with Durango retail, Floyd Lamb Park,
            and CCSD schools within a short drive. Use the map to explore by category, then read the hyperlocal
            notes below—verified places only, no invented ratings or drive times.
          </p>
        </header>

        <section className="space-y-6" aria-labelledby="amenity-map-heading">
          <h2 id="amenity-map-heading" className="text-2xl font-semibold tracking-tight">
            Interactive amenity map
          </h2>
          <AmenityMapLazy variant="full" />
        </section>

        <section className="space-y-8" aria-labelledby="amenity-guides-heading">
          <h2 id="amenity-guides-heading" className="text-2xl font-semibold tracking-tight">
            Hyperlocal guides by category
          </h2>
          <div className="space-y-10">
            {amenityWrittenSections.map((section) => (
              <article key={section.id} className="max-w-3xl space-y-3">
                <h3 className="text-xl font-semibold text-foreground">{section.heading}</h3>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="text-sm leading-relaxed text-muted-foreground">
                    {section.id === "schools" && p.includes("schools page") ? (
                      <>
                        See our dedicated{" "}
                        <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/schools">
                          {siteIdentity.primaryArea} schools page
                        </Link>{" "}
                        for boundary reminders and tour-day questions.
                      </>
                    ) : (
                      p
                    )}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6" aria-labelledby="featured-places-heading">
          <h2 id="featured-places-heading" className="text-2xl font-semibold tracking-tight">
            Featured nearby places
          </h2>
          <CuratedAmenityList showAll />
        </section>

        <section
          className="space-y-6 rounded-2xl border border-border bg-card/80 p-6 sm:p-8"
          aria-labelledby="amenities-faq-heading"
        >
          <h2 id="amenities-faq-heading" className="text-2xl font-semibold tracking-tight">
            Elkhorn Springs amenities FAQ
          </h2>
          <dl className="space-y-6">
            {amenitiesFaqs.map((f) => (
              <div key={f.question} className="space-y-1.5">
                <dt className="font-medium text-foreground">{f.question}</dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          className="rounded-2xl border border-border bg-muted/25 p-6 sm:p-8"
          aria-labelledby="amenities-agent-heading"
        >
          <h2 id="amenities-agent-heading" className="text-xl font-semibold">
            Your local guide to {siteIdentity.primaryArea}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {agent.name} (Nevada license {agent.license}) with {agent.brokerage} helps buyers compare villages,
            commutes, and everyday errands before you tour. {formatNapLine()}.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button size="lg" className="min-h-11" asChild>
              <Link href="/contact">Request a buyer consult</Link>
            </Button>
            <Button size="lg" variant="outline" className="min-h-11" asChild>
              <TrackedTelLink href={`tel:${phones.primaryCtaTel}`}>Call {phones.primaryCta}</TrackedTelLink>
            </Button>
            <Button size="lg" variant="secondary" className="min-h-11" asChild>
              <Link href="/homes-for-sale">Search homes for sale</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Email{" "}
            <a className="font-medium text-primary underline-offset-4 hover:underline" href={`mailto:${emails.primary}`}>
              {emails.primary}
            </a>
          </p>
        </section>
      </div>
    </>
  );
}
