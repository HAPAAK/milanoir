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

      {/* Outer cosmic nebula glow - darker */}
      <motion.div
        className="absolute w-[900px] md:w-[1200px] lg:w-[1600px] h-[600px] md:h-[800px] lg:h-[1000px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, hsl(260 70% 12% / 0.5), hsl(280 60% 8% / 0.3), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Rotating infinity-shaped glow - darker */}
      <motion.div
        className="absolute w-[700px] md:w-[1000px] lg:w-[1300px] h-[350px] md:h-[500px] lg:h-[650px]"
        style={{
          background: "conic-gradient(from 0deg at 50% 50%, hsl(280 80% 30% / 0.1), hsl(200 90% 35% / 0.12), hsl(330 85% 35% / 0.1), hsl(185 90% 30% / 0.12), hsl(280 80% 30% / 0.1))",
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

      {/* Counter-rotating glow - darker */}
      <motion.div
        className="absolute w-[600px] md:w-[900px] lg:w-[1200px] h-[300px] md:h-[450px] lg:h-[600px]"
        style={{
          background: "conic-gradient(from 180deg at 50% 50%, hsl(200 90% 35% / 0.08), hsl(260 80% 35% / 0.1), hsl(185 90% 30% / 0.08), hsl(330 80% 35% / 0.1), hsl(200 90% 35% / 0.08))",
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

      {/* Main infinity image - large, darker, with subtle glow */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          mixBlendMode: "screen",
        }}
      >
        {/* Outer glow layer for infinity shape */}
        <motion.img
          src={typeof glowingInfinityBg === "string" ? glowingInfinityBg : glowingInfinityBg.src}
          alt=""
          className="absolute w-[95%] md:w-[85%] lg:w-[75%] max-w-[1200px] h-auto object-contain"
          style={{
            filter: "blur(35px) brightness(0.2) saturate(1.3)",
            opacity: 0.3,
          }}
          animate={{
            opacity: [0.2, 0.35, 0.2],
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
          src={typeof glowingInfinityBg === "string" ? glowingInfinityBg : glowingInfinityBg.src}
          alt=""
          className="absolute w-[90%] md:w-[80%] lg:w-[70%] max-w-[1100px] h-auto object-contain"
          style={{
            filter: "blur(18px) brightness(0.18) saturate(1.2)",
            opacity: 0.25,
          }}
          animate={{
            opacity: [0.18, 0.3, 0.18],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* Main infinity image - very dark */}
        <motion.img
          src={typeof glowingInfinityBg === "string" ? glowingInfinityBg : glowingInfinityBg.src}
          alt=""
          className="absolute w-[85%] md:w-[75%] lg:w-[65%] max-w-[1000px] h-auto object-contain"
          style={{
            filter: "brightness(0.15) saturate(1.1)",
            opacity: 0.18,
          }}
          animate={{
            opacity: [0.12, 0.2, 0.12],
            filter: [
              "brightness(0.15) saturate(1.1) drop-shadow(0 0 15px hsl(280 80% 40% / 0.2))",
              "brightness(0.2) saturate(1.2) drop-shadow(0 0 25px hsl(200 90% 45% / 0.3))",
              "brightness(0.15) saturate(1.1) drop-shadow(0 0 15px hsl(280 80% 40% / 0.2))",
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Inner pulsing glow core - subtle */}
      <motion.div
        className="absolute w-[300px] md:w-[450px] lg:w-[600px] h-[150px] md:h-[225px] lg:h-[300px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, hsl(220 90% 45% / 0.05), hsl(280 80% 40% / 0.03), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Strong vignette overlay for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 20%, hsl(240 20% 3% / 0.6) 100%)",
        }}
      />
    </div>
  );
};

export default GlowingInfinity;
