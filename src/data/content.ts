/**
 * Centralized content for internationalization and easy updates
 * All text strings used throughout the application
 */

import type { Artist, Event, NavigationItem } from "@/types/event";

// Navigation items
export const navigationItems: NavigationItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About Us", href: "/about-us" },
  { id: "contact", label: "Contact", href: "/contact" },
];

// Featured artists for Nepalese New Year 2082
export const artists: Artist[] = [
  {
    id: "mr-d",
    name: "Mr. D",
    genre: "Rap / Hip-Hop",
    description:
      "From the streets of Hetauda to stages across Nepal and beyond, Mr. D is a lyrical force who blends raw emotion with razor-sharp storytelling. His tracks like 'Gobar Lyath' and 'Bandai Cha Nepal' speak truth to power, making him a voice for the unheard and a rebel with rhythm.",
    origin: "Hetauda, Nepal",
    spotifyTrackId: "4PTG3Z6ehGkBFwjybzWkR8", // Example track ID - replace with actual
    isMystery: false,
  },
  {
    id: "sacar-lil-buddha",
    name: "Sacar aka Lil Buddha",
    genre: "Hip-Hop / Rap",
    description:
      "Kathmandu-born and Sydney-based, Lil Buddha is a bilingual rap phenom known for his fiery freestyles and authentic storytelling. His music bridges cultures and continents, delivering powerful narratives that resonate with audiences worldwide.",
    origin: "Kathmandu / Sydney",
    spotifyTrackId: "6habFhsOp2NvshLv26DqMb", // Example track ID - replace with actual
    isMystery: false,
  },
  {
    id: "mystery-artist",
    name: "???",
    genre: "Experimental / Soulful Rap",
    description:
      "There's a presence that doesn't shout—it resonates. A voice that feels like dusk and dawn colliding. When he steps in, the energy shifts. You won't find him chasing the spotlight, but when the beat drops, it finds him. Cryptic. Cosmic. Calm. And yet, unforgettable.",
    origin: "TBA",
    isMystery: true,
  },
];

// Main event data
export const mainEvent: Event = {
  id: "nepalese-new-year-2082",
  title: "Nepalese New Year 2082",
  subtitle: "The Beginning of Infinity",
  date: new Date("2026-04-14T00:00:00+01:00"), // April 14, 2026, UK time
  venue: null, // TBA
  artists: artists,
  isActive: true,
  ticketUrl: undefined,
  notifyUrl: undefined,
};

// UI Text strings
export const uiText = {
  // Hero section
  hero: {
    tagline: "Experience the celebration of a lifetime",
    location: "London, United Kingdom",
    dateLabel: "April 14, 2026",
    scrollCta: "Discover the lineup",
  },
  
  // Countdown
  countdown: {
    title: "Countdown to the celebration",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    eventPassed: "The event has begun!",
  },
  
  // Artists section
  artists: {
    sectionTitle: "Featured Artists",
    sectionSubtitle: "World-class performers bringing the energy",
    playPreview: "Play Preview",
    comingSoon: "Coming Soon",
    mysteryArtistLabel: "Mystery Artist",
  },
  
  // Event info
  eventInfo: {
    venueTitle: "Venue",
    venueTba: "To Be Announced",
    getNotified: "Get Notified",
    learnMore: "Learn More",
  },
  
  // Navigation
  nav: {
    home: "Home",
    about: "About Us",
    contact: "Contact",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
  
  // Audio modal
  audioModal: {
    nowPlaying: "Now Playing",
    close: "Close",
  },
  
  // Footer
  footer: {
    copyright: "© 2026 Milanoir Events. All rights reserved.",
  },
};

// Social links
export const socialLinks = {
  instagram: "https://instagram.com/milanoir",
  facebook: "https://facebook.com/milanoir",
  twitter: "https://twitter.com/milanoir",
};
