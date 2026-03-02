/**
 * Centralized non-translatable content: artists, events, and navigation structure.
 * All user-facing UI text lives in src/locales/*.json via the i18n system.
 */

import type { Artist, Event, Host, NavigationItem } from "@/types/event";

// Artist images
import mrDImage from "@/assets/artists/mr-d.jpeg";
import sacarImage from "@/assets/artists/sacar.jpeg";
import vtenImage from "@/assets/artists/vten.png";

// Host images
import sydneyImage from "@/assets/host/sydney-gurung.png";

// Navigation items (labels resolved via t.nav[id] at render time)
export const navigationItems: NavigationItem[] = [
  { id: "home", href: "/" },
  { id: "about", href: "/about-us" },
  { id: "contact", href: "/contact" },
];

// Featured artists for Nepalese New Year 2083
export const artists: Artist[] = [
  {
    id: "vten",
    name: "VTEN (Samir Ghising)",
    genre: "Hip-Hop / Rap",
    description:
      "VTEN is one of Nepal\u2019s most influential hip\u2011hop voices \u2014 a cultural disruptor whose raw honesty, street\u2011level storytelling, and fearless attitude reshaped the nation\u2019s rap landscape. Rising from the outskirts of Kathmandu, he built a movement with tracks like \u2018Hami Yestai Ta Honi Bro,\u2019 \u2018Yatra,\u2019 and \u2018Superstar,\u2019 blending gritty realism with melodic hooks that resonate across generations. His journey from controversy and arrest to international tours turned him into a symbol of artistic freedom and youth expression. VTEN\u2019s music bridges Nepal\u2019s underground grit with global hip\u2011hop energy, making him a defining figure of modern Nephop.",
    origin: "Kathmandu, Nepal",
    imageUrl: vtenImage,
    spotifyTrackId: "3L9JCjxy0VeTIDHXwtD50G",
    isMystery: false,
  },
  {
    id: "sacar-lil-buddha",
    name: "Sacar aka Lil Buddha",
    genre: "Hip-Hop / Rap",
    description:
      "Kathmandu-born and Sydney-based, Lil Buddha is a bilingual rap phenom known for his fiery freestyles and authentic storytelling. His music bridges cultures and continents, delivering powerful narratives that resonate with audiences worldwide.",
    origin: "Kathmandu / Sydney",
    imageUrl: sacarImage,
    spotifyTrackId: "7q35Cd6mgVfZfeTfzki0ij",
    isMystery: false,
  },
  {
    id: "mr-d",
    name: "Mr. D",
    genre: "Rap / Hip-Hop",
    description:
      "From the streets of Hetauda to stages across Nepal and beyond, Mr. D is a lyrical force who blends raw emotion with razor-sharp storytelling. His tracks like 'Gobar Lyath' and 'Bandai Cha Nepal' speak truth to power, making him a voice for the unheard and a rebel with rhythm.",
    origin: "Hetauda, Nepal",
    imageUrl: mrDImage,
    spotifyTrackId: "4BCEDbMGVmwuKX6E9LpMJy",
    isMystery: false,
  }
];

// Event host
export const host: Host = {
  id: "sydney-gurung",
  name: "Sydney Gurung",
  role: "Host",
  description:
    "Sydney Gurung is a dynamic Nepali presenter and content creator based in London, known for her confident on\u2011camera presence and her ability to connect effortlessly with diverse audiences. With a background in event planning, public speaking, and social media strategy, she brings a polished, modern, and globally aware energy to every stage she steps on. Her work spans lifestyle content, beauty collaborations, and creative digital storytelling \u2014 showcasing her natural charisma and ease in front of the camera. Multilingual and culturally versatile, Sydney represents the new generation of Nepali diaspora talent shaping international creative spaces.",
  origin: "London, UK",
  imageUrl: sydneyImage,
};

// Main event data
export const mainEvent: Event = {
  id: "nepalese-new-year-2083",
  title: "Nepalese New Year 2083",
  subtitle: "The Beginning of Infinity",
  date: new Date("2026-04-13T00:00:00+01:00"),
  venue: null,
  artists,
  isActive: true,
  ticketUrl: "https://buytickets.at/milanoireventszlimited/2096833",
  notifyUrl: undefined,
};
