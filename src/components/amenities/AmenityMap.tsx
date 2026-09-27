"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { CuratedAmenityList } from "@/components/amenities/CuratedAmenityList";
import {
  amenityCategories,
  communityMapCenter,
  defaultAmenityCategoryId,
  getMapEmbedFallbackSrc,
  getPlaceDirectionsUrlFromLatLng,
  type AmenityCategoryId,
} from "@/config/community-map";
import { searchCategory, type AmenityPlaceResult } from "@/lib/amenity-places-search";
import { loadGoogleMaps, mapsAuthFailed } from "@/lib/google-maps-loader";
import { cn } from "@/lib/utils";

const MAP_MIN_HEIGHT = "min(70vh, 520px)";

export type AmenityMapProps = {
  className?: string;
  variant?: "full" | "compact";
};

function getApiKey(): string | undefined {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() || undefined;
}

function getMapId(): string | undefined {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID?.trim() || undefined;
}

function buildCommunityInfoContent(): HTMLElement {
  const root = document.createElement("div");
  root.style.maxWidth = "220px";
  root.style.padding = "4px 0";

  const title = document.createElement("p");
  title.style.fontWeight = "600";
  title.style.margin = "0 0 4px";
  title.textContent = communityMapCenter.label;

  const sub = document.createElement("p");
  sub.style.fontSize = "13px";
  sub.style.margin = "4px 0 8px";
  sub.textContent = "Elkhorn Springs · Las Vegas, NV 89131";

  const link = document.createElement("a");
  link.href = getPlaceDirectionsUrlFromLatLng(
    communityMapCenter.lat,
    communityMapCenter.lng,
    communityMapCenter.label,
  );
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.style.fontSize = "13px";
  link.style.fontWeight = "600";
  link.textContent = "Directions";

  root.append(title, sub, link);
  return root;
}

function buildPlaceInfoContent(place: AmenityPlaceResult): HTMLElement {
  const root = document.createElement("div");
  root.style.maxWidth = "240px";
  root.style.padding = "4px 0";

  const title = document.createElement("p");
  title.style.fontWeight = "600";
  title.style.margin = "0 0 4px";
  title.textContent = place.name;

  const address = document.createElement("p");
  address.style.fontSize = "13px";
  address.style.margin = "4px 0 8px";
  address.textContent = place.address;

  const link = document.createElement("a");
  link.href =
    place.mapsUri ?? getPlaceDirectionsUrlFromLatLng(place.lat, place.lng, place.name);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.style.fontSize = "13px";
  link.style.fontWeight = "600";
  link.textContent = "Directions";

  root.append(title, address, link);
  return root;
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
  const [useFallback, setUseFallback] = useState(() => !getApiKey() || mapsAuthFailed);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const categoryGroupId = useId();
  const apiKey = getApiKey();

  useEffect(() => {
    const onAuthFailure = () => {
      setUseFallback(true);
      setLoadError(null);
    };
    window.addEventListener("gmaps:auth-failure", onAuthFailure);
    return () => window.removeEventListener("gmaps:auth-failure", onAuthFailure);
  }, []);

  useEffect(() => {
    if (!useFallback) return;
    mapInstanceRef.current = null;
    communityMarkerRef.current?.setMap(null);
    communityMarkerRef.current = null;
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
  }, [useFallback]);

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
          infoWindow.setContent(buildCommunityInfoContent());
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
      infoWindow.setContent(buildCommunityInfoContent());
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
        const results = await searchCategory(categoryId, category.placeTypes);
        const infoWindow = infoWindowRef.current ?? new google.maps.InfoWindow();
        infoWindowRef.current = infoWindow;
        const bounds = new google.maps.LatLngBounds();
        bounds.extend({ lat: communityMapCenter.lat, lng: communityMapCenter.lng });

        results.forEach((place) => {
          bounds.extend({ lat: place.lat, lng: place.lng });
          const marker = new google.maps.Marker({
            map,
            position: { lat: place.lat, lng: place.lng },
            title: place.name,
          });
          marker.addListener("click", () => {
            infoWindow.setContent(buildPlaceInfoContent(place));
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
        setLoadError("Map search is temporarily unavailable. See the verified list below.");
      } finally {
        setIsLoadingPlaces(false);
      }
    },
    [clearMarkers],
  );

  const initInteractiveMap = useCallback(async () => {
    if (!apiKey || !mapContainerRef.current || mapInstanceRef.current || mapsAuthFailed) {
      if (mapsAuthFailed) setUseFallback(true);
      return;
    }

    try {
      await loadGoogleMaps(apiKey);
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
    if (!apiKey || mapsAuthFailed) {
      setUseFallback(true);
      return;
    }
    loadStartedRef.current = true;
    void loadGoogleMaps(apiKey)
      .then(() => initInteractiveMap())
      .catch(() => {
        setUseFallback(true);
        setLoadError(null);
      });
  }, [apiKey, initInteractiveMap, isInView, useFallback]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || useFallback) return;
    void searchPlaces(map, activeCategory);
  }, [activeCategory, searchPlaces, useFallback]);

  const embedSrc = getMapEmbedFallbackSrc();
  const showFallbackMap = useFallback || !apiKey || mapsAuthFailed;
  const showCuratedList = showFallbackMap || Boolean(loadError);

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

      {showCuratedList ? (
        <div className="space-y-3">
          {showFallbackMap ? (
            <p className="text-sm text-muted-foreground">
              Showing a standard map embed and verified nearby places for the selected category.
            </p>
          ) : null}
          <CuratedAmenityList activeCategory={activeCategory} />
        </div>
      ) : null}
    </div>
  );
}
