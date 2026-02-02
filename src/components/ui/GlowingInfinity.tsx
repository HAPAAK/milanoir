import { motion } from "framer-motion";

const GlowingInfinity = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Multiple layered infinity symbols for depth */}
      <motion.svg
        viewBox="0 0 200 100"
        className="w-[800px] md:w-[1200px] lg:w-[1600px] h-auto opacity-[0.03]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 2 }}
      >
        <defs>
          <linearGradient id="infinityGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(330, 85%, 60%)" />
            <stop offset="50%" stopColor="hsl(280, 80%, 55%)" />
            <stop offset="100%" stopColor="hsl(185, 85%, 50%)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M50,50 C50,25 75,25 100,50 C125,75 150,75 150,50 C150,25 125,25 100,50 C75,75 50,75 50,50"
          fill="none"
          stroke="url(#infinityGradient1)"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
      </motion.svg>

      {/* Glowing animated infinity */}
      <motion.svg
        viewBox="0 0 200 100"
        className="absolute w-[600px] md:w-[900px] lg:w-[1200px] h-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <defs>
          <linearGradient id="infinityGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <motion.stop
              offset="0%"
              animate={{
                stopColor: ["hsl(330, 85%, 60%)", "hsl(185, 85%, 50%)", "hsl(330, 85%, 60%)"],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.stop
              offset="50%"
              animate={{
                stopColor: ["hsl(280, 80%, 55%)", "hsl(330, 85%, 60%)", "hsl(280, 80%, 55%)"],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.stop
              offset="100%"
              animate={{
                stopColor: ["hsl(185, 85%, 50%)", "hsl(280, 80%, 55%)", "hsl(185, 85%, 50%)"],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d="M50,50 C50,25 75,25 100,50 C125,75 150,75 150,50 C150,25 125,25 100,50 C75,75 50,75 50,50"
          fill="none"
          stroke="url(#infinityGradient2)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ 
            pathLength: { duration: 2, ease: "easeInOut" },
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </motion.svg>

      {/* Outer glow ring */}
      <motion.div
        className="absolute w-[500px] md:w-[700px] lg:w-[900px] h-[300px] md:h-[400px] lg:h-[500px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, hsl(330 85% 60% / 0.08), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.8, 0.5],
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
