/**
 * ThemeMusicPlayer - Background music that plays automatically
 * Starts at 32 seconds, pauses when artist preview modal opens
 * Exposes global pause/resume via custom events
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

const THEME_SONG_URL = "/audio/theme-song.mp3";
const START_TIME_SECONDS = 32;

// Custom events for external control
export const PAUSE_THEME_MUSIC = "pauseThemeMusic";
export const RESUME_THEME_MUSIC = "resumeThemeMusic";

const ThemeMusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControl, setShowControl] = useState(false);
  const [wasPlayingBeforePause, setWasPlayingBeforePause] = useState(false);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(THEME_SONG_URL);
    audio.loop = true;
    audio.volume = 0.25;
    audioRef.current = audio;

    // Set start time and try autoplay
    const tryAutoplay = async () => {
      audio.currentTime = START_TIME_SECONDS;
      try {
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

    // Listen for pause/resume events from modal
    const handlePause = () => {
      if (audioRef.current && !audioRef.current.paused) {
        setWasPlayingBeforePause(true);
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    const handleResume = () => {
      if (audioRef.current && wasPlayingBeforePause) {
        audioRef.current.play().catch(console.error);
        setIsPlaying(true);
        setWasPlayingBeforePause(false);
      }
    };

    window.addEventListener(PAUSE_THEME_MUSIC, handlePause);
    window.addEventListener(RESUME_THEME_MUSIC, handleResume);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener(PAUSE_THEME_MUSIC, handlePause);
      window.removeEventListener(RESUME_THEME_MUSIC, handleResume);
      audio.pause();
      audio.src = "";
    };
  }, [wasPlayingBeforePause]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.currentTime = START_TIME_SECONDS;
        audioRef.current.play().catch(console.error);
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
