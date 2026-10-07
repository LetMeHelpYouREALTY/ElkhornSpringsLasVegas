"use client";

import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { TrackedTelLink } from "@/components/integrations/TrackedTelLink";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { phones, siteIdentity } from "@/lib/site-contact";

const nav = [
  { href: "/homes-for-sale", label: "Homes for sale" },
  { href: "/sold-homes", label: "Sold homes" },
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/schools", label: "Schools" },
  { href: "/market-report", label: "Market report" },
  { href: "/lifestyle", label: "Lifestyle" },
  { href: "/amenities", label: "Amenities" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 shadow-sm shadow-black/[0.03] backdrop-blur-md supports-[backdrop-filter]:bg-background/75 dark:shadow-black/20">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
        <Link href="/" className="font-semibold tracking-tight">
          <span className="block text-sm text-muted-foreground sm:text-xs">
            {siteIdentity.primaryArea}
          </span>
          <span className="block text-base sm:text-lg">{siteIdentity.siteName}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Button key={item.href} variant="ghost" size="sm" asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button size="sm" className="hidden sm:inline-flex" asChild>
            <TrackedTelLink href={`tel:${phones.primaryCtaTel}`}>
              <Phone className="mr-1 size-4" aria-hidden />
              Call {phones.primaryCta}
            </TrackedTelLink>
          </Button>
          <Button size="icon" variant="outline" className="sm:hidden" asChild>
            <TrackedTelLink href={`tel:${phones.primaryCtaTel}`} aria-label={`Call ${phones.primaryCta}`}>
              <Phone className="size-4" />
            </TrackedTelLink>
          </Button>

          <Sheet>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "lg:hidden",
              )}
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,320px)]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile primary">
                {nav.map((item) => (
                  <Button key={item.href} variant="ghost" className="justify-start" asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}
              </nav>
              <Button className="mt-6 w-full" asChild>
                <TrackedTelLink href={`tel:${phones.primaryCtaTel}`}>Call {phones.primaryCta}</TrackedTelLink>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
