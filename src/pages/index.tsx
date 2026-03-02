import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import EventHero from "@/components/home/EventHero";
import ArtistBentoGrid from "@/components/home/ArtistBentoGrid";
import HostCard from "@/components/home/HostCard";
import Footer from "@/components/layout/Footer";
import { host } from "@/data/content";
import { useLanguage } from "@/contexts/LanguageContext";

const ThemeMusicPlayer = dynamic(() => import("@/components/home/ThemeMusicPlayer"), { ssr: false });

const HomePage = () => {
  const { t } = useLanguage();

  return (
    <PageWrapper>
      <ThemeMusicPlayer />
      <EventHero />
      <ArtistBentoGrid />

      {/* Host section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold gradient-text">
              {t.host.sectionTitle}
            </h2>
          </motion.div>
          <HostCard host={host} />
        </div>
      </section>

      <Footer />
    </PageWrapper>
  );
};

export default HomePage;
