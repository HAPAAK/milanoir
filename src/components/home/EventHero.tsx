/**
 * EventHero - Full-viewport hero with event banner as centerpiece
 * Banner fills the viewport, countdown + CTA pinned to the bottom
 */

import Image from "next/image";
import { motion } from "framer-motion";
import { Ticket } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import { Button } from "@/components/ui/button";
import { mainEvent } from "@/data/content";
import { useLanguage } from "@/contexts/LanguageContext";
import eventBanner from "@/assets/event-banner.png";
import {getImageSrc} from "@/lib/image";

const EventHero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen flex flex-col overflow-hidden">
      {/* Full-viewport event banner */}
      <div className="absolute inset-0 z-0">
        <Image
          src={getImageSrc(eventBanner)}
          alt="Milanoir Events — Nepalese New Year 2083"
          fill
          priority
          quality={75}
          placeholder="blur"
          blurDataURL={eventBanner.blurDataURL}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle bottom-only gradient so the CTA area is readable while the banner stays vivid */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 30%, hsl(var(--background) / 0.4) 60%, hsl(var(--background) / 0.85) 85%, hsl(var(--background)) 100%)",
          }}
        />
      </div>

      {/* Spacer to push content to the bottom */}
      <div className="flex-1" />

      {/* Countdown + Book Tickets -- anchored to bottom of viewport */}
      <div className="relative z-10 container max-w-5xl mx-auto text-center px-4 pb-10 md:pb-14">
        {/* Countdown timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-full max-w-lg mx-auto mb-6 md:mb-8"
        >
          <CountdownTimer />
        </motion.div>

        {/* Book Tickets CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col items-center gap-2.5"
        >
          <a
            href={mainEvent.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                size="lg"
                className="h-14 md:h-16 px-10 md:px-14 text-base md:text-lg font-bold rounded-full relative overflow-hidden group cursor-pointer"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                }}
              >
                {/* Shimmer sweep */}
                <motion.span
                  className="absolute inset-0 z-0"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{
                    backgroundPosition: ["200% 0", "-200% 0"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                {/* Gradient swap on hover */}
                <motion.span
                  className="absolute inset-0 z-0"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--primary)))",
                  }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  <Ticket className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="tracking-wide">{t.hero.getTickets}</span>
                </span>
              </Button>
            </motion.div>
          </a>
          <span className="text-[11px] text-muted-foreground/60 tracking-wide">
            {t.hero.ticketsExternal}
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default EventHero;
