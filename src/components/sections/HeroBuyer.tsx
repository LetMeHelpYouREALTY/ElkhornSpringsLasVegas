import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { TrackedTelLink } from "@/components/integrations/TrackedTelLink";
import { Button } from "@/components/ui/button";
import { agent, phones, siteIdentity } from "@/lib/site-contact";

export function HeroBuyer() {
  return (
    <section
      className="mesh-hero relative overflow-hidden border-b border-border bg-background"
      aria-labelledby="hero-heading"
    >
      <div
        className="hero-subtle-grid pointer-events-none absolute inset-0 opacity-[0.55] dark:opacity-[0.35]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.25]"
        aria-hidden
      >
        <div className="absolute -right-24 -top-24 size-[min(100vw,28rem)] rounded-full bg-primary/12 blur-3xl dark:bg-primary/25" />
        <div className="absolute -bottom-32 -left-16 size-[min(90vw,24rem)] rounded-full bg-accent/50 blur-3xl dark:bg-accent/25" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 md:py-28">
        <div className="max-w-3xl space-y-8">
          <div className="flex flex-col gap-4 sm:gap-5">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/95 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary shadow-sm backdrop-blur-sm dark:bg-card/80">
              <MapPin className="size-3.5 shrink-0 text-primary" aria-hidden />
              <span>Las Vegas {siteIdentity.zip}</span>
              <span className="text-border" aria-hidden>
                ·
              </span>
              <span className="text-foreground">{siteIdentity.primaryArea}</span>
            </p>
            <p className="text-sm leading-snug text-muted-foreground">
              <span className="font-semibold text-foreground">{agent.name}</span>
              <span className="text-border"> · </span>
              Las Vegas REALTOR®
              <span className="mt-1 block text-xs text-muted-foreground sm:mt-0 sm:inline sm:before:content-['·_']">
                Licensed since 2008 · 35 years in Las Vegas
              </span>
            </p>
          </div>

          <div className="space-y-5">
            <h1
              id="hero-heading"
              className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.12]"
            >
              Elkhorn Springs homes, neighborhoods, and real answers—without the generic portal noise.
            </h1>
            <p className="text-pretty max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
              Navigate gated villages, new construction, resale timelines, and HOA diligence with a local guide—not
              a recycled portal blurb. Search listings, compare villages, or call{" "}
              <span className="font-medium text-foreground">{phones.primaryCta}</span> for a curated short list.
            </p>
            <p className="text-sm font-medium">
              <Link
                href="#open-houses"
                className="text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Open houses this weekend — map &amp; times
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button size="lg" className="min-h-11 w-full px-6 shadow-md shadow-primary/15 sm:w-auto" asChild>
              <Link href="/homes-for-sale">
                View active listings
                <ArrowRight className="ml-2 size-4 shrink-0" aria-hidden />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" className="min-h-11 w-full px-6 sm:w-auto" asChild>
              <Link href="/neighborhoods">Explore neighborhoods</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-h-11 w-full border-border bg-background/80 px-6 backdrop-blur-sm sm:w-auto dark:bg-card/50"
              asChild
            >
              <TrackedTelLink href={`tel:${phones.primaryCtaTel}`}>
                <Phone className="mr-2 size-4 shrink-0" aria-hidden />
                Call {phones.primaryCta}
              </TrackedTelLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
