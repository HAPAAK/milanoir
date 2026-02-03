/**
 * ArtistBentoGrid - Asymmetric bento grid layout for artists
 * Desktop: 3 columns with Mr. D spanning 2 rows
 * Tablet: 2 columns, Mobile: 1 column stacked
 */

import { useState } from "react";
import { motion } from "framer-motion";
import ArtistCard from "./ArtistCard";
import MysteryArtistCard from "./MysteryArtistCard";
import AudioPreviewModal from "./AudioPreviewModal";
import { artists, uiText } from "@/data/content";
import type { Artist } from "@/types/event";

const ArtistBentoGrid = () => {
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

  // Separate mystery and regular artists
  const regularArtists = artists.filter((a) => !a.isMystery);
  const mysteryArtist = artists.find((a) => a.isMystery);

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container max-w-7xl mx-auto">

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Mr. D - Large card spanning 2 rows on desktop */}
          {regularArtists[0] && (
            <div className="lg:row-span-2">
              <ArtistCard
                artist={regularArtists[0]}
                index={0}
                onPlayPreview={handlePlayPreview}
                isLarge
              />
            </div>
          )}

          {/* Sacar - Regular card */}
          {regularArtists[1] && (
            <ArtistCard
              artist={regularArtists[1]}
              index={1}
              onPlayPreview={handlePlayPreview}
            />
          )}

          {/* Mystery Artist - Special card */}
          {mysteryArtist && (
            <MysteryArtistCard artist={mysteryArtist} index={2} />
          )}
        </div>

        {/* Audio preview modal */}
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
