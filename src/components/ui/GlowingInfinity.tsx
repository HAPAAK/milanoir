import { motion } from "framer-motion";
import cosmicInfinityBg from "@/assets/cosmic-infinity-bg.png";
import { useMemo } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const GlowingInfinity = () => {
  // Generate sparkles that move around the infinity
  const sparkles = useMemo<Sparkle[]>(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: 20 + Math.random() * 60,
      y: 25 + Math.random() * 50,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 4,
    }));
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Cosmic infinity background image - moving and glowing */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.img
          src={cosmicInfinityBg}
          alt=""
          className="w-full h-full object-cover"
          style={{
            opacity: 0.35,
            minWidth: "120%",
            minHeight: "120%",
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 15, 0],
            opacity: [0.3, 0.4, 0.35, 0.3],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Overlay glow layer for pulsing effect */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background: "radial-gradient(ellipse at center, hsl(280 80% 50% / 0.08), transparent 70%)",
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Moving sparkles around the infinity */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            background: sparkle.id % 3 === 0 
              ? "hsl(185 90% 70%)" 
              : sparkle.id % 3 === 1 
                ? "hsl(280 85% 75%)" 
                : "hsl(330 85% 70%)",
            boxShadow: `0 0 ${sparkle.size * 4}px ${sparkle.size * 1.5}px ${
              sparkle.id % 3 === 0 
                ? "hsl(185 90% 60% / 0.7)" 
                : sparkle.id % 3 === 1 
                  ? "hsl(280 85% 65% / 0.7)" 
                  : "hsl(330 85% 60% / 0.7)"
            }`,
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 120, (Math.random() - 0.5) * 100, 0],
            y: [0, (Math.random() - 0.5) * 80, (Math.random() - 0.5) * 60, 0],
            opacity: [0.4, 1, 0.7, 0.4],
            scale: [0.8, 1.4, 1, 0.8],
          }}
          transition={{
            duration: sparkle.duration + 3,
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
