/**
 * EventHero - Event banner hero section
 * Mobile: full mobile banner visible, countdown + CTA below the image
 * Desktop: full desktop banner visible (contain, centered), countdown + CTA below
 */

import Image from "next/image";
import { motion } from "framer-motion";
import { Ticket } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import { Button } from "@/components/ui/button";
import { mainEvent } from "@/data/content";
import { useLanguage } from "@/contexts/LanguageContext";
import eventBanner from "@/assets/event-banner.png";
import eventBannerMobile from "@/assets/event-banner-mobile.png";

const TicketsCTA = ({ label, sublabel }: { label: string; sublabel: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.8 }}
    className="flex flex-col items-center gap-2"
  >
    <a href={mainEvent.ticketUrl} target="_blank" rel="noopener noreferrer">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
        <Button
          size="lg"
          className="h-12 md:h-16 px-8 md:px-14 text-sm md:text-lg font-bold rounded-full relative overflow-hidden group cursor-pointer"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
          }}
        >
          <motion.span
            className="absolute inset-0 z-0"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.span
            className="absolute inset-0 z-0"
            style={{
              background: "linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--primary)))",
            }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative z-10 flex items-center gap-3">
            <Ticket className="w-5 h-5 md:w-6 md:h-6" />
            <span className="tracking-wide">{label}</span>
          </span>
        </Button>
      </motion.div>
    </a>
    <span className="text-[10px] md:text-[11px] text-muted-foreground/60 tracking-wide">
      {sublabel}
    </span>
  </motion.div>
);

const EventHero = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* ─── MOBILE ─── */}
      <section className="md:hidden flex flex-col">
        {/* Full banner image -- no crop */}
        <Image
          src={eventBannerMobile}
          alt="Milanoir Events — Nepalese New Year 2083"
          priority
          quality={90}
          placeholder="blur"
          sizes="100vw"
          className="w-full h-auto"
        />

        {/* Countdown + CTA below the image */}
        <div className="px-4 -mt-2 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full max-w-sm mx-auto mb-5"
          >
            <CountdownTimer />
          </motion.div>
          <div className="flex justify-center">
            <TicketsCTA label={t.hero.getTickets} sublabel={t.hero.ticketsExternal} />
          </div>
        </div>
      </section>

      {/* ─── DESKTOP ─── */}
      <section className="hidden md:flex flex-col items-center overflow-hidden">
        {/* Full banner -- contain so nothing is cropped, centered */}
        <div className="relative w-full max-w-4xl mx-auto mt-20">
          <Image
            src={eventBanner}
            alt="Milanoir Events — Nepalese New Year 2083"
            priority
            quality={90}
            placeholder="blur"
            sizes="(min-width: 768px) 896px, 100vw"
            className="w-full h-auto"
          />
        </div>

        {/* Countdown + CTA below the image */}
        <div className="container max-w-5xl mx-auto text-center px-4 -mt-4 pb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full max-w-lg mx-auto mb-8"
          >
            <CountdownTimer />
          </motion.div>
          <TicketsCTA label={t.hero.getTickets} sublabel={t.hero.ticketsExternal} />
        </div>
      </section>
    </>
  );
};

export default EventHero;
