import Link from "next/link";
import { MapPin } from "lucide-react";
import { AmenityMapLazy } from "@/components/amenities/AmenityMapLazy";
import { Button } from "@/components/ui/button";
import { siteIdentity } from "@/lib/site-contact";

type NearbyAmenitiesSectionProps = {
  heading?: string;
  subcopy?: string;
  variant?: "full" | "compact";
  id?: string;
};

export function NearbyAmenitiesSection({
  heading = `Life near ${siteIdentity.primaryArea}`,
  subcopy = `Explore grocery, parks, healthcare, schools, and dining around Elkhorn Springs (${siteIdentity.zip}). Switch categories on the map, then open the full amenities guide for commute notes and buyer FAQs.`,
  variant = "full",
  id = "whats-nearby",
}: NearbyAmenitiesSectionProps) {
  return (
    <section
      id={id}
      className="cv-below-fold border-b border-border bg-muted/15 py-14 dark:bg-muted/10 sm:py-16"
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6">
        <header className="max-w-3xl space-y-3">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            <MapPin className="size-3.5 shrink-0" aria-hidden />
            What&apos;s nearby
          </p>
          <h2 id={`${id}-heading`} className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {heading}
          </h2>
          <p className="leading-relaxed text-muted-foreground">{subcopy}</p>
          <Button variant="secondary" className="min-h-11" asChild>
            <Link href="/amenities">Full nearby amenities guide</Link>
          </Button>
        </header>
        <AmenityMapLazy variant={variant} />
      </div>
    </section>
  );
}
