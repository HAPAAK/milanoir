/**
 * ArtistBentoGrid - Equal-sized artist cards in horizontal layout
 * All cards same height, play preview opens Spotify modal
 */

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import ArtistCard from "./ArtistCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { artists } from "@/data/content";
import type { Artist } from "@/types/event";

const AudioPreviewModal = dynamic(() => import("./AudioPreviewModal"), { ssr: false });

const ArtistBentoGrid = () => {
  const { t } = useLanguage();
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlayPreview = (artist: Artist) => {
    setSelectedArtist(artist);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArtist(null);
  };

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold gradient-text">
            {t.artists.sectionTitle}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {artists.map((artist, index) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              index={index}
              onPlayPreview={handlePlayPreview}
            />
          ))}
        </div>

        <AudioPreviewModal
          artist={selectedArtist}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
};

export default ArtistBentoGrid;
