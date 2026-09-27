import Link from "next/link";
import { TrackedTelLink } from "@/components/integrations/TrackedTelLink";
import { agent, emails, formatNapLine, phones, siteIdentity } from "@/lib/site-contact";

const explore = [
  { href: "/homes-for-sale", label: "Homes for sale in Elkhorn Springs" },
  { href: "/neighborhoods/the-preserve", label: "The Preserve at Elkhorn Springs" },
  { href: "/neighborhoods/elkhorn-grove", label: "Elkhorn Grove (Toll Brothers)" },
  { href: "/schools", label: "Arbor View High School area schools" },
  { href: "/market-report", label: "89131 market update" },
  { href: "/amenities", label: "Nearby amenities map" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/80 bg-gradient-to-b from-muted/40 to-muted/60 dark:from-muted/20 dark:to-muted/35">
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-lg font-semibold">{siteIdentity.siteName}</p>
            <p className="mt-2 text-sm text-muted-foreground">{formatNapLine()}</p>
            <p className="mt-4 text-sm">
              <span className="font-medium text-foreground">{agent.name}</span>
              <br />
              Nevada license {agent.license}
              <br />
              {agent.brokerage}
            </p>
            <p className="mt-4 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-4">
              <TrackedTelLink className="text-primary underline-offset-4 hover:underline" href={`tel:${phones.primaryCtaTel}`}>
                Call {phones.primaryCta}
              </TrackedTelLink>
              <TrackedTelLink className="text-primary underline-offset-4 hover:underline" href={`tel:${phones.professionalTel}`}>
                Office / direct {phones.professional}
              </TrackedTelLink>
              <a
                className="text-primary underline-offset-4 hover:underline"
                href={`mailto:${emails.primary}`}
              >
                {emails.primary}
              </a>
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Explore Elkhorn Springs (89131)</p>
            <ul className="mt-3 space-y-2 text-sm">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link className="text-primary underline-offset-4 hover:underline" href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {agent.name}. All rights reserved. This site is not affiliated with
          the builders or HOA; community details can change—verify material facts during diligence.
        </p>
      </div>
    </footer>
  );
}
