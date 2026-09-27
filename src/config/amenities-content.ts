import type { AmenityCategoryId } from "@/config/community-map";

export type CuratedPlace = {
  name: string;
  address: string;
  category: AmenityCategoryId;
  /** schema.org @type */
  schemaType: string;
  note?: string;
};

/** Verified names and addresses only — used in static HTML, fallback list, and ItemList schema */
export const curatedNearbyPlaces: CuratedPlace[] = [
  {
    name: "Smith's Food and Drug (Montecito Marketplace)",
    address: "7130 North Durango Drive, Las Vegas, NV 89149",
    category: "grocery",
    schemaType: "GroceryStore",
    note: "Full-service supermarket on North Durango, a common grocery run from Elkhorn Springs.",
  },
  {
    name: "Centennial Hills Hospital Medical Center",
    address: "6900 North Durango Drive, Las Vegas, NV 89149",
    category: "healthcare",
    schemaType: "Hospital",
    note: "Acute-care hospital on Durango north of the 215 beltway.",
  },
  {
    name: "ER at Valley Vista",
    address: "7230 North Decatur Boulevard, Las Vegas, NV 89131",
    category: "healthcare",
    schemaType: "Hospital",
    note: "Emergency department in the 89131 zip code.",
  },
  {
    name: "Floyd Lamb Park at Tule Springs",
    address: "9200 Tule Springs Road, Las Vegas, NV 89131",
    category: "parks",
    schemaType: "Park",
    note: "Large city park with lakes, trails, and picnic areas just north of Elkhorn Springs.",
  },
  {
    name: "Arbor View High School",
    address: "7500 Whispering Sands Drive, Las Vegas, NV 89131",
    category: "schools",
    schemaType: "School",
    note: "Clark County School District high school serving much of northwest Las Vegas.",
  },
  {
    name: "Howard E. Heckethorn Elementary School",
    address: "5255 Village Circle, Las Vegas, NV 89130",
    category: "schools",
    schemaType: "School",
    note: "CCSD elementary school in the Centennial Hills area.",
  },
];

export type AmenityWrittenSection = {
  id: AmenityCategoryId | "commute";
  heading: string;
  paragraphs: string[];
};

export const amenityWrittenSections: AmenityWrittenSection[] = [
  {
    id: "grocery",
    heading: "Grocery & everyday errands",
    paragraphs: [
      `Most Elkhorn Springs households shop along North Durango Drive at Montecito Marketplace, including Smith's Food and Drug at 7130 North Durango Drive. Albertsons and additional services sit along Centennial Center Boulevard in Centennial Hills.`,
      `Drive times vary with traffic and which village you are in, but many buyers budget 10–15 minutes for a full grocery run when surface streets are clear.`,
    ],
  },
  {
    id: "restaurants",
    heading: "Dining near Elkhorn Springs",
    paragraphs: [
      `Sit-down chains and local spots cluster along North Durango and at Centennial Hills retail nodes. You will find familiar fast-casual brands at Montecito Marketplace without driving to the Strip.`,
      `For a wider restaurant scene, Downtown Summerlin and the west side of the valley add options; those trips are longer than a neighborhood dinner run.`,
    ],
  },
  {
    id: "parks",
    heading: "Parks & outdoor recreation",
    paragraphs: [
      `Floyd Lamb Park at Tule Springs (9200 Tule Springs Road) is the signature outdoor destination just north of Elkhorn Springs—fishing ponds, trails, and picnic areas on more than 2,000 acres. The City of Las Vegas charges a per-vehicle entry fee; check current hours and payment options before you go.`,
      `Skye Canyon Park and trail networks northwest of Elkhorn Springs appeal to buyers who want newer playgrounds and sports fields; confirm access and parking for the village you tour.`,
    ],
  },
  {
    id: "golf",
    heading: "Golf",
    paragraphs: [
      `Northwest Las Vegas has several public and resort courses within a reasonable drive of 89131, including options in the Centennial Hills and Aliante areas. Tee times, seasons, and rates change—verify directly with the course you plan to play.`,
    ],
  },
  {
    id: "healthcare",
    heading: "Healthcare",
    paragraphs: [
      `Centennial Hills Hospital Medical Center (6900 North Durango Drive) is the major acute-care hospital serving northwest Las Vegas. ER at Valley Vista on North Decatur Boulevard (89131) provides emergency services closer to Elkhorn Springs.`,
      `Urgent care, primary care, and specialty clinics line Durango and Decatur corridors; confirm in-network providers with your insurance before relocating.`,
    ],
  },
  {
    id: "shopping",
    heading: "Shopping",
    paragraphs: [
      `Montecito Marketplace on Durango anchors big-box and everyday retail for Elkhorn Springs buyers. Centennial Hills Town Center and the Centennial Center corridor add home goods, services, and restaurants.`,
    ],
  },
  {
    id: "schools",
    heading: "Schools",
    paragraphs: [
      `Elkhorn Springs sits in the Clark County School District. Arbor View High School (7500 Whispering Sands Drive, 89131) is the well-known high school for much of the northwest valley. Elementary and middle school assignments depend on your exact address—verify current zoning with CCSD before you write an offer.`,
      "See our dedicated schools page for boundary reminders and tour-day questions.",
    ],
  },
  {
    id: "commute",
    heading: "Commute & regional access (approximate)",
    paragraphs: [
      `Elkhorn Springs buyers typically reach US-95 via Centennial Parkway or the 215 beltway depending on their village. In light traffic, many drivers reach the Las Vegas Strip in roughly 25–35 minutes; Harry Reid International Airport is often in the 30–40 minute range. Downtown Summerlin is commonly about 15–25 minutes south.`,
      `These are approximate drive times—not guarantees. Test your actual commute windows (school drop-off, shift change, weekend Strip traffic) during your home search.`,
    ],
  },
];

export const amenitiesFaqs: { question: string; answer: string }[] = [
  {
    question: `What grocery stores are near Elkhorn Springs?`,
    answer: `Smith's Food and Drug at Montecito Marketplace (7130 North Durango Drive) is the closest full-service supermarket many Elkhorn Springs buyers use, with additional grocers along Centennial Center Boulevard in Centennial Hills.`,
  },
  {
    question: `How far is Elkhorn Springs from the Las Vegas Strip?`,
    answer: `In light traffic, many drivers reach the Strip in roughly 25–35 minutes via US-95 and the Spaghetti Bowl, depending on your starting block and time of day.`,
  },
  {
    question: `Are there hospitals near Elkhorn Springs?`,
    answer: `Yes. Centennial Hills Hospital Medical Center is on North Durango Drive, and ER at Valley Vista is on North Decatur Boulevard in the 89131 zip code.`,
  },
  {
    question: `What is the closest large park to Elkhorn Springs?`,
    answer: `Floyd Lamb Park at Tule Springs (9200 Tule Springs Road) is the major city park just north of the neighborhood, with lakes, trails, and picnic areas.`,
  },
  {
    question: `Which high school serves Elkhorn Springs?`,
    answer: `Many northwest Las Vegas addresses attend Arbor View High School at 7500 Whispering Sands Drive, but school zoning is address-specific—confirm assignments with Clark County School District for any home you consider.`,
  },
  {
    question: `How long does it take to get to Harry Reid International Airport from Elkhorn Springs?`,
    answer: `Plan on roughly 30–40 minutes by car in typical conditions, often using US-95 south; rush hour and events can add time.`,
  },
  {
    question: `Is Elkhorn Springs close to Summerlin?`,
    answer: `Downtown Summerlin and west-side retail are commonly about 15–25 minutes south, depending on traffic and whether you use the 215 beltway.`,
  },
  {
    question: `Where do residents shop for everyday needs?`,
    answer: `Montecito Marketplace on North Durango and Centennial Hills Town Center are the main retail hubs for groceries, pharmacies, and services without driving downtown.`,
  },
];
