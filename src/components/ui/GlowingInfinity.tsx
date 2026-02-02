import { motion } from "framer-motion";
import glowingInfinityBg from "@/assets/glowing-infinity-bg.png";
import { useMemo } from "react";

interface Sparkle {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  size: number;
  duration: number;
  delay: number;
}

interface GlowingInfinityProps {
  isFixed?: boolean;
}

const GlowingInfinity = ({ isFixed = true }: GlowingInfinityProps) => {
  // Generate sparkles with unique non-overlapping paths
  const sparkles = useMemo<Sparkle[]>(() => {
    const regions = [
      // Top left region
      { x: [5, 20], y: [10, 30] },
      // Top right region
      { x: [75, 95], y: [10, 30] },
      // Bottom left region
      { x: [5, 25], y: [65, 85] },
      // Bottom right region
      { x: [70, 95], y: [65, 85] },
      // Left side
      { x: [3, 15], y: [35, 60] },
      // Right side
      { x: [85, 97], y: [35, 60] },
      // Top center left
      { x: [25, 40], y: [5, 20] },
      // Top center right
      { x: [55, 75], y: [5, 20] },
      // Bottom center left
      { x: [25, 40], y: [80, 95] },
      // Bottom center right
      { x: [55, 75], y: [80, 95] },
    ];

    return Array.from({ length: 20 }, (_, i) => {
      const region = regions[i % regions.length];
      const startX = region.x[0] + Math.random() * (region.x[1] - region.x[0]);
      const startY = region.y[0] + Math.random() * (region.y[1] - region.y[0]);
      // Move within own region only
      const endX = region.x[0] + Math.random() * (region.x[1] - region.x[0]);
      const endY = region.y[0] + Math.random() * (region.y[1] - region.y[0]);
      
      return {
        id: i,
        startX,
        startY,
        endX,
        endY,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 4 + 4,
        delay: Math.random() * 3,
      };
    });
  }, []);

  return (
    <div className={`${isFixed ? 'fixed' : 'absolute'} inset-0 flex items-center justify-center pointer-events-none overflow-hidden`}>
      {/* Dark overlay base */}
      <div className="absolute inset-0 bg-background/60" />

      {/* Glowing infinity background image */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.img
          src={glowingInfinityBg}
          alt=""
          className="w-[90%] md:w-[70%] lg:w-[60%] max-w-[900px] h-auto object-contain"
          style={{
            filter: "brightness(0.7) saturate(1.3)",
          }}
          animate={{
            opacity: [0.5, 0.7, 0.5],
            filter: [
              "brightness(0.7) saturate(1.3) drop-shadow(0 0 40px hsl(220 90% 60% / 0.5))",
              "brightness(0.85) saturate(1.4) drop-shadow(0 0 60px hsl(280 85% 55% / 0.6))",
              "brightness(0.7) saturate(1.3) drop-shadow(0 0 40px hsl(220 90% 60% / 0.5))",
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Glow overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, hsl(220 90% 50% / 0.1), transparent 60%)",
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blue/cyan sparkles moving in their own regions */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            background: sparkle.id % 2 === 0 
              ? "hsl(200 100% 75%)" 
              : "hsl(185 95% 70%)",
            boxShadow: `0 0 ${sparkle.size * 5}px ${sparkle.size * 2}px ${
              sparkle.id % 2 === 0 
                ? "hsl(200 100% 60% / 0.8)" 
                : "hsl(185 95% 55% / 0.8)"
            }`,
          }}
          initial={{
            left: `${sparkle.startX}%`,
            top: `${sparkle.startY}%`,
          }}
          animate={{
            left: [`${sparkle.startX}%`, `${sparkle.endX}%`, `${sparkle.startX}%`],
            top: [`${sparkle.startY}%`, `${sparkle.endY}%`, `${sparkle.startY}%`],
            opacity: [0.5, 1, 0.5],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default GlowingInfinity;
