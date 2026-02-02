import HeroSection from "@/components/about/HeroSection";
import StorySection from "@/components/about/StorySection";
import MissionSection from "@/components/about/MissionSection";
import DifferenceSection from "@/components/about/DifferenceSection";
import VisionSection from "@/components/about/VisionSection";
import ValuesSection from "@/components/about/ValuesSection";
import CommitmentSection from "@/components/about/CommitmentSection";
import FooterSection from "@/components/about/FooterSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <StorySection />
      <MissionSection />
      <DifferenceSection />
      <VisionSection />
      <ValuesSection />
      <CommitmentSection />
      <FooterSection />
    </main>
  );
};

export default Index;
