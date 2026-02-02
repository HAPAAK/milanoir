import { motion } from "framer-motion";
import logo from "@/assets/milanoir-logo.png";
import StarField from "@/components/ui/StarField";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden cosmic-bg">
      {/* Star field background */}
      <StarField count={200} />
      
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cosmic-pink/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cosmic-cyan/10 rounded-full blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-cosmic-purple/10 rounded-full blur-[80px]"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Additional nebula effects */}
        <motion.div 
          className="absolute top-10 right-10 w-[600px] h-[600px] bg-gradient-to-br from-cosmic-pink/5 via-cosmic-purple/5 to-transparent rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-cosmic-cyan/5 via-cosmic-blue/5 to-transparent rounded-full blur-[130px]"
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container relative z-10 px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          <motion.img
            src={logo}
            alt="Milanoir Events"
            className="w-64 md:w-80 lg:w-96 mb-8 animate-glow-pulse"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.05,
              filter: "drop-shadow(0 0 30px hsl(330 85% 60% / 0.6))",
            }}
          />

          <motion.p
            className="text-lg md:text-xl text-muted-foreground tracking-[0.3em] uppercase mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            The Beginning of Infinity
          </motion.p>

          <motion.h1
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 max-w-4xl leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            A luxury event management collective specializing in{" "}
            <motion.span 
              className="gradient-text"
              whileHover={{
                textShadow: "0 0 30px hsl(330 85% 60% / 0.5)",
              }}
            >
              concerts, experiential entertainment
            </motion.span>, and bespoke cultural productions.
          </motion.h1>

          <motion.div
            className="flex items-center gap-3 px-6 py-3 rounded-full glass-card cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px hsl(330 85% 60% / 0.3)",
            }}
          >
            <motion.span 
              className="w-2 h-2 bg-cosmic-cyan rounded-full"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm md:text-base text-foreground font-medium tracking-wide">
              Based in London, United Kingdom
            </span>
          </motion.div>

          <motion.p
            className="text-xs text-muted-foreground/60 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Company No: 16820191
          </motion.p>
        </motion.div>
      </div>

      {/* Shooting stars effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${20 + i * 30}%`,
              left: "-5%",
            }}
            animate={{
              x: ["0vw", "110vw"],
              y: ["0vh", "30vh"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 4 + 2,
              repeat: Infinity,
              repeatDelay: 8,
              ease: "linear",
            }}
          >
            <div className="w-16 h-[1px] bg-gradient-to-l from-white to-transparent absolute right-0 top-1/2 -translate-y-1/2" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
