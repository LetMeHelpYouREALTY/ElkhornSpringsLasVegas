import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { TrackedTelLink } from "@/components/integrations/TrackedTelLink";
import { BreadcrumbJsonLd } from "@/components/integrations/BreadcrumbJsonLd";
import { createMetadata, defaultOpenGraph, siteMetadataBase } from "@/lib/metadata";
import { agent, emails, formatNapLine, phones, siteIdentity } from "@/lib/site-contact";

const path = "/contact";

const cloudCmaUrl = process.env.NEXT_PUBLIC_CLOUDCMA_EMBED_URL?.trim();
const mapsQuery = encodeURIComponent(`Elkhorn Springs Las Vegas NV ${siteIdentity.zip}`);
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
const reviewUrl = process.env.NEXT_PUBLIC_GBP_REVIEW_URL?.trim();

export const metadata: Metadata = createMetadata({
  title: `Contact ${agent.name} | CMA & buyer consult`,
  description: `Call ${phones.primaryCta}, email ${emails.primary}, or request a CloudCMA report for Elkhorn Springs (${siteIdentity.zip}).`,
  alternates: { canonical: path },
  openGraph: {
    ...defaultOpenGraph,
    title: `Contact | ${siteIdentity.siteName}`,
    url: new URL(path, siteMetadataBase),
  },
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6 sm:py-14">
      <BreadcrumbJsonLd crumbs={[{ name: "Contact", path }]} />
      <header className="max-w-3xl space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Contact &amp; CMA request
        </h1>
        <p className="leading-relaxed text-muted-foreground">
          Reach {agent.name} for tours, listing prep, or pricing questions in {siteIdentity.primaryArea}. NAP:{" "}
          {formatNapLine()}.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-2">
        <section className="space-y-4 rounded-2xl border border-border bg-muted/20 p-6 dark:bg-muted/10" aria-label="Call, directions, reviews">
          <h2 className="text-xl font-semibold text-foreground">Talk with the team</h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <TrackedTelLink
              className="inline-flex h-11 min-h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
              href={`tel:${phones.primaryCtaTel}`}
            >
              Call {phones.primaryCta}
            </TrackedTelLink>
            <a
              className="inline-flex h-11 min-h-11 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium hover:bg-muted"
              href={`mailto:${emails.primary}`}
            >
              Email {emails.primary}
            </a>
            <a
              className="inline-flex h-11 min-h-11 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium hover:bg-muted"
              href={mapsHref}
              rel="noopener noreferrer"
            >
              Directions (Google Maps)
            </a>
            {reviewUrl ? (
              <a
                className="inline-flex h-11 min-h-11 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium hover:bg-muted"
                href={reviewUrl}
                rel="noopener noreferrer"
              >
                View Google reviews
              </a>
            ) : null}
          </div>
          <p className="text-sm text-muted-foreground">
            Professional line:{" "}
            <TrackedTelLink
              className="text-primary underline-offset-4 hover:underline"
              href={`tel:${phones.professionalTel}`}
            >
              {phones.professional}
            </TrackedTelLink>
          </p>
        </section>

        <section className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm" aria-label="Quick message">
          <h2 className="text-xl font-semibold text-foreground">Send a message</h2>
          <ContactForm />
        </section>
      </div>

      <section className="cv-below-fold space-y-6" aria-label="CloudCMA valuation embed">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">Request a CloudCMA report</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Structured comps and seller/buyer context through CloudCMA. Add{" "}
            <code className="rounded bg-muted px-1">NEXT_PUBLIC_CLOUDCMA_EMBED_URL</code> when your embed URL is
            ready. Extend <code className="rounded bg-muted px-1">frame-src</code> in{" "}
            <code className="rounded bg-muted px-1">next.config.ts</code> if CloudCMA uses another host.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-2xl p-[1px] shadow-md shadow-primary/5">
          <div className="cta-glow absolute inset-0 rounded-2xl" aria-hidden />
          <div className="relative overflow-hidden rounded-[calc(1rem-1px)] border border-border/80 bg-card">
            {cloudCmaUrl ? (
              <iframe
                title="CloudCMA request form"
                src={cloudCmaUrl}
                className="min-h-[720px] w-full bg-background"
                loading="lazy"
              />
            ) : (
              <div className="flex min-h-[280px] items-center justify-center border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground dark:bg-muted/15">
                CloudCMA embed URL not set.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
