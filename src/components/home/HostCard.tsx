/**
 * HostCard - Display card for event host/presenter
 * Glassmorphism styling consistent with artist cards, horizontal layout on desktop
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { Mic } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Host } from "@/types/event";

interface HostCardProps {
  host: Host;
}

const HostCard = ({ host }: HostCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="relative group cursor-pointer"
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, hsl(330 85% 60%), hsl(280 80% 55%), hsl(200 85% 55%), hsl(185 85% 50%))",
          backgroundSize: "300% 300%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Card content */}
      <div className="relative glass-card rounded-2xl md:rounded-3xl border border-border/50 group-hover:border-transparent transition-all duration-300 overflow-hidden p-5 md:p-6">
        {/* Cosmic glow on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, hsl(330 85% 60% / 0.1), transparent 50%), radial-gradient(circle at 70% 70%, hsl(200 85% 55% / 0.1), transparent 50%)",
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row gap-6">
          {/* Host image */}
          {host.imageUrl && (
            <motion.div
              className="relative overflow-hidden rounded-xl w-full md:w-48 lg:w-56 h-52 md:h-64 flex-shrink-0"
              style={{ y: imageY }}
            >
              <Image
                src={host.imageUrl}
                alt={host.name}
                fill
                sizes="(max-width: 768px) 100vw, 224px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
            </motion.div>
          )}

          {/* Host info */}
          <div className="flex flex-col justify-center">
            <Badge
              variant="secondary"
              className="self-start mb-3 bg-secondary/10 text-secondary border border-secondary/20 text-xs md:text-sm"
            >
              <Mic className="w-3 h-3 mr-1" />
              {host.role}
            </Badge>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold gradient-text mb-2">
              {host.name}
            </h3>

            {host.origin && (
              <span className="text-xs md:text-sm text-muted-foreground mb-3">
                {host.origin}
              </span>
            )}

            <p className="text-sm text-muted-foreground leading-relaxed">
              {host.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HostCard;
