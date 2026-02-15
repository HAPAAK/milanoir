import PageWrapper from "@/components/layout/PageWrapper";
import HeroSection from "@/components/about/HeroSection";
import StorySection from "@/components/about/StorySection";
import MissionSection from "@/components/about/MissionSection";
import DifferenceSection from "@/components/about/DifferenceSection";
import VisionSection from "@/components/about/VisionSection";
import ValuesSection from "@/components/about/ValuesSection";
import CommitmentSection from "@/components/about/CommitmentSection";
import FooterSection from "@/components/about/FooterSection";

const AboutPage = () => {
  return (
    <PageWrapper>
      <HeroSection />
      <StorySection />
      <MissionSection />
      <DifferenceSection />
      <VisionSection />
      <ValuesSection />
      <CommitmentSection />
      <FooterSection />
    </PageWrapper>
  );
};

export default AboutPage;
