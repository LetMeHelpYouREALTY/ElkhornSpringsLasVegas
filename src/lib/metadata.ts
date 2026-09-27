import type { Metadata } from "next";
import { agent, siteIdentity } from "@/lib/site-contact";

const defaultUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://ElkhornSpringsLasVegas.com";

export const siteMetadataBase = new URL(defaultUrl);

export function createMetadata(override: Metadata): Metadata {
  return {
    metadataBase: siteMetadataBase,
    ...override,
  };
}

export const defaultOpenGraphImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteIdentity.siteName} — Elkhorn Springs real estate with ${agent.name}`,
};

export const defaultOpenGraph: Metadata["openGraph"] = {
  type: "website",
  locale: "en_US",
  siteName: siteIdentity.siteName,
  images: [defaultOpenGraphImage],
};
