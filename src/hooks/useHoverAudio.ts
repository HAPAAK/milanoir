/**
 * useHoverAudio - Hook to play audio on hover
 * Manages a single audio instance for hover previews
 */

import { useRef, useCallback } from "react";

const THEME_SONG_URL = "/audio/theme-song.mp3";
const START_TIME_SECONDS = 32;

export const useHoverAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentArtistRef = useRef<string | null>(null);

  const playOnHover = useCallback((artistId: string) => {
    // If already playing for this artist, skip
    if (currentArtistRef.current === artistId && audioRef.current) {
      return;
    }

    // Stop any existing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // Create and play new audio
    const audio = new Audio(THEME_SONG_URL);
    audio.volume = 0.4;
    audio.currentTime = START_TIME_SECONDS;
    audioRef.current = audio;
    currentArtistRef.current = artistId;

    audio.play().catch((error) => {
      console.log("Audio play failed:", error);
    });
  }, []);

  const stopOnLeave = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      currentArtistRef.current = null;
    }
  }, []);

  return { playOnHover, stopOnLeave };
};

export default useHoverAudio;
