/** Minimal Google Maps JS API types for amenity map — full types via @types/google.maps optional */
declare namespace google.maps {
  class LatLng {
    constructor(lat: number, lng: number);
    lat(): number;
    lng(): number;
  }

  class LatLngBounds {
    extend(point: LatLng | { lat: number; lng: number }): void;
  }

  class Size {
    constructor(width: number, height: number);
  }

  class Point {
    constructor(x: number, y: number);
  }

  interface MapOptions {
    center?: { lat: number; lng: number };
    zoom?: number;
    mapId?: string;
    disableDefaultUI?: boolean;
    zoomControl?: boolean;
    mapTypeControl?: boolean;
    streetViewControl?: boolean;
    fullscreenControl?: boolean;
  }

  class Map {
    constructor(el: HTMLElement, opts?: MapOptions);
    fitBounds(bounds: LatLngBounds, padding?: number): void;
    setCenter(center: { lat: number; lng: number }): void;
    setZoom(zoom: number): void;
  }

  class Marker {
    constructor(opts?: MarkerOptions);
    setMap(map: Map | null): void;
    addListener(event: string, handler: () => void): void;
  }

  interface MarkerOptions {
    map?: Map;
    position?: { lat: number; lng: number };
    title?: string;
    icon?: string | { url: string; scaledSize?: Size; anchor?: Point };
  }

  class InfoWindow {
    constructor(opts?: { content?: string });
    setContent(content: string): void;
    open(opts: { map: Map; anchor?: Marker }): void;
    close(): void;
  }

  namespace marker {
    class AdvancedMarkerElement {
      constructor(opts?: {
        map?: Map;
        position?: { lat: number; lng: number };
        title?: string;
        content?: HTMLElement;
      });
      addListener(event: string, handler: () => void): void;
    }

    class PinElement {
      constructor(opts?: { background?: string; borderColor?: string; glyphColor?: string });
      element: HTMLElement;
    }
  }

  namespace places {
    class Place {
      constructor(opts: { id: string });
      static searchNearby(request: PlaceSearchNearbyRequest): Promise<{ places: Place[] }>;
      fetchFields(opts: { fields: string[] }): Promise<void>;
      displayName?: string;
      formattedAddress?: string;
      rating?: number;
      location?: { lat: () => number; lng: () => number };
      id?: string;
    }

    interface PlaceSearchNearbyRequest {
      fields: string[];
      locationRestriction: {
        center: { lat: number; lng: number };
        radius: number;
      };
      includedPrimaryTypes?: string[];
      maxResultCount?: number;
    }
  }

  function importLibrary(name: "maps" | "places" | "marker"): Promise<unknown>;
}

interface Window {
  google?: { maps: typeof google.maps };
}
