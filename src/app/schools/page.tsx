import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/integrations/BreadcrumbJsonLd";
import { createMetadata, defaultOpenGraph, siteMetadataBase } from "@/lib/metadata";
import { agent, siteIdentity } from "@/lib/site-contact";

const path = "/schools";

export const metadata: Metadata = createMetadata({
  title: `Arbor View High School feeder schools & ${siteIdentity.zip} guide`,
  description: `School boundaries change. Use this Elkhorn Springs (${siteIdentity.zip}) guide as a starting point—then verify enrollment with CCSD and each school.`,
  alternates: { canonical: path },
  openGraph: {
    ...defaultOpenGraph,
    title: `Schools near Elkhorn Springs | ${siteIdentity.siteName}`,
    url: new URL(path, siteMetadataBase),
  },
});

export default function SchoolsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
      <BreadcrumbJsonLd crumbs={[{ name: "Schools", path }]} />
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Schools near Elkhorn Springs (89131)
        </h1>
        <p className="text-muted-foreground">
          Families moving to {siteIdentity.primaryArea} usually ask about Arbor View High School and nearby
          K–8 options. This is general neighborhood context—not a guarantee of eligibility, programs, or
          transportation.
        </p>
      </header>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">What should I verify first?</h2>
        <p className="text-sm text-muted-foreground">
          Confirm your exact address with the Clark County School District boundary tool and each school&apos;s
          registrar. Magnet, charter, and zone exceptions are common in Las Vegas.
        </p>
        <ul className="list-inside list-disc text-sm text-muted-foreground">
          <li>
            <a
              className="text-primary underline-offset-4 hover:underline"
              href="https://www.ccsd.net/"
              rel="noopener noreferrer"
            >
              Clark County School District (CCSD)
            </a>
          </li>
          <li>School websites for bell schedules, uniforms, and GATE/magnet deadlines</li>
        </ul>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">How can {agent.name} help?</h2>
        <p className="text-sm text-muted-foreground">
          When you tour, we map realistic commute times from specific Elkhorn Springs villages to your short
          list of schools—then you confirm enrollment with the district.
        </p>
        <Link className="text-sm font-medium text-primary underline-offset-4 hover:underline" href="/contact">
          Plan a buyer consult
        </Link>
      </section>
    </div>
  );
}
