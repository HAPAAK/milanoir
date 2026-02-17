import dynamic from "next/dynamic";
import PageWrapper from "@/components/layout/PageWrapper";
import EventHero from "@/components/home/EventHero";
import ArtistBentoGrid from "@/components/home/ArtistBentoGrid";
import Footer from "@/components/layout/Footer";

const ThemeMusicPlayer = dynamic(() => import("@/components/home/ThemeMusicPlayer"), { ssr: false });

const HomePage = () => {
  return (
    <PageWrapper>
      <ThemeMusicPlayer />
      <EventHero />
      <ArtistBentoGrid />
      <Footer />
    </PageWrapper>
  );
};

export default HomePage;
