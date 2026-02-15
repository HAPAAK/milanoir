/**
 * EventHero - Hero section with viewport-fit design
 * Layout: Logo + presents → Subtitle → Title → Tagline → Badges → Countdown → CTA
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import { Button } from "@/components/ui/button";
import { mainEvent } from "@/data/content";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/milanoir-logo-infinity.png";

const EventHero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen flex flex-col items-center justify-center px-4 pt-20 pb-8">
      <div className="container max-w-5xl mx-auto text-center flex flex-col items-center justify-center h-full">
        {/* Logo + Presents */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-4"
        >
          <img 
            src={typeof logo === "string" ? logo : logo.src} 
            alt="Milanoir Events" 
            className="w-16 md:w-20 opacity-80 mb-2"
          />
          <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-muted-foreground font-light">
            {t.hero.presents}
          </span>
        </motion.div>

        {/* Event subtitle badge */}
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-block px-4 py-2 glass-card text-xs md:text-sm tracking-widest text-primary uppercase mb-3 md:mb-4"
        >
          {mainEvent.subtitle}
        </motion.span>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight mb-3 md:mb-4"
        >
          <span className="gradient-text">{mainEvent.title}</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 md:mb-5"
        >
          {t.hero.tagline}
        </motion.p>

        {/* Location and date badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-5 md:mb-6"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 glass-card rounded-full text-xs md:text-sm">
            <MapPin className="w-3 h-3 md:w-4 md:h-4 text-primary" />
            <span className="text-foreground">{t.hero.location}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 glass-card rounded-full text-xs md:text-sm">
            <Calendar className="w-3 h-3 md:w-4 md:h-4 text-secondary" />
            <span className="text-foreground">{t.hero.dateLabel}</span>
          </div>
        </motion.div>

        {/* Countdown timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full max-w-lg mx-auto mb-6 md:mb-8"
        >
          <CountdownTimer />
        </motion.div>

        {/* Join the Waitlist CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link href="/waitlist">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                className="h-12 md:h-14 px-8 md:px-10 text-sm md:text-base font-semibold rounded-full relative overflow-hidden group"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                }}
              >
                <motion.span
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--primary)))",
                  }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">{t.hero.joinWaitlist}</span>
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Decorative gradient at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, hsl(var(--background)), transparent)",
        }}
      />
    </section>
  );
};

export default EventHero;
