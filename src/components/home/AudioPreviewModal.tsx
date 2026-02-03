/**
 * AudioPreviewModal - Elegant Spotify/SoundCloud player modal
 * Uses Radix Dialog for accessibility with glassmorphism styling
 */

import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { uiText } from "@/data/content";
import type { Artist } from "@/types/event";

interface AudioPreviewModalProps {
  artist: Artist | null;
  isOpen: boolean;
  onClose: () => void;
}

const AudioPreviewModal = ({
  artist,
  isOpen,
  onClose,
}: AudioPreviewModalProps) => {
  if (!artist) return null;

  // Build Spotify embed URL with autoplay enabled
  const spotifyEmbedUrl = artist.spotifyTrackId
    ? `https://open.spotify.com/embed/track/${artist.spotifyTrackId}?utm_source=generator&theme=0&autoplay=1`
    : null;

  // Build SoundCloud embed URL (fallback) with autoplay enabled
  const soundcloudEmbedUrl = artist.soundcloudUrl
    ? `https://w.soundcloud.com/player/?url=${encodeURIComponent(
        artist.soundcloudUrl
      )}&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`
    : null;

  const embedUrl = spotifyEmbedUrl || soundcloudEmbedUrl;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-border/50 max-w-md p-0 overflow-hidden">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader className="p-6 pb-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  {uiText.audioModal.nowPlaying}
                </div>
                <DialogTitle className="text-2xl font-heading font-bold gradient-text">
                  {artist.name}
                </DialogTitle>
                <p className="text-sm text-muted-foreground">{artist.genre}</p>
              </DialogHeader>

              {/* Audio player embed */}
              <div className="px-6 pb-6">
                {embedUrl ? (
                  <div className="rounded-xl overflow-hidden bg-background/50">
                    <iframe
                      src={embedUrl}
                      width="100%"
                      height={spotifyEmbedUrl ? "152" : "166"}
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="rounded-xl"
                      title={`${artist.name} audio preview`}
                    />
                  </div>
                ) : (
                  <div className="glass-card rounded-xl p-8 text-center">
                    <p className="text-muted-foreground">
                      Audio preview coming soon...
                    </p>
                  </div>
                )}
              </div>

              {/* Decorative gradient */}
              <div
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, hsl(330 85% 60% / 0.05), transparent)",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default AudioPreviewModal;
