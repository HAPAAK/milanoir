import { motion } from "framer-motion";
import glowingInfinityBg from "@/assets/glowing-infinity-bg.png";

interface GlowingInfinityProps {
  isFixed?: boolean;
}

const GlowingInfinity = ({ isFixed = true }: GlowingInfinityProps) => {
  return (
    <div className={`${isFixed ? 'fixed' : 'absolute'} inset-0 flex items-center justify-center pointer-events-none overflow-hidden`}>
      {/* Deep dark base layer */}
      <div className="absolute inset-0 bg-background" />

      {/* Outer cosmic nebula glow */}
      <motion.div
        className="absolute w-[900px] md:w-[1200px] lg:w-[1600px] h-[600px] md:h-[800px] lg:h-[1000px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, hsl(260 70% 20% / 0.4), hsl(280 60% 15% / 0.2), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Rotating infinity-shaped glow - primary */}
      <motion.div
        className="absolute w-[700px] md:w-[1000px] lg:w-[1300px] h-[350px] md:h-[500px] lg:h-[650px]"
        style={{
          background: "conic-gradient(from 0deg at 50% 50%, hsl(280 80% 45% / 0.15), hsl(200 90% 50% / 0.2), hsl(330 85% 50% / 0.15), hsl(185 90% 45% / 0.2), hsl(280 80% 45% / 0.15))",
          borderRadius: "50%",
          filter: "blur(100px)",
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.08, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Counter-rotating glow - secondary */}
      <motion.div
        className="absolute w-[600px] md:w-[900px] lg:w-[1200px] h-[300px] md:h-[450px] lg:h-[600px]"
        style={{
          background: "conic-gradient(from 180deg at 50% 50%, hsl(200 90% 50% / 0.12), hsl(260 80% 50% / 0.15), hsl(185 90% 45% / 0.12), hsl(330 80% 50% / 0.15), hsl(200 90% 50% / 0.12))",
          borderRadius: "50%",
          filter: "blur(80px)",
        }}
        animate={{
          rotate: [360, 0],
          scale: [1.05, 1, 1.05],
        }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Main infinity image - large, dark, with glow */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          mixBlendMode: "screen",
        }}
      >
        {/* Outer glow layer for infinity shape */}
        <motion.img
          src={glowingInfinityBg}
          alt=""
          className="absolute w-[95%] md:w-[85%] lg:w-[75%] max-w-[1200px] h-auto object-contain"
          style={{
            filter: "blur(30px) brightness(0.4) saturate(1.5)",
            opacity: 0.4,
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1.02, 1.06, 1.02],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Mid glow layer */}
        <motion.img
          src={glowingInfinityBg}
          alt=""
          className="absolute w-[90%] md:w-[80%] lg:w-[70%] max-w-[1100px] h-auto object-contain"
          style={{
            filter: "blur(15px) brightness(0.35) saturate(1.4)",
            opacity: 0.35,
          }}
          animate={{
            opacity: [0.25, 0.4, 0.25],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* Main infinity image */}
        <motion.img
          src={glowingInfinityBg}
          alt=""
          className="absolute w-[85%] md:w-[75%] lg:w-[65%] max-w-[1000px] h-auto object-contain"
          style={{
            filter: "brightness(0.3) saturate(1.2)",
            opacity: 0.25,
          }}
          animate={{
            opacity: [0.2, 0.3, 0.2],
            filter: [
              "brightness(0.3) saturate(1.2) drop-shadow(0 0 20px hsl(280 80% 50% / 0.3))",
              "brightness(0.35) saturate(1.3) drop-shadow(0 0 35px hsl(200 90% 55% / 0.4))",
              "brightness(0.3) saturate(1.2) drop-shadow(0 0 20px hsl(280 80% 50% / 0.3))",
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Inner pulsing glow core */}
      <motion.div
        className="absolute w-[300px] md:w-[450px] lg:w-[600px] h-[150px] md:h-[225px] lg:h-[300px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, hsl(220 90% 55% / 0.08), hsl(280 80% 50% / 0.05), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle vignette overlay for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, hsl(240 20% 5% / 0.4) 100%)",
        }}
      />
    </div>
  );
};

export default GlowingInfinity;
