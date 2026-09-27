import { curatedNearbyPlaces } from "@/config/amenities-content";
import { amenityCategories, type AmenityCategoryId } from "@/config/community-map";

type CuratedAmenityListProps = {
  activeCategory?: AmenityCategoryId;
  showAll?: boolean;
};

export function CuratedAmenityList({ activeCategory, showAll = false }: CuratedAmenityListProps) {
  const categoryLabel = activeCategory
    ? amenityCategories.find((c) => c.id === activeCategory)?.label
    : undefined;

  const items = showAll || !activeCategory
    ? curatedNearbyPlaces
    : curatedNearbyPlaces.filter((p) => p.category === activeCategory);

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {categoryLabel
          ? `No curated ${categoryLabel.toLowerCase()} listings on this page yet—use the map when your API key is set, or explore North Durango and Centennial Hills retail corridors.`
          : "Explore the map or North Durango retail when your Google Maps API key is configured."}
      </p>
    );
  }

  return (
    <ul className="grid list-none gap-4 p-0 sm:grid-cols-2">
      {items.map((place) => (
        <li
          key={`${place.name}-${place.address}`}
          className="rounded-xl border border-border bg-card/80 p-4"
        >
          <p className="font-medium text-foreground">{place.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{place.address}</p>
          {place.note ? (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{place.note}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
