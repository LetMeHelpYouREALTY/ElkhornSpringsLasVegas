import {
  amenitySearchRadiusMeters,
  communityMapCenter,
  type AmenityCategoryId,
} from "@/config/community-map";

export type AmenityPlaceResult = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  mapsUri?: string;
};

const cache = new Map<string, Promise<AmenityPlaceResult[]>>();

export function searchCategory(
  categoryId: AmenityCategoryId,
  types: string[],
): Promise<AmenityPlaceResult[]> {
  let p = cache.get(categoryId);
  if (!p) {
    p = (async () => {
      const { Place } = (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary;
      const { places } = await Place.searchNearby({
        fields: ["displayName", "location", "formattedAddress", "googleMapsURI", "id"],
        locationRestriction: {
          center: { lat: communityMapCenter.lat, lng: communityMapCenter.lng },
          radius: amenitySearchRadiusMeters,
        },
        includedPrimaryTypes: types,
        maxResultCount: 10,
        // Places API accepts POPULARITY string; avoid deprecated RankPreference enum
        rankPreference: "POPULARITY" as "DISTANCE" | "POPULARITY",
      });

      const results: AmenityPlaceResult[] = [];
      for (const place of places) {
        const lat = place.location?.lat();
        const lng = place.location?.lng();
        if (lat === undefined || lng === undefined) continue;
        results.push({
          id: place.id ?? `${lat}-${lng}`,
          name: place.displayName ?? "Place",
          address: place.formattedAddress ?? "",
          lat,
          lng,
          mapsUri: place.googleMapsURI ?? undefined,
        });
      }
      return results;
    })();
    p.catch(() => cache.delete(categoryId));
    cache.set(categoryId, p);
  }
  return p;
}
