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
import eventBanner from "@/assets/event-banner-landscape.png";
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
        {/* Banner with GET TICKETS overlaid in the gap area */}
        <div className="relative">
          <Image
            src={eventBannerMobile}
            alt="Milanoir Events — Nepalese New Year 2083"
            priority
            quality={100}
            placeholder="blur"
            sizes="100vw"
            className="w-full h-auto"
          />
          {/* GET TICKETS button overlaid on the image gap -- adjust bottom-[15%] to move up/down */}
          <div className="absolute bottom-[5%] left-0 right-0 z-10 flex justify-center px-4">
            <TicketsCTA label={t.hero.getTickets} sublabel={t.hero.ticketsExternal} />
          </div>
        </div>

        {/* Countdown below the image */}
        <div className="px-4 pt-4 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full max-w-sm mx-auto"
          >
            <CountdownTimer />
          </motion.div>
        </div>
      </section>

      {/* ─── DESKTOP ─── */}
      <section className="relative h-screen hidden md:flex flex-col overflow-hidden">
        {/* Banner stretched edge-to-edge, top 90% visible, bottom fades out */}
        <div className="absolute inset-0 z-0">
          <Image
            src={eventBanner}
            alt="Milanoir Events — Nepalese New Year 2083"
            quality={100}
            placeholder="blur"
            // sizes="100vw"
            preload={true}
            className="object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, transparent 60%, hsl(var(--background) / 0.6) 80%, hsl(var(--background)) 95%)",
            }}
          />
        </div>

        <div className="flex-1" />

        {/* Countdown + CTA at bottom */}
        <div className="relative z-10 container max-w-5xl mx-auto text-center px-3 pb-4">
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
