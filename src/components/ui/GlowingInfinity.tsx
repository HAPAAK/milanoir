import { motion } from "framer-motion";
import glowingInfinityBg from "@/assets/glowing-infinity-bg.png";

interface GlowingInfinityProps {
  isFixed?: boolean;
}

const GlowingInfinity = ({ isFixed = true }: GlowingInfinityProps) => {
  return (
    <div className={`${isFixed ? 'fixed' : 'absolute'} inset-0 flex items-center justify-center pointer-events-none overflow-hidden`}>
      {/* Dark base layer */}
      <div className="absolute inset-0 bg-background" />

      {/* Rotating glow effect behind the infinity */}
      <motion.div
        className="absolute w-[600px] md:w-[800px] lg:w-[1000px] h-[400px] md:h-[500px] lg:h-[600px] rounded-full"
        style={{
          background: "conic-gradient(from 0deg, hsl(280 80% 50% / 0.3), hsl(200 90% 55% / 0.3), hsl(330 85% 55% / 0.3), hsl(280 80% 50% / 0.3))",
          filter: "blur(80px)",
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Secondary rotating glow - opposite direction */}
      <motion.div
        className="absolute w-[500px] md:w-[700px] lg:w-[900px] h-[350px] md:h-[450px] lg:h-[550px] rounded-full"
        style={{
          background: "conic-gradient(from 180deg, hsl(200 90% 55% / 0.25), hsl(280 80% 50% / 0.25), hsl(185 90% 50% / 0.25), hsl(200 90% 55% / 0.25))",
          filter: "blur(60px)",
        }}
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Glowing infinity background image - merged with background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          maskImage: "radial-gradient(ellipse 70% 60% at center, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at center, black 30%, transparent 70%)",
        }}
      >
        <motion.img
          src={glowingInfinityBg}
          alt=""
          className="w-[85%] md:w-[65%] lg:w-[55%] max-w-[850px] h-auto object-contain"
          style={{
            filter: "brightness(0.5) saturate(1.2)",
            opacity: 0.6,
          }}
          animate={{
            opacity: [0.5, 0.7, 0.5],
            filter: [
              "brightness(0.5) saturate(1.2)",
              "brightness(0.6) saturate(1.3)",
              "brightness(0.5) saturate(1.2)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Inner glow pulse overlay */}
      <motion.div
        className="absolute w-[400px] md:w-[550px] lg:w-[700px] h-[250px] md:h-[350px] lg:h-[450px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, hsl(220 90% 55% / 0.15), hsl(280 80% 50% / 0.1), transparent 60%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default GlowingInfinity;
