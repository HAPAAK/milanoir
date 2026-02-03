/**
 * Home - Main event landing page
 * Features: Hero with countdown, Artist bento grid, Event info
 */

import PageWrapper from "@/components/layout/PageWrapper";
import EventHero from "@/components/home/EventHero";
import ArtistBentoGrid from "@/components/home/ArtistBentoGrid";
import EventInfo from "@/components/home/EventInfo";
import FooterSection from "@/components/about/FooterSection";

const Home = () => {
  return (
    <PageWrapper>
      <EventHero />
      <ArtistBentoGrid />
      <EventInfo />
      <FooterSection />
    </PageWrapper>
  );
};

export default Home;
