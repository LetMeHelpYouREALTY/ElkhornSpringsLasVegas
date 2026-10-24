import { BadgeCheck, LineChart, Shield } from "lucide-react";
import { agent } from "@/lib/site-contact";

const items = [
  {
    title: "Diligence-first tours",
    body: "HOA docs, insurance, and timelines—reviewed with you before you write, not after.",
    icon: Shield,
  },
  {
    title: "89131 context",
    body: "Skye Canyon retail, commute patterns, and village-by-village tradeoffs explained in plain language.",
    icon: LineChart,
  },
  {
    title: "Licensed Nevada REALTOR®",
    body: `${agent.name} · In real estate since 1983.`,
    icon: BadgeCheck,
  },
] as const;

export function TrustStrip() {
  return (
    <section className="cv-below-fold relative border-y border-border/80 bg-muted/50 dark:bg-muted/30">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <h2 className="sr-only">Why work with this Elkhorn Springs agent</h2>
        <ul className="grid gap-6 md:grid-cols-3 md:gap-8">
          {items.map((item) => (
            <li
              key={item.title}
              className="group relative rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm backdrop-blur-sm transition-colors hover:border-primary/20 dark:bg-card/40"
            >
              <div className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/10 transition-transform group-hover:scale-105 dark:bg-primary/15">
                  <item.icon className="size-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold tracking-tight text-foreground">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
