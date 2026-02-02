import { motion } from "framer-motion";
import infinityLogo from "@/assets/milanoir-logo-infinity.png";

const GlowingInfinity = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Outer glow ring */}
      <motion.div
        className="absolute w-[500px] md:w-[700px] lg:w-[900px] h-[300px] md:h-[400px] lg:h-[500px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, hsl(280 80% 55% / 0.12), hsl(185 85% 50% / 0.08), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary glow */}
      <motion.div
        className="absolute w-[400px] md:w-[600px] lg:w-[800px] h-[250px] md:h-[350px] lg:w-[450px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, hsl(330 85% 60% / 0.1), transparent 60%)",
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Glowing cosmic infinity image from logo */}
      <motion.img
        src={infinityLogo}
        alt=""
        className="absolute w-[300px] md:w-[450px] lg:w-[600px] h-auto opacity-[0.15]"
        style={{
          filter: "blur(2px)",
        }}
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Additional glow layer */}
      <motion.img
        src={infinityLogo}
        alt=""
        className="absolute w-[350px] md:w-[500px] lg:w-[700px] h-auto opacity-[0.08]"
        style={{
          filter: "blur(20px)",
        }}
        animate={{
          opacity: [0.05, 0.12, 0.05],
          scale: [1.05, 1, 1.05],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default GlowingInfinity;
