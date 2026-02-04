/**
 * ArtistCard - Uniform artist display with glassmorphism
 * Equal height cards with consistent image sizing
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { uiText } from "@/data/content";
import type { Artist } from "@/types/event";

interface ArtistCardProps {
  artist: Artist;
  index: number;
  onPlayPreview: (artist: Artist) => void;
}

const ArtistCard = ({
  artist,
  index,
  onPlayPreview,
}: ArtistCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect - image moves slower than scroll
  const imageY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="relative group cursor-pointer h-full"
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, hsl(330 85% 60%), hsl(280 80% 55%), hsl(200 85% 55%), hsl(185 85% 50%))",
          backgroundSize: "300% 300%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Card content - Fixed height */}
      <div className="relative glass-card rounded-2xl md:rounded-3xl border border-border/50 group-hover:border-transparent transition-all duration-300 overflow-hidden h-full p-5 md:p-6 flex flex-col min-h-[520px] md:min-h-[560px]">
        {/* Cosmic glow on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, hsl(330 85% 60% / 0.1), transparent 50%), radial-gradient(circle at 70% 70%, hsl(200 85% 55% / 0.1), transparent 50%)",
          }}
        />

        {/* Content container */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Artist image - Fixed height */}
          {artist.imageUrl && (
            <motion.div
              className="relative overflow-hidden rounded-xl mb-4 h-48 md:h-52 flex-shrink-0"
              style={{ y: imageY }}
            >
              <img
                src={artist.imageUrl}
                alt={artist.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
            </motion.div>
          )}

          {/* Genre badge */}
          <Badge
            variant="secondary"
            className="self-start mb-3 bg-primary/10 text-primary border border-primary/20 text-xs md:text-sm flex-shrink-0"
          >
            {artist.genre}
          </Badge>

          {/* Artist name with gradient */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold gradient-text mb-2 flex-shrink-0">
            {artist.name}
          </h3>

          {/* Origin badge */}
          {artist.origin && (
            <span className="text-xs md:text-sm text-muted-foreground mb-3 flex-shrink-0">
              {artist.origin}
            </span>
          )}

          {/* Description - Flexible height with line clamp */}
          <p className="text-sm text-muted-foreground leading-relaxed flex-grow line-clamp-5">
            {artist.description}
          </p>

          {/* Play preview button */}
          {!artist.isMystery && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 flex-shrink-0"
            >
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayPreview(artist);
                }}
                variant="ghost"
                className="group/btn flex items-center gap-2 px-4 py-2 h-auto text-sm md:text-base text-primary hover:text-primary hover:bg-primary/10 transition-all duration-300"
                aria-label={`${uiText.artists.playPreview} - ${artist.name}`}
              >
                <motion.div
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover/btn:bg-primary/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-4 h-4 md:w-5 md:h-5 fill-current ml-0.5" />
                </motion.div>
                <span className="hidden sm:inline">
                  {uiText.artists.playPreview}
                </span>
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistCard;
