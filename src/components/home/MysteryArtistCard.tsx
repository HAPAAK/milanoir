/**
 * MysteryArtistCard - Special treatment for unrevealed artist
 * Matches height of regular artist cards
 */

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { uiText } from "@/data/content";
import type { Artist } from "@/types/event";

interface MysteryArtistCardProps {
  artist: Artist;
  index: number;
}

const MysteryArtistCard = ({ artist, index }: MysteryArtistCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="relative group cursor-pointer h-full"
    >
      {/* Mysterious animated border */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl md:rounded-3xl"
        style={{
          background:
            "linear-gradient(135deg, hsl(280 80% 40% / 0.5), hsl(200 85% 45% / 0.3), hsl(280 80% 40% / 0.5))",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Card content - Auto height to fit all content */}
      <div className="relative glass-card rounded-2xl md:rounded-3xl border border-border/30 p-5 md:p-6 overflow-hidden h-full flex flex-col">
        {/* Cosmic cloud background */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, hsl(280 80% 50% / 0.15), transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-secondary/50"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              x: [-5, 5, -5],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Content container */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Mystery artist silhouette image - Fixed height to match */}
          {artist.imageUrl && (
            <motion.div
              className="relative overflow-hidden rounded-xl mb-4 h-52 md:h-56 flex-shrink-0"
              animate={{
                opacity: [0.7, 0.9, 0.7],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src={artist.imageUrl}
                alt="Mystery Artist"
                className="w-full h-full object-cover object-top filter brightness-0 invert opacity-80"
                loading="lazy"
              />
              {/* Cosmic overlay */}
              <div 
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse at 50% 50%, hsl(280 80% 50% / 0.3), transparent 70%)",
                }}
              />
            </motion.div>
          )}

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-3 flex-shrink-0">
            <Badge
              variant="secondary"
              className="bg-secondary/10 text-secondary border border-secondary/20 text-xs md:text-sm"
            >
              {artist.genre}
            </Badge>
            <Badge
              variant="outline"
              className="border-primary/30 text-primary animate-pulse text-xs md:text-sm"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              {uiText.artists.comingSoon}
            </Badge>
          </div>

          {/* Artist name */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold mb-2 flex-shrink-0">
            <span className="gradient-text">{uiText.artists.upcomingArtistLabel}</span>
          </h3>

          {/* Description - Full text without clipping */}
          <p className="text-sm text-muted-foreground leading-relaxed italic flex-grow">
            "{artist.description}"
          </p>

          {/* Decorative element - Matches play button area height */}
          <motion.div
            className="mt-4 h-10 md:h-12 flex items-center flex-shrink-0"
          >
            <motion.div
              className="w-full h-[2px] rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(280 80% 60% / 0.5), hsl(200 85% 55% / 0.5), transparent)",
              }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scaleX: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MysteryArtistCard;
