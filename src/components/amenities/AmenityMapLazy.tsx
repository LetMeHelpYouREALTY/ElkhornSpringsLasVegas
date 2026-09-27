"use client";

import dynamic from "next/dynamic";
import type { AmenityMapProps } from "@/components/amenities/AmenityMap";

const AmenityMap = dynamic(
  () => import("@/components/amenities/AmenityMap").then((m) => m.AmenityMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-[min(70vh,520px)] items-center justify-center rounded-2xl border border-border bg-muted/30 sm:h-[480px]"
        role="status"
        aria-label="Loading amenity map"
      >
        <span className="text-sm text-muted-foreground">Loading map…</span>
      </div>
    ),
  },
);

export function AmenityMapLazy(props: AmenityMapProps) {
  return <AmenityMap {...props} />;
}
