/**
 * ThemeMusicPlayer - Background music that plays automatically
 * Starts at 32 seconds, pauses when artist preview modal opens
 * Exposes global pause/resume via custom events
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PAUSE_THEME_MUSIC, RESUME_THEME_MUSIC } from "@/lib/audioEvents";

const THEME_SONG_URL = "/audio/theme-song.mp3";
const START_TIME_SECONDS = 32;

// Custom events for external control
const ThemeMusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControl, setShowControl] = useState(false);
  const wasPlayingBeforePauseRef = useRef(false);
  const isExternallyPausedRef = useRef(false);

  const waitForMetadata = (audio: HTMLAudioElement) =>
    new Promise<void>((resolve) => {
      // HAVE_METADATA = 1
      if (audio.readyState >= 1) {
        resolve();
        return;
      }

      audio.addEventListener("loadedmetadata", () => resolve(), { once: true });
    });

  const waitForSeeked = (audio: HTMLAudioElement) =>
    new Promise<void>((resolve) => {
      // In some browsers, seeking completes asynchronously; if we call play() before
      // the seek finishes, playback may start from the previous position (often 0s).
      if (!audio.seeking) {
        resolve();
        return;
      }

      const onSeeked = () => {
        cleanup();
        resolve();
      };

      const onError = () => {
        cleanup();
        resolve();
      };

      const cleanup = () => {
        audio.removeEventListener("seeked", onSeeked);
        audio.removeEventListener("error", onError);
        window.clearTimeout(timeout);
      };

      // Safety timeout to avoid hanging if a browser never fires "seeked".
      const timeout = window.setTimeout(() => {
        cleanup();
        resolve();
      }, 750);

      audio.addEventListener("seeked", onSeeked);
      audio.addEventListener("error", onError);
    });

  const seekToStart = async (audio: HTMLAudioElement) => {
    await waitForMetadata(audio);

    // If the file is shorter than the start time (unexpected), fall back to 0.
    if (Number.isFinite(audio.duration) && START_TIME_SECONDS >= audio.duration) {
      audio.currentTime = 0;
      return;
    }

    // Skip re-seeking if we’re already close (reduces jitter).
    if (Math.abs(audio.currentTime - START_TIME_SECONDS) < 0.25) return;

    audio.currentTime = START_TIME_SECONDS;
    await waitForSeeked(audio);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Create audio element
    const audio = new Audio(THEME_SONG_URL);
    
    // NOTE: We do NOT use `audio.loop = true` because that would loop back to 0s.
    // We want it to continuously loop from 32s onward.
    audio.loop = false;
    audio.preload = "auto";
    audio.volume = 0.25;
    audioRef.current = audio;

    // Set start time and try autoplay
    const tryAutoplay = async () => {
      // If something (like the artist preview) requested a pause, do not start.
      if (isExternallyPausedRef.current) {
        setShowControl(true);
        return;
      }

      try {
        await seekToStart(audio);
        await audio.play();
        setIsPlaying(true);
        setShowControl(true);
      } catch (error) {
        // Autoplay blocked - show control for manual start
        console.log("Autoplay blocked, showing manual control");
        setShowControl(true);
      }
    };

    // Delay slightly to allow page load
    const timeout = setTimeout(tryAutoplay, 1000);

    // Keep looping from 32s onward (not from 0).
    const handleEnded = () => {
      const currentAudio = audioRef.current;
      if (!currentAudio) return;
      if (isExternallyPausedRef.current) return;

      seekToStart(currentAudio)
        .then(() => currentAudio.play())
        .catch(console.error);
    };

    // Listen for pause/resume events from modal
    const handlePause = () => {
      isExternallyPausedRef.current = true;

      const currentAudio = audioRef.current;
      if (!currentAudio) return;

      // Remember if we were playing so we can resume seamlessly.
      wasPlayingBeforePauseRef.current = !currentAudio.paused;
      currentAudio.pause();
      setIsPlaying(false);
    };

    const handleResume = () => {
      isExternallyPausedRef.current = false;

      const currentAudio = audioRef.current;
      if (!currentAudio) return;

      if (wasPlayingBeforePauseRef.current) {
        currentAudio.play().catch(console.error);
        setIsPlaying(true);
        wasPlayingBeforePauseRef.current = false;
      }
    };

    audio.addEventListener("ended", handleEnded);
    window.addEventListener(PAUSE_THEME_MUSIC, handlePause);
    window.addEventListener(RESUME_THEME_MUSIC, handleResume);

    return () => {
      clearTimeout(timeout);
      audio.removeEventListener("ended", handleEnded);
      window.removeEventListener(PAUSE_THEME_MUSIC, handlePause);
      window.removeEventListener(RESUME_THEME_MUSIC, handleResume);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const togglePlay = async () => {
    // Keep theme music paused while artist previews are active.
    if (isExternallyPausedRef.current) return;

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const audio = audioRef.current;
        await seekToStart(audio);
        audio.play().catch(console.error);
        setIsPlaying(true);
      }
    }
  };

  return (
    <AnimatePresence>
      {showControl && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-20 md:bottom-6 right-4 z-50"
        >
          <Button
            onClick={togglePlay}
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full glass-card border border-border/50 hover:border-primary/50 transition-all duration-300"
            aria-label={isPlaying ? "Mute theme music" : "Play theme music"}
          >
            <motion.div
              animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {isPlaying ? (
                <Volume2 className="w-5 h-5 text-primary" />
              ) : (
                <VolumeX className="w-5 h-5 text-muted-foreground" />
              )}
            </motion.div>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThemeMusicPlayer;
