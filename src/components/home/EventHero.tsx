/**
 * EventHero - Hero section with logo, event title, countdown, and scroll indicator
 * Premium animations and gradient effects
 */

import { motion } from "framer-motion";
import { ChevronDown, MapPin, Calendar } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import { mainEvent, uiText } from "@/data/content";
import logo from "@/assets/milanoir-logo-infinity.png";

const EventHero = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.9,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="container max-w-5xl mx-auto text-center">
        {/* Animated logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8 md:mb-12"
        >
          <motion.img
            src={logo}
            alt="Milanoir Events"
            className="w-40 sm:w-48 md:w-56 lg:w-64 mx-auto animate-glow-pulse"
            whileHover={{ scale: 1.05 }}
          />
        </motion.div>

        {/* Event title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6 md:mb-8"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="inline-block px-4 py-2 glass-card text-xs md:text-sm tracking-widest text-primary uppercase mb-4 md:mb-6"
          >
            {mainEvent.subtitle}
          </motion.span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold leading-tight">
            <span className="gradient-text">{mainEvent.title}</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8"
        >
          {uiText.hero.tagline}
        </motion.p>

        {/* Location and date badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-10 md:mb-14"
        >
          <div className="flex items-center gap-2 px-4 py-2 glass-card rounded-full text-sm md:text-base">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-foreground">{uiText.hero.location}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 glass-card rounded-full text-sm md:text-base">
            <Calendar className="w-4 h-4 text-secondary" />
            <span className="text-foreground">{uiText.hero.dateLabel}</span>
          </div>
        </motion.div>

        {/* Countdown timer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <CountdownTimer />
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          aria-label={uiText.hero.scrollCta}
        >
          <span className="text-xs md:text-sm uppercase tracking-widest">
            {uiText.hero.scrollCta}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
          </motion.div>
        </motion.button>
      </div>

      {/* Decorative gradient at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, hsl(var(--background)), transparent)",
        }}
      />
    </section>
  );
};

export default EventHero;
