/**
 * Home - Main event landing page
 * Features: Hero with countdown, Artist bento grid, Theme music
 */

import PageWrapper from "@/components/layout/PageWrapper";
import EventHero from "@/components/home/EventHero";
import ArtistBentoGrid from "@/components/home/ArtistBentoGrid";
import FooterSection from "@/components/about/FooterSection";
import ThemeMusicPlayer from "@/components/home/ThemeMusicPlayer";

const Home = () => {
  return (
    <PageWrapper>
      <ThemeMusicPlayer />
      <EventHero />
      <ArtistBentoGrid />
      <FooterSection />
    </PageWrapper>
  );
};

export default Home;
