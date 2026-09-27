import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/integrations/BreadcrumbJsonLd";
import { createMetadata, defaultOpenGraph, siteMetadataBase } from "@/lib/metadata";
import { getAllPostsMeta } from "@/lib/blog";
import { siteIdentity } from "@/lib/site-contact";

const path = "/blog";

export const metadata: Metadata = createMetadata({
  title: `Elkhorn Springs blog | ${siteIdentity.zip} hyperlocal guides`,
  description: `Hyperlocal articles for Elkhorn Springs and Las Vegas ${siteIdentity.zip} buyers and sellers—villages, diligence, and market context.`,
  alternates: { canonical: path },
  openGraph: {
    ...defaultOpenGraph,
    title: `Blog | ${siteIdentity.siteName}`,
    url: new URL(path, siteMetadataBase),
  },
});

export default function BlogIndexPage() {
  const posts = getAllPostsMeta();
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
      <BreadcrumbJsonLd crumbs={[{ name: "Blog", path }]} />
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Elkhorn Springs blog</h1>
        <p className="text-muted-foreground">
          Practical guides for buyers and sellers—focused on {siteIdentity.primaryArea}, not generic national SEO
          filler.
        </p>
      </header>
      <ul className="space-y-6">
        {posts.map((p) => (
          <li key={p.slug} className="border-b pb-6">
            <p className="text-xs text-muted-foreground">{p.date}</p>
            <h2 className="mt-1 text-xl font-semibold">
              <Link className="hover:underline" href={`/blog/${p.slug}`}>
                {p.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
