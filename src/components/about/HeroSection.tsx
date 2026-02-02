import { motion } from "framer-motion";
import logo from "@/assets/milanoir-logo.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden cosmic-bg">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cosmic-pink/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cosmic-cyan/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-2s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cosmic-purple/10 rounded-full blur-[80px] animate-float" style={{ animationDelay: '-4s' }} />
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
            <span className="gradient-text">concerts, experiential entertainment</span>, and bespoke cultural productions.
          </motion.h1>

          <motion.div
            className="flex items-center gap-4 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-cosmic-cyan rounded-full" />
              London, United Kingdom
            </span>
            <span className="text-border">|</span>
            <span>Company No: 16820191</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
