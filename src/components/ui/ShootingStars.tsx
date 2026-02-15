import { motion } from "framer-motion";

interface ShootingStarsProps {
  count?: number;
  interval?: number;
}

const ShootingStars = ({ count = 3, interval = 5 }: ShootingStarsProps) => {
  const seeded = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${15 + i * 25}%`,
            left: "-5%",
          }}
          animate={{
            x: ["0vw", "120vw"],
            y: ["0vh", "40vh"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 1.5,
            delay: i * interval + seeded(i + 11) * 2,
            repeat: Infinity,
            repeatDelay: interval * count - 1.5 + seeded(i + 29) * 3,
            ease: "linear",
          }}
        >
          {/* Tail */}
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-l from-white via-white/50 to-transparent"
            style={{ width: "80px" }}
          />
          {/* Secondary tail glow */}
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-l from-cosmic-cyan/60 via-cosmic-pink/30 to-transparent blur-[1px]"
            style={{ width: "60px" }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ShootingStars;
