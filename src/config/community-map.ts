import { siteIdentity } from "@/lib/site-contact";

/**
 * Map center for Elkhorn Springs (Centennial Hills, 89131).
 * Coordinates verified from public geocode on W Elkhorn Rd within the community (89131).
 * @see https://www.compass.com/homedetails/6658-W-Elkhorn-Rd-Las-Vegas-NV-89131/
 */
export const communityMapCenter = {
  lat: 36.291029,
  lng: -115.23916,
  zoom: 14,
  label: siteIdentity.primaryArea,
  coordinateSource:
    "Public listing geocode for 6658 W Elkhorn Rd, Las Vegas NV 89131 (representative Elkhorn Springs address).",
} as const;

export type AmenityCategoryId =
  | "restaurants"
  | "cafes"
  | "grocery"
  | "parks"
  | "golf"
  | "healthcare"
  | "pharmacies"
  | "shopping"
  | "parking"
  | "fitness"
  | "schools";

export type AmenityCategory = {
  id: AmenityCategoryId;
  label: string;
  /** Places API (New) primary types for searchNearby */
  placeTypes: string[];
  ariaLabel: string;
};

/** Suburban family master plan — schools included; standard amenity order per spec */
export const amenityCategories: AmenityCategory[] = [
  {
    id: "restaurants",
    label: "Restaurants",
    placeTypes: ["restaurant"],
    ariaLabel: "Show restaurants near Elkhorn Springs",
  },
  {
    id: "cafes",
    label: "Cafes",
    placeTypes: ["cafe", "coffee_shop"],
    ariaLabel: "Show cafes and coffee shops near Elkhorn Springs",
  },
  {
    id: "grocery",
    label: "Grocery",
    placeTypes: ["grocery_store", "supermarket"],
    ariaLabel: "Show grocery stores near Elkhorn Springs",
  },
  {
    id: "parks",
    label: "Parks",
    placeTypes: ["park"],
    ariaLabel: "Show parks near Elkhorn Springs",
  },
  {
    id: "golf",
    label: "Golf",
    placeTypes: ["golf_course"],
    ariaLabel: "Show golf courses near Elkhorn Springs",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    placeTypes: ["hospital", "doctor"],
    ariaLabel: "Show hospitals and medical offices near Elkhorn Springs",
  },
  {
    id: "pharmacies",
    label: "Pharmacies",
    placeTypes: ["pharmacy"],
    ariaLabel: "Show pharmacies near Elkhorn Springs",
  },
  {
    id: "shopping",
    label: "Shopping",
    placeTypes: ["shopping_mall", "department_store"],
    ariaLabel: "Show shopping near Elkhorn Springs",
  },
  {
    id: "parking",
    label: "Parking",
    placeTypes: ["parking"],
    ariaLabel: "Show parking facilities near Elkhorn Springs",
  },
  {
    id: "fitness",
    label: "Fitness",
    placeTypes: ["gym", "fitness_center"],
    ariaLabel: "Show gyms and fitness centers near Elkhorn Springs",
  },
  {
    id: "schools",
    label: "Schools",
    placeTypes: ["school", "primary_school", "secondary_school"],
    ariaLabel: "Show schools near Elkhorn Springs",
  },
];

export const defaultAmenityCategoryId: AmenityCategoryId = "grocery";

/** Search radius in meters (~5 mi) */
export const amenitySearchRadiusMeters = 8000;

export function getMapEmbedFallbackSrc(): string {
  const { lat, lng, zoom } = communityMapCenter;
  return `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
}

export function getCommunityDirectionsUrl(): string {
  const { lat, lng } = communityMapCenter;
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export function getPlaceDirectionsUrl(placeId: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination_place_id=${encodeURIComponent(placeId)}`;
}

export function getPlaceDirectionsUrlFromLatLng(lat: number, lng: number, label?: string): string {
  const dest = label ? encodeURIComponent(label) : `${lat},${lng}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${dest}`;
}
