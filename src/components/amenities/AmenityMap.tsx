"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { CuratedAmenityList } from "@/components/amenities/CuratedAmenityList";
import {
  amenityCategories,
  amenitySearchRadiusMeters,
  communityMapCenter,
  defaultAmenityCategoryId,
  getMapEmbedFallbackSrc,
  getPlaceDirectionsUrlFromLatLng,
  type AmenityCategoryId,
} from "@/config/community-map";
import { cn } from "@/lib/utils";

const MAP_MIN_HEIGHT = "min(70vh, 520px)";

type MapPlaceResult = {
  id: string;
  name: string;
  address: string;
  rating?: number;
  lat: number;
  lng: number;
};

export type AmenityMapProps = {
  className?: string;
  /** When true, show full category strip; when false, still show all categories but compact */
  variant?: "full" | "compact";
};

function getApiKey(): string | undefined {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() || undefined;
}

function getMapId(): string | undefined {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID?.trim() || undefined;
}

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("No window"));
  }
  if (window.google?.maps) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-amenity-map="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Maps script failed")));
      if (window.google?.maps) resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&loading=async`;
    script.async = true;
    script.defer = true;
    script.dataset.amenityMap = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Maps script failed"));
    document.head.appendChild(script);
  });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildInfoWindowHtml(place: MapPlaceResult): string {
  const ratingLine =
    place.rating !== undefined
      ? `<p class="text-sm text-gray-600">Rating: ${place.rating.toFixed(1)}</p>`
      : "";
  const directions = getPlaceDirectionsUrlFromLatLng(place.lat, place.lng, place.name);
  return `<div style="max-width:240px;padding:4px 0">
    <p style="font-weight:600;margin:0 0 4px">${escapeHtml(place.name)}</p>
    ${ratingLine}
    <p style="font-size:13px;margin:4px 0 8px">${escapeHtml(place.address)}</p>
    <a href="${directions}" target="_blank" rel="noopener noreferrer" style="font-size:13px;font-weight:600">Directions</a>
  </div>`;
}

function buildCommunityInfoHtml(): string {
  const directions = getPlaceDirectionsUrlFromLatLng(
    communityMapCenter.lat,
    communityMapCenter.lng,
    communityMapCenter.label,
  );
  return `<div style="max-width:220px;padding:4px 0">
    <p style="font-weight:600;margin:0 0 4px">${escapeHtml(communityMapCenter.label)}</p>
    <p style="font-size:13px;margin:4px 0 8px">Elkhorn Springs · Las Vegas, NV 89131</p>
    <a href="${directions}" target="_blank" rel="noopener noreferrer" style="font-size:13px;font-weight:600">Directions</a>
  </div>`;
}

export function AmenityMap({ className, variant = "full" }: AmenityMapProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const communityMarkerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const loadStartedRef = useRef(false);

  const [isInView, setIsInView] = useState(false);
  const [activeCategory, setActiveCategory] = useState<AmenityCategoryId>(defaultAmenityCategoryId);
  const [useFallback, setUseFallback] = useState(() => !getApiKey());
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const categoryGroupId = useId();
  const apiKey = getApiKey();

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px", threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
  }, []);

  const addCommunityMarker = useCallback(async (map: google.maps.Map) => {
    communityMarkerRef.current?.setMap(null);
    const mapId = getMapId();
    const position = { lat: communityMapCenter.lat, lng: communityMapCenter.lng };
    const infoWindow = infoWindowRef.current ?? new google.maps.InfoWindow();
    infoWindowRef.current = infoWindow;

    if (mapId) {
      try {
        await google.maps.importLibrary("marker");
        const pin = new google.maps.marker.PinElement({
          background: "#1d4ed8",
          borderColor: "#1e3a8a",
          glyphColor: "#ffffff",
        });
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          position,
          title: communityMapCenter.label,
          content: pin.element,
        });
        marker.addListener("click", () => {
          infoWindow.setContent(buildCommunityInfoHtml());
          infoWindow.open({ map, anchor: marker as unknown as google.maps.Marker });
        });
        return;
      } catch {
        /* fall through to classic marker */
      }
    }

    const marker = new google.maps.Marker({
      map,
      position,
      title: communityMapCenter.label,
      icon: {
        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        scaledSize: new google.maps.Size(40, 40),
      },
    });
    communityMarkerRef.current = marker;
    marker.addListener("click", () => {
      infoWindow.setContent(buildCommunityInfoHtml());
      infoWindow.open({ map, anchor: marker });
    });
  }, []);

  const searchPlaces = useCallback(
    async (map: google.maps.Map, categoryId: AmenityCategoryId) => {
      const category = amenityCategories.find((c) => c.id === categoryId);
      if (!category) return;

      setIsLoadingPlaces(true);
      setLoadError(null);
      clearMarkers();

      try {
        await google.maps.importLibrary("places");
        const { places } = await google.maps.places.Place.searchNearby({
          fields: ["displayName", "formattedAddress", "location", "rating", "id"],
          locationRestriction: {
            center: { lat: communityMapCenter.lat, lng: communityMapCenter.lng },
            radius: amenitySearchRadiusMeters,
          },
          includedPrimaryTypes: category.placeTypes,
          maxResultCount: 20,
        });

        const infoWindow = infoWindowRef.current ?? new google.maps.InfoWindow();
        infoWindowRef.current = infoWindow;
        const bounds = new google.maps.LatLngBounds();
        bounds.extend({ lat: communityMapCenter.lat, lng: communityMapCenter.lng });

        const results: MapPlaceResult[] = [];

        for (const place of places) {
          await place.fetchFields({ fields: ["displayName", "formattedAddress", "location", "rating", "id"] });
          const lat = place.location?.lat();
          const lng = place.location?.lng();
          if (lat === undefined || lng === undefined) continue;
          const id = place.id ?? `${lat}-${lng}`;
          results.push({
            id,
            name: place.displayName ?? "Place",
            address: place.formattedAddress ?? "",
            rating: place.rating,
            lat,
            lng,
          });
        }

        results.forEach((place) => {
          bounds.extend({ lat: place.lat, lng: place.lng });
          const marker = new google.maps.Marker({
            map,
            position: { lat: place.lat, lng: place.lng },
            title: place.name,
          });
          marker.addListener("click", () => {
            infoWindow.setContent(buildInfoWindowHtml(place));
            infoWindow.open({ map, anchor: marker });
          });
          markersRef.current.push(marker);
        });

        if (results.length > 0) {
          map.fitBounds(bounds, 48);
        } else {
          map.setCenter({ lat: communityMapCenter.lat, lng: communityMapCenter.lng });
          map.setZoom(communityMapCenter.zoom);
        }
      } catch {
        setLoadError("Map search is temporarily unavailable. See the curated list below.");
      } finally {
        setIsLoadingPlaces(false);
      }
    },
    [clearMarkers],
  );

  const initInteractiveMap = useCallback(async () => {
    if (!apiKey || !mapContainerRef.current || mapInstanceRef.current) return;

    try {
      await loadGoogleMapsScript(apiKey);
      await google.maps.importLibrary("maps");

      const mapId = getMapId();
      const map = new google.maps.Map(mapContainerRef.current, {
        center: { lat: communityMapCenter.lat, lng: communityMapCenter.lng },
        zoom: communityMapCenter.zoom,
        ...(mapId ? { mapId } : {}),
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });
      mapInstanceRef.current = map;
      await addCommunityMarker(map);
      await searchPlaces(map, activeCategory);
      setUseFallback(false);
    } catch {
      setUseFallback(true);
      setLoadError(null);
    }
  }, [activeCategory, addCommunityMarker, apiKey, searchPlaces]);

  useEffect(() => {
    if (!isInView || useFallback || loadStartedRef.current) return;
    if (!apiKey) {
      setUseFallback(true);
      return;
    }
    loadStartedRef.current = true;
    void initInteractiveMap();
  }, [apiKey, initInteractiveMap, isInView, useFallback]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || useFallback) return;
    void searchPlaces(map, activeCategory);
  }, [activeCategory, searchPlaces, useFallback]);

  const embedSrc = getMapEmbedFallbackSrc();
  const showFallbackMap = useFallback || !apiKey;

  return (
    <div ref={rootRef} className={cn("space-y-4", className)}>
      <div
        role="group"
        aria-labelledby={`${categoryGroupId}-label`}
        className={cn(
          "flex flex-wrap gap-2",
          variant === "compact" && "max-h-24 overflow-y-auto sm:max-h-none",
        )}
      >
        <span id={`${categoryGroupId}-label`} className="sr-only">
          Filter nearby places by category
        </span>
        {amenityCategories.map((cat) => {
          const selected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              aria-pressed={selected}
              aria-label={cat.ariaLabel}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                selected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:bg-muted",
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div
        className="relative overflow-hidden rounded-2xl border border-border bg-muted/30"
        style={{ minHeight: MAP_MIN_HEIGHT }}
        aria-busy={isLoadingPlaces}
      >
        {showFallbackMap ? (
          <iframe
            title="Map of Elkhorn Springs, Las Vegas NV 89131"
            src={isInView ? embedSrc : undefined}
            className="h-[min(70vh,520px)] w-full border-0 sm:h-[480px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div
            ref={mapContainerRef}
            role="application"
            aria-label="Interactive map of nearby amenities around Elkhorn Springs"
            className="h-[min(70vh,520px)] w-full sm:h-[480px]"
          />
        )}
        {!isInView ? (
          <div
            className="absolute inset-0 flex items-center justify-center bg-muted/50 text-sm text-muted-foreground"
            aria-hidden
          >
            Map loads when scrolled into view
          </div>
        ) : null}
      </div>

      {loadError ? <p className="text-sm text-amber-700 dark:text-amber-400">{loadError}</p> : null}

      {showFallbackMap ? (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Showing a standard map embed and verified nearby places. Set{" "}
            <code className="rounded bg-muted px-1 text-xs">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> in Vercel for
            live category search.
          </p>
          <CuratedAmenityList activeCategory={activeCategory} />
        </div>
      ) : null}
    </div>
  );
}
