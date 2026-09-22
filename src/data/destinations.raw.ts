import type { Destination, PhotoInput } from "@/types";

export type DestinationInput = Omit<Destination, "heroImage" | "galleryImages"> & {
  heroImage: PhotoInput;
  galleryImages: PhotoInput[];
};

// Plain text data, safe to import from client components (e.g. search,
// the assistant) — no filesystem access. Image resolution happens in
// destinations.ts, which is server-only.
export const rawDestinations: DestinationInput[] = [
  {
    slug: "karnataka",
    name: "Karnataka",
    country: "India",
    tagline: "Palaces, coffee hills, and ruins in the golden light.",
    description:
      "Home ground — from the palaces of Mysore to the misty hills of Coorg and the ruins of Hampi.",
    longDescription: [
      "Karnataka is where most of my journeys begin, mostly because it's home, and partly because I don't think I've ever fully finished exploring it. It's a state that refuses to be one thing — one weekend you're in a hill station wrapped in coffee mist, and by the next you're standing among granite boulders that look like they were placed there on purpose.",
      "I keep returning to three places in particular: Mysore, for its unhurried royal grandeur and its markets that smell of jasmine and sandalwood; Coorg, for the quiet and the coffee and the rain; and Hampi, for the strange feeling of walking through a city that the centuries have only half erased.",
      "There's no single Karnataka story, which is exactly why it keeps pulling me back. The Western Ghats hold waterfalls I still haven't seen. The coast has towns I've only driven past. It's the kind of place that makes a shortlist longer every time you visit it.",
    ],
    travelNotes: [
      "Go to Coorg in the monsoon if you don't mind the mist — it's a quieter, greener version of the place most people visit in winter.",
      "Mysore is best explored early, before the heat sets in and while the palace grounds are still empty.",
      "Hampi rewards slowness. Rent a bicycle instead of a car and let yourself get a little lost among the ruins.",
    ],
    heroImage: {
      src: "/images/destinations/karnataka.jpg",
      alt: "Illustrated impression of a Karnataka palace skyline at golden hour",
      tone: "gold",
      variant: "palace",
      label: "Karnataka",
    },
    galleryImages: [
      { src: "/images/destinations/karnataka-1.jpg", alt: "Mysore Palace domes against the evening sky", tone: "gold", variant: "palace" },
      { src: "/images/destinations/karnataka-2.jpg", alt: "Coffee-covered hills of Coorg in the mist", tone: "forest", variant: "hills" },
      { src: "/images/destinations/karnataka-3.jpg", alt: "Ruined temple silhouettes at Hampi", tone: "dusk", variant: "palace" },
    ],
  },
  {
    slug: "kerala",
    name: "Kerala",
    country: "India",
    tagline: "Backwaters, quiet villages, and slow afternoons.",
    description:
      "God's Own Country — still water, coconut palms, and a pace of life I keep trying to bring home with me.",
    longDescription: [
      "Kerala is still fairly new territory for me — a few short trips rather than the long, familiar relationship I have with Karnataka. But even in those short visits, something about the backwaters settled into memory in a way few places do.",
      "It's the stillness that stays with you. A houseboat gliding past a village where someone is doing laundry on the steps, a fisherman untangling a net, the sound of water against the hull at night. It felt less like sightseeing and more like being let into someone else's ordinary day for an afternoon.",
      "I haven't written a full story from Kerala yet — that will come with the next trip, when I go further south and give the state more time than a long weekend allows.",
    ],
    travelNotes: [
      "A short backwater cruise barely scratches the surface — an overnight houseboat stay changes the experience completely.",
      "Go in the early morning if you want the backwaters without the crowds and the heat.",
      "Ask locally for where to eat. Some of the best meals I've had in India were at unmarked roadside places here.",
    ],
    heroImage: {
      src: "/images/destinations/kerala.jpg",
      alt: "Illustrated impression of Kerala backwaters with palm trees",
      tone: "forest",
      variant: "backwater",
      label: "Kerala",
    },
    galleryImages: [
      { src: "/images/destinations/kerala-1.jpg", alt: "A houseboat resting on still backwaters", tone: "forest", variant: "backwater" },
      { src: "/images/destinations/kerala-2.jpg", alt: "Coconut palms lining a quiet canal", tone: "gold", variant: "backwater" },
    ],
  },
  {
    slug: "goa",
    name: "Goa",
    country: "India",
    tagline: "Slow mornings, old churches, and a coastline that doesn't ask for anything.",
    description:
      "Beyond the parties — quiet beaches, Portuguese lanes, and long, unhurried mornings by the sea.",
    longDescription: [
      "Most people talk about Goa in terms of its nightlife, but the version I keep coming back for is the early morning one — fishing boats returning with the day's catch, cafés just opening their shutters, the tide low and the sand still cool underfoot.",
      "The old quarters of Fontainhas and Panjim, with their faded Portuguese façades and narrow lanes, feel like a different state entirely from the beach shacks a few kilometres away. I've spent whole afternoons just walking those streets with no destination in mind, which is usually when Goa gives you its best moments.",
      "It's a place that rewards a slower itinerary — fewer beaches, more time at each one, and at least one meal that isn't planned in advance.",
    ],
    travelNotes: [
      "Skip the crowded stretches and head north or south of the main beaches for a quieter coastline.",
      "Rent a scooter if you can — Goa's back roads, lined with cashew trees and old houses, are half the experience.",
      "Try to catch at least one sunrise here. The beaches feel like they belong to no one at that hour.",
    ],
    heroImage: {
      src: "/images/destinations/goa.jpg",
      alt: "Illustrated impression of a Goan coastline at sunset",
      tone: "terracotta",
      variant: "coast",
      label: "Goa",
    },
    galleryImages: [
      { src: "/images/destinations/goa-1.jpg", alt: "Fishing boats on a quiet Goan beach at dawn", tone: "terracotta", variant: "coast" },
      { src: "/images/destinations/goa-2.jpg", alt: "A narrow Portuguese-era lane in Fontainhas", tone: "gold", variant: "coast" },
      { src: "/images/destinations/goa-3.jpg", alt: "Waves along the Goan coast at dusk", tone: "dusk", variant: "coast" },
    ],
  },
  {
    slug: "tamil-nadu",
    name: "Tamil Nadu",
    country: "India",
    tagline: "Temple towns, hill retreats, and a culture that runs deep.",
    description:
      "Towering temple gopurams, cool hill stations, and a coastline steeped in history.",
    longDescription: [
      "Tamil Nadu has been mostly a state of brief passages for me so far — a temple town seen on the way to somewhere else, a hill station visited once, years ago. What little I've seen has been enough to know there's a great deal more waiting.",
      "The temple architecture alone could occupy several trips — towering gopurams carved with more detail than a single visit can take in, corridors that seem to fold back on themselves, courtyards that feel cool even in the middle of a hot afternoon.",
      "This is a destination page I intend to keep rewriting as the visits accumulate. For now, consider it an open note rather than a finished chapter.",
    ],
    travelNotes: [
      "Visit temple towns early in the morning, both for the light and for the relative quiet before the crowds arrive.",
      "The hill stations here run cooler and greener than most people expect from a southern state.",
      "Food is reason enough to visit on its own — don't rush your meals.",
    ],
    heroImage: {
      src: "/images/destinations/tamil-nadu.jpg",
      alt: "Illustrated impression of a temple gopuram at dusk",
      tone: "dusk",
      variant: "palace",
      label: "Tamil Nadu",
    },
    galleryImages: [
      { src: "/images/destinations/tamil-nadu-1.jpg", alt: "A temple gopuram silhouette at dusk", tone: "dusk", variant: "palace" },
      { src: "/images/destinations/tamil-nadu-2.jpg", alt: "Misty hills of a Tamil Nadu hill station", tone: "forest", variant: "hills" },
    ],
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    country: "India",
    tagline: "Forts, deserts, and colours that seem to belong to another century.",
    description:
      "Sandstone forts, desert dunes, and cities that hold their history in plain sight.",
    longDescription: [
      "Rajasthan sits on my list rather than in my archive just yet — a state I've read about, heard about from friends, and mapped out more than once, but haven't travelled through myself. I'm keeping this page here deliberately, as a placeholder for a journey I intend to take soon.",
      "The forts, the desert light, the sheer scale of the architecture — everything about it suggests a place that photographs well and, from what I hear, feels even better in person.",
      "When that trip happens, this will be one of the more detailed pages on Wanderlouge. For now, it's an honest gap rather than a filled-in guess.",
    ],
    travelNotes: [
      "This page will be rewritten once the trip actually happens — for now it's notes gathered secondhand, not firsthand.",
      "On the list: Jodhpur's blue lanes, the dunes near Jaisalmer, and the lakes of Udaipur.",
    ],
    heroImage: {
      src: "/images/destinations/rajasthan.jpg",
      alt: "Illustrated impression of desert dunes at sunset",
      tone: "terracotta",
      variant: "desert",
      label: "Rajasthan",
    },
    galleryImages: [
      { src: "/images/destinations/rajasthan-1.jpg", alt: "Desert dunes under a warm sunset", tone: "terracotta", variant: "desert" },
    ],
  },
  {
    slug: "maharashtra",
    name: "Maharashtra",
    country: "India",
    tagline: "Western Ghats, hill forts, and roads that climb into the clouds.",
    description:
      "Monsoon-green hills, ancient hill forts, and waterfalls that appear only for a season.",
    longDescription: [
      "My visits to Maharashtra have mostly been short and monsoon-timed — chasing waterfalls that only exist for a few months a year, driving up ghat roads with the windows down and the hills disappearing into cloud a few metres ahead.",
      "There's a particular kind of green in the Western Ghats during July and August that I haven't seen matched anywhere else I've travelled — every hillside terraced, every valley filled with mist by mid-morning.",
      "I still owe this state a longer, more deliberate trip — one that isn't built entirely around chasing rain. That's next on the list.",
    ],
    travelNotes: [
      "Time a visit to the Western Ghats for peak monsoon if waterfalls are the goal — the difference from the dry season is dramatic.",
      "Roads here can turn slow and misty very quickly in the rains — build in extra time and drive carefully.",
    ],
    heroImage: {
      src: "/images/destinations/maharashtra.jpg",
      alt: "Green monsoon hills and cliffs of the Western Ghats in Maharashtra",
      tone: "forest",
      variant: "ghats",
      label: "Maharashtra",
    },
    galleryImages: [
      { src: "/images/destinations/maharashtra-1.jpg", alt: "Terraced green hills of the Western Ghats in monsoon", tone: "forest", variant: "ghats" },
    ],
  },
];
