/**
 * Centralized non-translatable content: artists, events, and navigation structure.
 * All user-facing UI text lives in src/locales/*.json via the i18n system.
 */

import type { Artist, Event, NavigationItem } from "@/types/event";

// Artist images
import mrDImage from "@/assets/artists/mr-d.jpeg";
import sacarImage from "@/assets/artists/sacar.jpeg";
import mysteryArtistImage from "@/assets/artists/mystery-artist.jpeg";

// Navigation items (labels resolved via t.nav[id] at render time)
export const navigationItems: NavigationItem[] = [
  { id: "home", href: "/" },
  { id: "about", href: "/about-us" },
  { id: "contact", href: "/contact" },
];

// Featured artists for Nepalese New Year 2083
export const artists: Artist[] = [
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
    id: "mystery-artist",
    name: "???",
    genre: "Experimental / Soulful Rap",
    description:
      "There's a presence that doesn't shout—it resonates. A voice that feels like dusk and dawn colliding. When he steps in, the energy shifts. You won't find him chasing the spotlight, but when the beat drops, it finds him. Cryptic. Cosmic. Calm. And yet, unforgettable.",
    origin: "TBA",
    imageUrl: mysteryArtistImage,
    isMystery: true,
  },
];

// Main event data
export const mainEvent: Event = {
  id: "nepalese-new-year-2083",
  title: "Nepalese New Year 2083",
  subtitle: "The Beginning of Infinity",
  date: new Date("2026-04-13T00:00:00+01:00"),
  venue: null,
  artists,
  isActive: true,
  ticketUrl: undefined,
  notifyUrl: undefined,
};
