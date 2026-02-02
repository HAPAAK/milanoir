import { motion } from "framer-motion";
import infinityLogo from "@/assets/milanoir-logo-infinity.png";
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
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: 30 + Math.random() * 40, // Center around infinity
      y: 35 + Math.random() * 30,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 3,
    }));
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Deep space nebula glow - pink/magenta */}
      <motion.div
        className="absolute w-[700px] md:w-[900px] lg:w-[1200px] h-[400px] md:h-[550px] lg:h-[700px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, hsl(280 80% 50% / 0.15), hsl(300 70% 45% / 0.1), transparent 65%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Cyan/blue glow layer */}
      <motion.div
        className="absolute w-[600px] md:w-[800px] lg:w-[1000px] h-[350px] md:h-[450px] lg:h-[600px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, hsl(200 90% 55% / 0.12), hsl(185 85% 50% / 0.08), transparent 60%)",
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Purple core glow */}
      <motion.div
        className="absolute w-[500px] md:w-[700px] lg:w-[900px] h-[300px] md:h-[400px] lg:h-[550px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, hsl(260 85% 55% / 0.18), hsl(280 80% 50% / 0.1), transparent 55%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Main infinity image with glow */}
      <motion.img
        src={infinityLogo}
        alt=""
        className="absolute w-[350px] md:w-[500px] lg:w-[700px] h-auto"
        style={{
          filter: "blur(1px)",
          opacity: 0.25,
        }}
        animate={{
          opacity: [0.2, 0.35, 0.2],
          scale: [1, 1.03, 1],
          filter: [
            "blur(1px) drop-shadow(0 0 30px hsl(280 80% 55% / 0.5))",
            "blur(1px) drop-shadow(0 0 50px hsl(185 85% 50% / 0.6))",
            "blur(1px) drop-shadow(0 0 30px hsl(280 80% 55% / 0.5))",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Outer glow layer */}
      <motion.img
        src={infinityLogo}
        alt=""
        className="absolute w-[400px] md:w-[600px] lg:w-[850px] h-auto"
        style={{
          filter: "blur(25px)",
          opacity: 0.15,
        }}
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1.08, 1, 1.08],
        }}
        transition={{
          duration: 5,
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
            boxShadow: `0 0 ${sparkle.size * 3}px ${sparkle.size}px ${
              sparkle.id % 3 === 0 
                ? "hsl(185 90% 60% / 0.6)" 
                : sparkle.id % 3 === 1 
                  ? "hsl(280 85% 65% / 0.6)" 
                  : "hsl(330 85% 60% / 0.6)"
            }`,
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 80, 0],
            y: [0, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 50, 0],
            opacity: [0.3, 1, 0.8, 0.3],
            scale: [0.8, 1.3, 1, 0.8],
          }}
          transition={{
            duration: sparkle.duration + 2,
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
