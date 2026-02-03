/**
 * PageWrapper - Consistent page structure with cosmic background
 * Includes: GlowingInfinity, StarField, ShootingStars
 * Handles left margin adjustment for side navigation
 */

import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TopNavigation from "./TopNavigation";
import GlowingInfinity from "@/components/ui/GlowingInfinity";
import StarField from "@/components/ui/StarField";
import ShootingStars from "@/components/ui/ShootingStars";

interface PageWrapperProps {
  children: ReactNode;
  /** Whether to show top navigation */
  showNavigation?: boolean;
}

const PageWrapper = ({ children, showNavigation = true }: PageWrapperProps) => {
  const { scrollY } = useScroll();
  
  // Parallax effect for background - moves at 0.5x scroll speed
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Fixed cosmic background with parallax */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{ y: backgroundY }}
      >
        <GlowingInfinity isFixed={false} />
      </motion.div>
      
      {/* Static star field and shooting stars */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <StarField count={200} />
        <ShootingStars count={3} interval={5} />
      </div>

      {/* Top navigation */}
      {showNavigation && <TopNavigation />}

      {/* Main content */}
      <main className="relative z-10 min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default PageWrapper;
