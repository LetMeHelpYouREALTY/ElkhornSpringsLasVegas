import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CallActionScript } from "@/components/integrations/CallActionScript";
import { Ga4Script } from "@/components/integrations/Ga4Script";
import { GtmNoscript, GtmScript } from "@/components/integrations/GtmScript";
import { PerformanceHints } from "@/components/integrations/PerformanceHints";
import { JsonLd } from "@/components/integrations/JsonLd";
import { RealScoutLoader } from "@/components/integrations/RealScoutLoader";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { createMetadata, defaultOpenGraph, siteMetadataBase } from "@/lib/metadata";
import { localBusinessAndAgentJsonLd } from "@/lib/schema";
import { agent, siteIdentity } from "@/lib/site-contact";
import "./globals.css";
import WidgetTracker from './widget-tracker'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6f4" },
    { media: "(prefers-color-scheme: dark)", color: "#141a18" },
  ],
};

export const metadata: Metadata = createMetadata({
  title: {
    default: `${siteIdentity.primaryArea} Real Estate (${siteIdentity.zip}) | ${agent.name}`,
    template: `%s | ${siteIdentity.siteName}`,
  },
  description: `Buy or sell in Elkhorn Springs, Las Vegas ${siteIdentity.zip}. Village-level expertise, MLS search, schools, and market context with ${agent.name}, REALTOR®.`,
  openGraph: {
    ...defaultOpenGraph,
    title: siteIdentity.siteName,
    description: `Hyperlocal Elkhorn Springs (${siteIdentity.zip}) resource for buyers and sellers.`,
    url: siteMetadataBase,
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <PerformanceHints />
      </head>
      <body className="min-h-full flex flex-col pb-20 sm:pb-0">
        <JsonLd data={localBusinessAndAgentJsonLd()} />
        <GtmScript />
        <Ga4Script />
        <GtmNoscript />
        <RealScoutLoader />
        <CallActionScript />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <MobileStickyCta />
        <WidgetTracker />
      </body>
    </html>
  );
}
