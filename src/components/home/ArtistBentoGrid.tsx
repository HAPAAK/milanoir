/**
 * ArtistBentoGrid - Equal-sized artist cards in horizontal layout
 * All cards same height with hover audio preview
 */

import { useState } from "react";
import { motion } from "framer-motion";
import ArtistCard from "./ArtistCard";
import MysteryArtistCard from "./MysteryArtistCard";
import AudioPreviewModal from "./AudioPreviewModal";
import { useHoverAudio } from "@/hooks/useHoverAudio";
import { artists, uiText } from "@/data/content";
import type { Artist } from "@/types/event";

const ArtistBentoGrid = () => {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { playOnHover, stopOnLeave } = useHoverAudio();

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
        {/* Equal-sized horizontal grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Mr. D */}
          {regularArtists[0] && (
            <div
              onMouseEnter={() => playOnHover(regularArtists[0].id)}
              onMouseLeave={stopOnLeave}
            >
              <ArtistCard
                artist={regularArtists[0]}
                index={0}
                onPlayPreview={handlePlayPreview}
              />
            </div>
          )}

          {/* Sacar */}
          {regularArtists[1] && (
            <div
              onMouseEnter={() => playOnHover(regularArtists[1].id)}
              onMouseLeave={stopOnLeave}
            >
              <ArtistCard
                artist={regularArtists[1]}
                index={1}
                onPlayPreview={handlePlayPreview}
              />
            </div>
          )}

          {/* Mystery Artist */}
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
