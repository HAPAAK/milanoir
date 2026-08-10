/**
 * Centralized non-translatable content: artists, events, and navigation structure.
 * All user-facing UI text lives in src/locales/*.json via the i18n system.
 */

import type { Artist, Event, Host, NavigationItem } from "@/types/event";

// Artist images
import samikshyaImage from "@/assets/artists/samikshya-adhikari.jpeg";
import durgeshImage from "@/assets/artists/durgesh-thapa.webp";
import badriImage from "@/assets/artists/badri-pangeni.jpg";

// TODO(Teej): still waiting on a photo of Lalana Chimariya (the host).
import artistPlaceholder from "@/assets/artist-placeholder.jpg";

// Navigation items (labels resolved via t.nav[id] at render time)
export const navigationItems: NavigationItem[] = [
  { id: "home", href: "/" },
  { id: "about", href: "/about-us" },
  { id: "contact", href: "/contact" },
];

// Featured artists for Teej Dhamaka 2083
export const artists: Artist[] = [
  {
    id: "samikshya-adhikari",
    name: "Samikshya Adhikari",
    genre: "Lok Pop / Teej Geet",
    description:
      "Samikshya Adhikari is the voice of modern Teej. Breaking through as a teenager with ‘Balapan Ko Umer’ from Nai Nabhannu La 4, she has become the singer whose Teej releases define the season — ‘Aamaile Diyeko Maya’, ‘Bhet Huna Aaisyo Hai Raja’, ‘Yo Teej Aayo’ — songs that fill courtyards and living rooms from Kathmandu to Kentish Town every Bhadra. Her voice carries the old lok feeling with a young edge, which is exactly why a generation of Nepali women hear their own Teej in it. On stage she is pure energy, and this is her Teej.",
    origin: "Kathmandu, Nepal",
    imageUrl: samikshyaImage,
    // TODO(Teej): add Spotify track id for the Play Preview.
    isMystery: false,
  },
  {
    id: "durgesh-thapa",
    name: "Durgesh Thapa",
    genre: "Lok Pop / Dohori",
    description:
      "Durgesh Thapa is the man who dragged Nepali folk onto the dancefloor. Born in Sikkim and raised in Baglung, he built the modern lok‑pop sound — folk rhythm, pop production, lyrics that sound like something your uncle would actually say. ‘Bicha Bichama’, ‘Dushman Hereko Herai’, ‘Don Aayo Don’ and the Teej hit ‘Kacho Katar’ are the songs that reliably empty the seats and fill the floor. Few performers in Nepal command a live crowd the way he does — expect noise.",
    origin: "Kathmandu, Nepal",
    imageUrl: durgeshImage,
    // TODO(Teej): add Spotify track id for the Play Preview.
    isMystery: false,
  },
  {
    id: "badri-pangeni",
    name: "Badri Pangeni",
    genre: "Lok Dohori",
    description:
      "Badri Pangeni is lok dohori royalty. From Nawalparasi to Palpa to six years singing in Kathmandu’s dohori sanjh, he built a career on the real thing — call‑and‑response, sharp wit, and a voice that has carried ‘Tansen Kasauli’, ‘Beauty Number One’, ‘Photo Firta Leu’ and ‘Lau Cheli Rato Lau’ into the Nepali songbook. A former president of the National Folk & Duet Song Academy, he has also used Teej songs to say something, from ‘Motiram ra Jamuna’ onwards. When he trades verses live, the room answers back.",
    origin: "Palpa / Kathmandu, Nepal",
    imageUrl: badriImage,
    // TODO(Teej): add Spotify track id for the Play Preview.
    isMystery: false,
  }
];

// Event host
export const host: Host = {
  id: "lalana-chimariya",
  name: "Lalana Chimariya",
  role: "Host",
  // TODO(Teej): bio not supplied yet. Same shape as the artist bios:
  // who she is -> what she does -> why she fits this room.
  description: "",
  origin: "London, UK",
  // TODO(Teej): replace with lalana-chimariya photo when supplied.
  imageUrl: artistPlaceholder,
};

// Main event data
export const mainEvent: Event = {
  id: "teej-dhamaka-2083",
  title: "Teej Dhamaka 2083",
  subtitle: "The Beginning of Infinity",
  // TODO(Teej): 18:00 is a placeholder — confirm the real doors time and update.
  date: new Date("2026-09-11T18:00:00+01:00"),
  venue: {
    name: "The Royal Regency",
    address: "Manor Park",
    city: "London",
    country: "United Kingdom",
  },
  artists,
  isActive: true,
  ticketUrl: "https://sahisearch.com/events/teej-dhamaka-2083-1784675101-71",
  notifyUrl: undefined,
};
