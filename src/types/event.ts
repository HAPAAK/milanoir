/**
 * Event and Artist type definitions
 * Extensible structure for managing multiple events and artists
 */

export interface Artist {
  id: string;
  name: string;
  genre: string;
  description: string;
  origin?: string;
  imageUrl?: string;
  spotifyTrackId?: string;
  soundcloudUrl?: string;
  isMystery: boolean;
}

export interface Venue {
  name: string;
  address: string;
  city: string;
  country: string;
  capacity?: number;
  mapUrl?: string;
}

export interface Event {
  id: string;
  title: string;
  subtitle?: string;
  date: Date;
  venue: Venue | null;
  artists: Artist[];
  isActive: boolean;
  ticketUrl?: string;
  notifyUrl?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
