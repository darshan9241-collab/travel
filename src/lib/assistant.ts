import { rawDestinations } from "@/data/destinations.raw";
import { rawStories, PUBLISH_STORIES } from "@/data/stories.raw";
import { searchSite } from "@/lib/search";

export interface AssistantLink {
  label: string;
  href: string;
}

export interface AssistantReply {
  text: string;
  links?: AssistantLink[];
}

function matchesAny(input: string, words: string[]): boolean {
  return words.some((word) => input.includes(word));
}

function findDestination(input: string) {
  return rawDestinations.find((destination) => input.includes(destination.name.toLowerCase()));
}

function getPublishedStories() {
  return PUBLISH_STORIES
    ? [...rawStories].sort((a, b) => (a.date < b.date ? 1 : -1))
    : [];
}

function getStoriesFor(destinationSlug: string) {
  return getPublishedStories().filter((story) => story.destinationSlug === destinationSlug);
}

export function getAssistantReply(rawInput: string): AssistantReply {
  const input = rawInput.trim().toLowerCase();

  if (!input) {
    return {
      text: "Ask me about a destination, a story, or how to get in touch — I'll point you the right way.",
    };
  }

  if (matchesAny(input, ["hi", "hello", "hey", "namaste"]) && input.length < 20) {
    return {
      text: "Hey there! I'm the Wanderlouge assistant. Ask me about a destination like Goa or Coorg, the latest stories, or how to reach Darshan.",
    };
  }

  if (matchesAny(input, ["how are you", "how're you", "how are u", "how you doing", "how's it going", "hows it going"])) {
    return {
      text: "I'm doing great, thanks for asking! Ready to help whenever you are — ask me about a destination, the blog, or how to reach Darshan.",
    };
  }

  if (matchesAny(input, ["thank you", "thanks", "thnx", "thx", "cheers"])) {
    return { text: "You're welcome! Let me know if there's anything else you'd like to know." };
  }

  if (matchesAny(input, ["bye", "goodbye", "see you", "cya", "take care"])) {
    return { text: "Safe travels! Come back anytime you have a question." };
  }

  if (
    matchesAny(input, ["your name", "who made you", "who created you", "are you a bot", "are you real", "are you human", "are you ai"]) &&
    !findDestination(input)
  ) {
    return {
      text: "I'm the Wanderlouge assistant — a small helper built into this site to answer questions about the journeys, not a general AI. I don't have a name of my own, but I know this site well!",
    };
  }

  if (matchesAny(input, ["joke", "funny", "make me laugh"]) && !findDestination(input)) {
    const jokes = [
      "Why do travellers make terrible comedians? Their jokes never land on time.",
      "What did the road trip say to the map? I've got you covered.",
      "Why did the coffee estate worker bring a ladder to Coorg? To reach the high notes in the mist.",
    ];
    return { text: jokes[Math.floor(Math.random() * jokes.length)] };
  }

  if (
    matchesAny(input, ["what time", "what's the time", "current time", "what date", "what's the date", "today's date", "what day is it"]) &&
    !findDestination(input)
  ) {
    const now = new Date();
    const date = now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const time = now.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
    return { text: `It's ${time} on ${date} (based on your device's clock).` };
  }

  if (
    matchesAny(input, ["what can you do", "what do you do", "help me", "capabilities", "how can you help"]) &&
    input.length < 60 &&
    !findDestination(input)
  ) {
    return {
      text: "I can talk about the destinations covered on Wanderlouge, point you to blog stories, help you find the gallery or contact page, and chat about general travel questions like packing or the best time to visit India. Just ask!",
    };
  }

  if (matchesAny(input, ["what to pack", "what should i pack", "packing list", "packing tips"])) {
    return {
      text: "A few general packing habits that hold up well across India: light, breathable layers over one heavy jacket, a reusable water bottle, power bank, basic first-aid, and one outfit you don't mind getting dusty. Pack lighter than you think you need to.",
    };
  }

  if (matchesAny(input, ["best time to visit india", "when to visit india", "best season"]) && !findDestination(input)) {
    return {
      text: "Broadly, October to March is the most comfortable window across most of India — cooler and drier. Monsoon (June–September) is beautiful in hill and coastal regions like Coorg and Goa if you don't mind rain, and summers (April–May) are best avoided in the plains.",
    };
  }

  if (matchesAny(input, ["currency", "language spoken", "what language"])) {
    return {
      text: "India's currency is the Indian Rupee (₹). Hindi and English are widely understood, though most states also have their own regional language — Karnataka speaks Kannada, for instance.",
    };
  }

  if (matchesAny(input, ["who are you", "who is darshan", "about darshan", "who runs"])) {
    return {
      text: "Wanderlouge is run by Darshan R., a traveller and storyteller from Bangalore who works as a Research Officer. This site is his personal travel journal — destinations, roads, food, and quiet moments, documented one journey at a time.",
      links: [{ label: "Read the full story", href: "/about" }],
    };
  }

  if (matchesAny(input, ["contact", "email", "reach", "phone", "get in touch", "collaborate"])) {
    return {
      text: "You can reach Darshan directly at wanderlouge@gmail.com, or use the contact form on the Contact page.",
      links: [{ label: "Go to Contact", href: "/contact" }],
    };
  }

  if (matchesAny(input, ["gallery", "photo", "picture", "image"])) {
    return {
      text: "The Gallery has a growing collection of photography from every destination covered so far.",
      links: [{ label: "Open Gallery", href: "/gallery" }],
    };
  }

  if (
    matchesAny(input, ["destination", "where have", "places", "which states", "which places", "travelled"]) &&
    !findDestination(input)
  ) {
    const names = rawDestinations.map((destination) => destination.name).join(", ");
    return {
      text: `So far Wanderlouge covers ${names}. Karnataka, Kerala, and Goa have the most first-hand stories — Rajasthan and Tamil Nadu are still on the list for a longer visit.`,
      links: [{ label: "See the Gallery", href: "/gallery" }],
    };
  }

  const destination = findDestination(input);
  if (destination) {
    const stories = getStoriesFor(destination.slug);
    const bestTip = destination.travelNotes[0];
    const wantsTiming = matchesAny(input, ["when", "best time", "season", "weather"]);
    const wantsTips = matchesAny(input, ["tip", "advice", "should i", "recommend"]);

    let text = `${destination.name}: ${destination.tagline} ${destination.description}`;
    if (wantsTiming || wantsTips) {
      text = `${destination.name} — ${bestTip}`;
    }

    const links: AssistantLink[] = [{ label: "See the Gallery", href: "/gallery" }];
    if (stories.length > 0) {
      links.push({ label: `Read: ${stories[0].title}`, href: `/blog/${stories[0].slug}` });
    }

    return { text, links };
  }

  if (matchesAny(input, ["blog", "story", "stories", "post", "article", "read"])) {
    const stories = getPublishedStories();
    if (stories.length === 0) {
      return {
        text: "New stories are on their way — Darshan is still writing them up. Check back soon, or subscribe on the Blog page.",
        links: [{ label: "Go to Blog", href: "/blog" }],
      };
    }
    const latest = stories[0];
    return {
      text: `The latest story is "${latest.title}" from ${latest.location}. ${latest.excerpt}`,
      links: [{ label: "Read it", href: `/blog/${latest.slug}` }],
    };
  }

  const matches = searchSite(rawInput, 3);
  if (matches.length > 0) {
    const top = matches[0];
    return {
      text: `Here's what I found for "${rawInput}": ${top.title} — ${top.subtitle ?? top.description}`,
      links: matches.map((match) => ({ label: match.title, href: match.href })),
    };
  }

  return {
    text: "I couldn't find anything on that. Try asking about a destination (Goa, Coorg, Hampi…), the blog, the gallery, or how to get in touch.",
  };
}
