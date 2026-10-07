import type { MetadataRoute } from "next";
import { getPostSlugs } from "@/lib/blog";
import { neighborhoods } from "@/lib/neighborhoods";

const base =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://ElkhornSpringsLasVegas.com";

const staticRoutes = [
  "/",
  "/homes-for-sale",
  "/sold-homes",
  "/neighborhoods",
  "/schools",
  "/market-report",
  "/lifestyle",
  "/amenities",
  "/about",
  "/contact",
  "/blog",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...neighborhoods.map((n) => ({
      url: `${base}/neighborhoods/${n.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...getPostSlugs().map((slug) => ({
      url: `${base}/blog/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return entries;
}
