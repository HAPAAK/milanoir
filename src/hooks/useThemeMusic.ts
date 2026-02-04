/**
 * useThemeMusic - Hook to manage background theme music
 * Plays automatically from 32 seconds, stops on user interaction
 */

import { useEffect, useRef, useState } from "react";

const THEME_SONG_URL = "/audio/theme-song.mp3";
const START_TIME_SECONDS = 32;

export const useThemeMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(THEME_SONG_URL);
    audio.loop = true;
    audio.volume = 0.3; // Background volume
    audio.currentTime = START_TIME_SECONDS;
    audioRef.current = audio;

    // Try to autoplay
    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        // Autoplay blocked - will need user interaction
        console.log("Autoplay blocked, waiting for user interaction");
      }
    };

    tryAutoplay();

    // Stop on user interaction (scroll, click, etc.)
    const handleUserInteraction = () => {
      if (!hasUserInteracted && audioRef.current) {
        setHasUserInteracted(true);
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    // Listen for user interactions
    const events = ["click", "scroll", "touchstart", "keydown"];
    events.forEach((event) => {
      window.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleUserInteraction);
      });
      audio.pause();
      audio.src = "";
    };
  }, [hasUserInteracted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.currentTime = START_TIME_SECONDS;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return { isPlaying, togglePlay, hasUserInteracted };
};

export default useThemeMusic;
