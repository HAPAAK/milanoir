import HeroSection from "@/components/about/HeroSection";
import StorySection from "@/components/about/StorySection";
import MissionSection from "@/components/about/MissionSection";
import DifferenceSection from "@/components/about/DifferenceSection";
import VisionSection from "@/components/about/VisionSection";
import ValuesSection from "@/components/about/ValuesSection";
import CommitmentSection from "@/components/about/CommitmentSection";
import FooterSection from "@/components/about/FooterSection";
import StarField from "@/components/ui/StarField";
import ShootingStars from "@/components/ui/ShootingStars";
import GlowingInfinity from "@/components/ui/GlowingInfinity";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden relative">
      {/* Fixed background effects that scroll with page */}
      <div className="absolute inset-0 pointer-events-none">
        <StarField count={200} />
        <ShootingStars count={3} interval={5} />
        <GlowingInfinity isFixed={false} />
      </div>
      
      <div className="relative z-10">
        <HeroSection />
        <StorySection />
        <MissionSection />
        <DifferenceSection />
        <VisionSection />
        <ValuesSection />
        <CommitmentSection />
        <FooterSection />
      </div>
    </main>
  );
};

export default Index;
