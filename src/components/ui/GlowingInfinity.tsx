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
          background: "conic-gradient(from 0deg, hsl(280 80% 50% / 0.25), hsl(200 90% 55% / 0.25), hsl(330 85% 55% / 0.25), hsl(280 80% 50% / 0.25))",
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
          background: "conic-gradient(from 180deg, hsl(200 90% 55% / 0.2), hsl(280 80% 50% / 0.2), hsl(185 90% 50% / 0.2), hsl(200 90% 55% / 0.2))",
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

      {/* Glowing infinity background image - blended with multiply */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          mixBlendMode: "screen",
        }}
      >
        <motion.img
          src={glowingInfinityBg}
          alt=""
          className="w-[80%] md:w-[60%] lg:w-[50%] max-w-[800px] h-auto object-contain"
          style={{
            filter: "brightness(0.6) saturate(1.3)",
            opacity: 0.7,
          }}
          animate={{
            opacity: [0.6, 0.8, 0.6],
            filter: [
              "brightness(0.6) saturate(1.3) drop-shadow(0 0 40px hsl(280 80% 55% / 0.5))",
              "brightness(0.75) saturate(1.4) drop-shadow(0 0 60px hsl(200 90% 55% / 0.6))",
              "brightness(0.6) saturate(1.3) drop-shadow(0 0 40px hsl(280 80% 55% / 0.5))",
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
          background: "radial-gradient(ellipse at center, hsl(220 90% 55% / 0.12), hsl(280 80% 50% / 0.08), transparent 60%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.8, 0.5],
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
