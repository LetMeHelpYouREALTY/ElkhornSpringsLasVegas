import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrackedTelLink } from "@/components/integrations/TrackedTelLink";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/integrations/BreadcrumbJsonLd";
import { JsonLd } from "@/components/integrations/JsonLd";
import { createMetadata, defaultOpenGraph, siteMetadataBase } from "@/lib/metadata";
import { faqPageJsonLd } from "@/lib/schema";
import { getNeighborhoodBySlug, neighborhoods } from "@/lib/neighborhoods";
import { agent, phones, siteIdentity } from "@/lib/site-contact";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const n = getNeighborhoodBySlug(slug);
  if (!n) return {};
  const path = `/neighborhoods/${slug}`;
  return createMetadata({
    title: `${n.name} | Elkhorn Springs real estate`,
    description: `${n.description.slice(0, 155)}…`,
    alternates: { canonical: path },
    openGraph: {
      ...defaultOpenGraph,
      title: `${n.shortLabel} | ${siteIdentity.siteName}`,
      description: n.description,
      url: new URL(path, siteMetadataBase),
    },
  });
}

export default async function NeighborhoodDetailPage({ params }: Props) {
  const { slug } = await params;
  const n = getNeighborhoodBySlug(slug);
  if (!n) notFound();

  const faqLd = n.faqs && n.faqs.length > 0 ? faqPageJsonLd(n.faqs) : null;
  const neighborhoodPath = `/neighborhoods/${slug}`;

  return (
    <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6 sm:py-14">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Neighborhoods", path: "/neighborhoods" },
          { name: n.shortLabel, path: neighborhoodPath },
        ]}
      />
      {faqLd ? <JsonLd data={faqLd} /> : null}
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Elkhorn Springs · {siteIdentity.zip}
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{n.name}</h1>
        <p className="text-muted-foreground">{n.description}</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">What buyers notice first</h2>
        <ul className="list-inside list-disc text-sm text-muted-foreground">
          {n.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </section>

      {n.faqs?.length ? (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Frequently asked questions</h2>
          <div className="space-y-6">
            {n.faqs.map((f) => (
              <div key={f.question}>
                <h3 className="font-semibold">{f.question}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-4 rounded-xl border bg-muted/40 p-6">
        <h2 className="text-xl font-semibold">See homes in this village</h2>
        <p className="text-sm text-muted-foreground">
          Pair this guide with a live MLS search filtered to {siteIdentity.zip} and your must-haves.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/homes-for-sale">Browse active listings</Link>
          </Button>
          <Button variant="outline" asChild>
            <TrackedTelLink href={`tel:${phones.primaryCtaTel}`}>Call {phones.primaryCta}</TrackedTelLink>
          </Button>
        </div>
      </section>

      <p className="text-xs text-muted-foreground">
        {agent.name} · {agent.brokerage} · Nevada license {agent.license}.
      </p>
    </div>
  );
}
