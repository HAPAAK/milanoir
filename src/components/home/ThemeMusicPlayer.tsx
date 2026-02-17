/**
 * ThemeMusicPlayer - Background music controlled by the nav bar "Vibe Mode" button.
 * Does NOT autoplay. User must explicitly opt in via the navigation toggle.
 * Pauses when artist preview modal opens, resumes when it closes.
 * Broadcasts playback state via "themeMusicState" custom event.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { PAUSE_THEME_MUSIC, RESUME_THEME_MUSIC, TOGGLE_THEME_MUSIC } from "@/lib/audioEvents";

const THEME_SONG_URL = "/audio/theme-song.mp3";
const START_TIME_SECONDS = 32;

const ThemeMusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const wasPlayingBeforePauseRef = useRef(false);
  const isExternallyPausedRef = useRef(false);

  // Broadcast playback state so nav buttons can reflect it
  const broadcastState = useCallback((playing: boolean) => {
    window.dispatchEvent(
      new CustomEvent("themeMusicState", { detail: { playing } }),
    );
  }, []);

  const waitForMetadata = (audio: HTMLAudioElement) =>
    new Promise<void>((resolve) => {
      if (audio.readyState >= 1) { resolve(); return; }
      audio.addEventListener("loadedmetadata", () => resolve(), { once: true });
    });

  const waitForSeeked = (audio: HTMLAudioElement) =>
    new Promise<void>((resolve) => {
      if (!audio.seeking) { resolve(); return; }

      const onDone = () => { cleanup(); resolve(); };
      const cleanup = () => {
        audio.removeEventListener("seeked", onDone);
        audio.removeEventListener("error", onDone);
        window.clearTimeout(timeout);
      };
      const timeout = window.setTimeout(onDone, 750);
      audio.addEventListener("seeked", onDone);
      audio.addEventListener("error", onDone);
    });

  const seekToStart = useCallback(async (audio: HTMLAudioElement) => {
    await waitForMetadata(audio);

    if (Number.isFinite(audio.duration) && START_TIME_SECONDS >= audio.duration) {
      audio.currentTime = 0;
      return;
    }
    if (Math.abs(audio.currentTime - START_TIME_SECONDS) < 0.25) return;

    audio.currentTime = START_TIME_SECONDS;
    await waitForSeeked(audio);
  }, []);

  useEffect(() => {
    const audio = new Audio(THEME_SONG_URL);
    audio.loop = false;
    audio.preload = "auto";
    audio.volume = 0.25;
    audioRef.current = audio;

    // Loop from 32s onward (not 0s)
    const handleEnded = () => {
      if (!audioRef.current || isExternallyPausedRef.current) return;
      seekToStart(audioRef.current)
        .then(() => audioRef.current?.play())
        .catch(console.error);
    };

    // External pause (from artist preview modal)
    const handlePause = () => {
      isExternallyPausedRef.current = true;
      if (!audioRef.current) return;
      wasPlayingBeforePauseRef.current = !audioRef.current.paused;
      audioRef.current.pause();
      setIsPlaying(false);
      broadcastState(false);
    };

    // External resume (modal closed)
    const handleResume = () => {
      isExternallyPausedRef.current = false;
      if (!audioRef.current) return;
      if (wasPlayingBeforePauseRef.current) {
        audioRef.current.play().catch(console.error);
        setIsPlaying(true);
        broadcastState(true);
        wasPlayingBeforePauseRef.current = false;
      }
    };

    // Toggle from nav button
    const handleToggle = async () => {
      if (isExternallyPausedRef.current) return;
      const a = audioRef.current;
      if (!a) return;

      if (a.paused) {
        await seekToStart(a);
        await a.play().catch(console.error);
        setIsPlaying(true);
        broadcastState(true);
      } else {
        a.pause();
        setIsPlaying(false);
        broadcastState(false);
      }
    };

    audio.addEventListener("ended", handleEnded);
    window.addEventListener(PAUSE_THEME_MUSIC, handlePause);
    window.addEventListener(RESUME_THEME_MUSIC, handleResume);
    window.addEventListener(TOGGLE_THEME_MUSIC, handleToggle);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      window.removeEventListener(PAUSE_THEME_MUSIC, handlePause);
      window.removeEventListener(RESUME_THEME_MUSIC, handleResume);
      window.removeEventListener(TOGGLE_THEME_MUSIC, handleToggle);
      audio.pause();
      audio.src = "";
    };
  }, [seekToStart, broadcastState]);

  // No visible UI -- controlled entirely from the navigation bar buttons
  return null;
};

export default ThemeMusicPlayer;
