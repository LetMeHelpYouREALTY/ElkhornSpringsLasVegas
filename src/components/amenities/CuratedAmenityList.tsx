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
          ? `No verified ${categoryLabel.toLowerCase()} listings on this page yet—explore North Durango and Centennial Hills retail corridors on your tour days.`
          : "Verified nearby places appear here by category; use the map filters above."}
      </p>
    );
  }

  return (
    <ul className="grid list-none gap-4 p-0 sm:grid-cols-2">
      {items.map((place) => (
        <li
          key={`${place.name}-${place.category}`}
          className="rounded-xl border border-border bg-card/80 p-4"
        >
          <p className="font-medium text-foreground">{place.name}</p>
          {place.address ? (
            <p className="mt-1 text-sm text-muted-foreground">{place.address}</p>
          ) : null}
          {place.note ? (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{place.note}</p>
          ) : null}
          <p className="mt-2 text-xs">
            <a
              className="font-medium text-primary underline-offset-4 hover:underline"
              href={place.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Official source
            </a>
          </p>
        </li>
      ))}
    </ul>
  );
}
