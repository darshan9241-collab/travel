import { resolvePhoto } from "@/lib/images";
import type { Story, PhotoInput } from "@/types";

type StoryInput = Omit<Story, "featuredImage" | "galleryImages"> & {
  featuredImage: PhotoInput;
  galleryImages: PhotoInput[];
};

const rawStories: StoryInput[] = [
  {
    slug: "mysore-palace-city-after-dark",
    title: "The Palace City After Dark",
    location: "Mysore",
    state: "Karnataka",
    country: "India",
    destinationSlug: "karnataka",
    date: "2025-11-08",
    excerpt:
      "Mysore Palace lit up on a Sunday evening, and a slow walk through markets that smelled of jasmine and sandalwood.",
    tags: ["Heritage", "Karnataka", "Palaces"],
    readingTime: 6,
    featuredImage: {
      src: "/images/stories/mysore-featured.jpg",
      alt: "Mysore Palace illuminated at dusk",
      tone: "gold",
      variant: "palace",
      label: "Mysore",
    },
    galleryImages: [
      { src: "/images/stories/mysore-1.jpg", alt: "Mysore Palace domes lit up against the night sky", tone: "gold", variant: "palace" },
      { src: "/images/stories/mysore-2.jpg", alt: "Devaraja Market stalls piled with flowers and spices", tone: "terracotta", variant: "palace" },
      { src: "/images/stories/mysore-3.jpg", alt: "A quiet palace courtyard in the early evening", tone: "dusk", variant: "palace" },
    ],
    content: [
      "I've seen Mysore Palace in photographs more times than I can count, the way most people from Karnataka probably have. But nothing quite prepares you for standing in front of it on a Sunday evening, right as the lights come on — nearly a hundred thousand bulbs tracing every dome and arch until the whole building looks like it's been drawn in gold ink against the dark.",
      "I'd timed the visit on purpose, arriving a little before sunset so I could watch the transition — the palace in ordinary daylight, sandstone and grey, and then the slow flicker as the lights switched on section by section. There's a small crowd that gathers for this every week, locals and visitors standing shoulder to shoulder, and for a few minutes nobody was on their phone. Everyone was just looking up.",
      "Before the lights, though, I spent the afternoon in Devaraja Market, a few minutes away by foot. It's not built for tourists, which is exactly what I liked about it — narrow aisles stacked with marigold garlands, mounds of turmeric and vermilion powder in impossibly bright colours, and the smell of jasmine strong enough to follow you out onto the street. A flower seller insisted I try threading a garland myself. I was terrible at it. He laughed, took it back, and finished it in about eight seconds.",
      "Mysore has a way of making history feel lived-in rather than roped off. Past the palace grounds, the city carries on with its ordinary business — tea stalls doing brisk trade, tailors with radios on, kids cycling home from school right past the walls of a former royal residence like it's just another building on the street. I liked that contrast more than I expected to.",
      "By the time I left, the palace lights had been switched off for the night, right on schedule — they only stay lit for a short window every evening. Walking back through streets that had gone quiet and slightly cooler, sandalwood incense still drifting out of a shop somewhere, I remember thinking that this was one of those places worth returning to more than once. Not for anything new to see, necessarily, but because the same walk feels different every time depending on the season, the light, and who you happen to be that day.",
      "If you go, don't just photograph the palace and leave. Sit somewhere nearby for a while after the lights go off. That's when the city exhales a little, and it's a good time to just watch it breathe.",
    ],
  },
  {
    slug: "coorg-mist-coffee-hills",
    title: "Mist, Coffee, and the Hills of Coorg",
    location: "Coorg",
    state: "Karnataka",
    country: "India",
    destinationSlug: "karnataka",
    date: "2025-08-22",
    excerpt:
      "A quiet homestay above a coffee estate, monsoon mist that never fully lifts, and mornings built entirely around filter coffee.",
    tags: ["Hills", "Coffee", "Karnataka", "Monsoon"],
    readingTime: 7,
    featuredImage: {
      src: "/images/stories/coorg-featured.jpg",
      alt: "Coffee estate hills wrapped in monsoon mist",
      tone: "forest",
      variant: "hills",
      label: "Coorg",
    },
    galleryImages: [
      { src: "/images/stories/coorg-1.jpg", alt: "Rows of coffee plants disappearing into fog", tone: "forest", variant: "hills" },
      { src: "/images/stories/coorg-2.jpg", alt: "Steam rising from a cup of filter coffee at dawn", tone: "gold", variant: "hills" },
      { src: "/images/stories/coorg-3.jpg", alt: "A narrow forest road winding through the hills", tone: "dusk", variant: "hills" },
    ],
    content: [
      "I went to Coorg during the monsoon, which I'm told is the wrong season by most standards — the waterfalls are swollen and brown, the roads get slippery, and half the usual viewpoints disappear into a wall of white. I'd argue it's the best time to go, if you're willing to trade a clear horizon for something quieter.",
      "The homestay I stayed at sat above a working coffee estate, and mornings there followed a rhythm that had nothing to do with my usual schedule. I'd wake up to the sound of rain on the tin roof, walk out to a narrow verandah, and just watch the mist move across rows of coffee plants like something being slowly erased and redrawn. The owner, an older man who'd been growing coffee on that land for over thirty years, would bring out a pot of filter coffee without being asked. We didn't talk much most mornings. We didn't need to.",
      "One afternoon, when the rain briefly let up, he offered to walk me through the estate. He pointed out coffee cherries at different stages of ripening, showed me pepper vines climbing up the same trees that shaded the coffee below, and talked about the harvest season coming up in a few months with the kind of quiet pride that comes from doing one thing for a very long time. I didn't take many photographs on that walk. I remember wishing, halfway through, that I'd left the camera behind entirely.",
      "Coorg's roads are a story of their own — narrow, winding, lined with areca palms and the occasional stray dog completely unbothered by traffic. Driving through them in heavy mist meant slowing to a crawl more than once, headlights barely cutting a few metres ahead. It should have been stressful. Instead it felt strangely calming, like the fog was giving me permission to stop rushing toward anything.",
      "Food here deserves its own mention — pandi curry, a fiery Kodava pork preparation, eaten with akki roti at a small family-run place that had no menu, just whatever was cooking that day. The owner's daughter translated the day's options for me since I don't speak Kodava, and seemed amused that I went back for a second helping.",
      "I left Coorg without having seen most of what a typical itinerary would include — no crowded viewpoint photos, no waterfall selfies. What I did leave with was a fairly stubborn belief that the best way to experience a hill station is to stop treating it like a checklist and just let the pace of the place take over for a few days.",
    ],
  },
  {
    slug: "goa-slow-mornings-on-the-coast",
    title: "Slow Mornings on the Goan Coast",
    location: "Goa",
    state: "Goa",
    country: "India",
    destinationSlug: "goa",
    date: "2025-05-14",
    excerpt:
      "Fishing boats at dawn, faded Portuguese lanes in Fontainhas, and a version of Goa that has nothing to do with nightlife.",
    tags: ["Coast", "Goa", "Food"],
    readingTime: 6,
    featuredImage: {
      src: "/images/stories/goa-featured.jpg",
      alt: "Goan beach at sunrise with fishing boats",
      tone: "terracotta",
      variant: "coast",
      label: "Goa",
    },
    galleryImages: [
      { src: "/images/stories/goa-1.jpg", alt: "Fishing boats returning to shore at sunrise", tone: "terracotta", variant: "coast" },
      { src: "/images/stories/goa-2.jpg", alt: "A colourful Portuguese-era house in Fontainhas", tone: "gold", variant: "coast" },
      { src: "/images/stories/goa-3.jpg", alt: "Waves catching the last light of the day", tone: "dusk", variant: "coast" },
    ],
    content: [
      "I set an alarm for 5:45 a.m. on holiday, which tells you something about how badly I wanted this particular morning. The beach near where I was staying, usually lined with sunbeds and umbrellas by mid-morning, was empty except for a handful of fishermen pulling their boats in after a night out on the water.",
      "There's a version of Goa that exists almost entirely between 6 and 8 a.m., before the beach shacks open and before the tourist buses arrive — cool sand, quiet water, and a handful of locals going about work that has nothing to do with holidaymakers at all. I sat on an overturned boat for the better part of an hour, just watching the catch get sorted into baskets, occasionally asked to move out of the way, always in good humour.",
      "Later that day, I drove up to Fontainhas, the old Latin Quarter in Panjim, mostly on a recommendation from a friend who said it felt like a different country entirely. She wasn't exaggerating. Narrow lanes lined with houses in faded ochre, blue, and green, laundry strung between balconies, a church bell somewhere in the distance — it felt closer to a small European town than anything I associated with Goa's coastline a few kilometres away.",
      "I ended up spending nearly three hours there with no real plan, which is unusual for me. I stopped for a plate of prawn balchão at a small café that looked like someone's converted living room, got mildly lost twice, and found a bookshop tucked into what used to be a family home. None of it was on an itinerary. All of it turned out to be the best part of the day.",
      "By evening, back on the coast, the beach had filled in with the usual crowd, music drifting out from a shack down the shoreline. I didn't mind it — that's Goa too, and there's nothing wrong with it. But I found myself thinking about the quiet of the morning instead, the boats and the empty sand, and how easy it is to miss that version of the place if you're not willing to wake up early enough to catch it.",
      "Goa gets reduced to a single story so often — parties, beaches, a weekend away from routine. It has that story if you want it. It also has this quieter one, running alongside it the entire time, mostly ignored. I'd go back for the second one alone.",
    ],
  },
  {
    slug: "on-the-road-through-karnataka",
    title: "On the Road Through Karnataka",
    location: "Hampi",
    state: "Karnataka",
    country: "India",
    destinationSlug: "karnataka",
    date: "2026-01-30",
    excerpt:
      "A long drive across the state to Hampi, where boulder-strewn hills hide a five-hundred-year-old city hiding in plain sight.",
    tags: ["Road Trip", "Heritage", "Karnataka"],
    readingTime: 8,
    featuredImage: {
      src: "/images/stories/hampi-featured.jpg",
      alt: "Ancient temple ruins among boulders at Hampi",
      tone: "dusk",
      variant: "palace",
      label: "Hampi",
    },
    galleryImages: [
      { src: "/images/stories/hampi-1.jpg", alt: "Stone chariot at Vittala Temple, Hampi", tone: "dusk", variant: "palace" },
      { src: "/images/stories/hampi-2.jpg", alt: "Boulder hills at sunset near Hampi", tone: "terracotta", variant: "ghats" },
      { src: "/images/stories/hampi-3.jpg", alt: "A quiet road through the ruins at dawn", tone: "gold", variant: "palace" },
    ],
    content: [
      "The drive to Hampi from Bangalore takes the better part of a day if you don't rush it, and I made a point not to. Long drives across Karnataka have their own rhythm — highway giving way to smaller roads, roadside dhabas appearing right when you start thinking about food, the landscape flattening out into dry scrubland long before the boulders start.",
      "Nothing quite prepares you for the boulders, though. They begin appearing gradually, first a few scattered on the horizon, then entire hillsides made of nothing but enormous rounded granite stones stacked in improbable balance. It looks less like a natural landscape and more like the set of something. I pulled over twice just to look, which is not something I usually do on a schedule-bound drive.",
      "Hampi itself, the ruined capital of the Vijayanagara Empire, sits scattered across this landscape rather than contained within it. Temples, market streets, elephant stables, and royal platforms are spread across several kilometres, separated by fields and boulders rather than neatly fenced into a single site. I rented a bicycle on the second morning, which turned out to be the right call — a car would have made the whole place feel smaller than it is.",
      "The Vittala Temple, with its famous stone chariot and musical pillars, draws the largest crowds, and rightly so. But some of my favourite hours were spent well away from it — cycling along a canal path past the Achyutaraya Temple with almost nobody else around, or climbing Matanga Hill before sunrise, when the ruins below were still just shapes in the half-light.",
      "I got caught in a conversation with a chai stall owner near the Virupaksha Temple who'd grown up in the area and had opinions about which ruins were overrated and which ones tourists usually miss. He sent me to a small shrine tucked behind a boulder formation that wasn't marked on any map I had. It took some scrambling to get there, and I'm still not entirely sure I found the right one, but the detour was worth it regardless.",
      "Evenings in Hampi are their own reward — the boulders catch the last light and turn a deep orange-red, and the whole landscape seems to hold its heat and colour a little longer than you'd expect. I sat on a rock near the river one evening with nothing planned, watching the colour drain slowly out of the hills, and didn't feel the need to photograph most of it. Some of it I just wanted to keep for myself.",
      "Driving back to Bangalore two days later, I found myself already planning a return — there's more of Karnataka's interior I haven't seen, more small towns between the highway exits that deserve more than a glance through a car window. Hampi confirmed something I already suspected: this state rewards patience far more than it rewards a checklist.",
    ],
  },
];

// Stories aren't published yet — the site shows a "coming soon" placeholder
// instead. The draft content above stays intact; flip this to `true` (or
// just add real entries to rawStories) whenever the blog is ready to go live.
const PUBLISH_STORIES = false;

export const stories: Story[] = PUBLISH_STORIES
  ? rawStories.map((story) => ({
      ...story,
      featuredImage: resolvePhoto(story.featuredImage),
      galleryImages: story.galleryImages.map(resolvePhoto),
    }))
  : [];

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((story) => story.slug === slug);
}

export function getStoriesByDestination(destinationSlug: string): Story[] {
  return stories
    .filter((story) => story.destinationSlug === destinationSlug)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getSortedStories(): Story[] {
  return [...stories].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAdjacentStories(slug: string): { prev: Story | null; next: Story | null } {
  const sorted = getSortedStories();
  const index = sorted.findIndex((story) => story.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}

export function getRelatedStories(story: Story, limit = 3): Story[] {
  return stories
    .filter((s) => s.slug !== story.slug)
    .sort((a, b) => {
      const aScore = a.destinationSlug === story.destinationSlug ? 1 : 0;
      const bScore = b.destinationSlug === story.destinationSlug ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, limit);
}
