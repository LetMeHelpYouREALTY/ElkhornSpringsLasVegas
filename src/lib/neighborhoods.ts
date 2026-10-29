export type NeighborhoodEntry = {
  slug: string;
  name: string;
  shortLabel: string;
  description: string;
  highlights: string[];
  faqs?: { question: string; answer: string }[];
};

export const neighborhoods: NeighborhoodEntry[] = [
  {
    slug: "the-preserve",
    name: "The Preserve at Elkhorn Springs",
    shortLabel: "The Preserve",
    description:
      "Gated living within Elkhorn Springs with a private, resort-adjacent feel. Buyers compare Preserve homes for added privacy, controlled access, and well-kept common areas.",
    highlights: [
      "Gated entry and neighborhood character",
      "Strong fit for buyers prioritizing privacy",
      "Walk or short drive to Skye Canyon parks and trails",
    ],
    faqs: [
      {
        question: "Is The Preserve at Elkhorn Springs gated?",
        answer:
          "Yes. The Preserve is positioned as a gated enclave within Elkhorn Springs. Gate hours and guest policies can vary—confirm current HOA rules during your tour.",
      },
      {
        question: "What should buyers verify before writing an offer?",
        answer:
          "Review HOA fees, reserves, and community rules, and confirm schools and commute times for your household. Your agent can help you request the latest HOA documents.",
      },
    ],
  },
  {
    slug: "elkhorn-grove",
    name: "Elkhorn Grove by Toll Brothers",
    shortLabel: "Elkhorn Grove",
    description:
      "New-construction and newer resale opportunities tied to a national builder program. Expect modern floor plans, buyer incentives that change by phase, and model-home hours that vary seasonally.",
    highlights: [
      "Toll Brothers new build and resale inventory",
      "Model homes and design-center appointments",
      "Compare builder warranties vs resale timelines",
    ],
  },
  {
    slug: "northern-lights",
    name: "Northern Lights",
    shortLabel: "Northern Lights",
    description:
      "A village cluster inside Elkhorn Springs with its own street rhythm and pocket parks. Use this page to compare Northern Lights to nearby villages before you tour.",
    highlights: ["Village-level character inside 89131", "Nearby Skye Canyon amenities"],
  },
  {
    slug: "the-meadows",
    name: "The Meadows at Elkhorn Springs",
    shortLabel: "The Meadows",
    description:
      "Open-space oriented blocks with curb appeal. Buyers often short-list The Meadows for yard size, sight lines, and neighborly blocks.",
    highlights: ["Greenbelt adjacency on select lots", "Floor plans common"],
  },
  {
    slug: "wildflower",
    name: "Wildflower",
    shortLabel: "Wildflower",
    description:
      "A compact village with quick access to Skye Canyon retail and arterials. Strong for buyers who want Elkhorn Springs without a long internal commute.",
    highlights: ["Convenient Skye Canyon access", "Compare HOA fees village-to-village"],
  },
  {
    slug: "cascade",
    name: "Cascade",
    shortLabel: "Cascade",
    description:
      "Terraced street layouts and elevation changes give Cascade a distinct feel. Lot orientation and afternoon sun vary—worth a daytime drive.",
    highlights: ["Elevation changes and views on select homes", "Daytime tours recommended"],
  },
  {
    slug: "quail-run",
    name: "Quail Run",
    shortLabel: "Quail Run",
    description:
      "Quiet interior streets and a mix of single-story and two-story plans. Good for buyers comparing low-traffic pockets inside Elkhorn Springs.",
    highlights: ["Interior location within the master plan", "Mix of one- and two-story homes"],
  },
  {
    slug: "orchard-valley",
    name: "Orchard Valley",
    shortLabel: "Orchard Valley",
    description:
      "Landscaped entries and mature street trees on many blocks. Check irrigation, landscaping maintenance, and HOA standards as part of diligence.",
    highlights: ["Landscaped entries", "Verify HOA landscape rules"],
  },
  {
    slug: "carriage-park",
    name: "Carriage Park",
    shortLabel: "Carriage Park",
    description:
      "Attached and detached product can both appear here depending on phase—confirm HOA coverage, roof responsibility, and parking counts on each listing.",
    highlights: ["Attached/detached mix by phase", "Confirm parking and roof responsibility"],
  },
  {
    slug: "toucan-trails",
    name: "Toucan Trails",
    shortLabel: "Toucan Trails",
    description:
      "A playful village name with serious buyer demand—inventory turns quickly when priced well. Set alerts with your agent so you see new listings early.",
    highlights: ["Competitive when inventory is thin", "Use listing alerts with your agent"],
  },
  {
    slug: "willows",
    name: "The Willows",
    shortLabel: "The Willows",
    description:
      "Tree-lined streets and flexible floor plans attract move-up buyers. Compare lot premiums vs backing to open space or arterials.",
    highlights: ["Tree-lined streets", "Compare lot premiums vs location"],
  },
];

export function getNeighborhoodBySlug(slug: string): NeighborhoodEntry | undefined {
  return neighborhoods.find((n) => n.slug === slug);
}

export function getAllNeighborhoodSlugs(): string[] {
  return neighborhoods.map((n) => n.slug);
}
