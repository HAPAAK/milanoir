/**
 * EventInfo - Venue details and CTA section
 * Bento-style layout with glassmorphism
 */

import { motion } from "framer-motion";
import { MapPin, Bell, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { uiText } from "@/data/content";

const EventInfo = () => {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {/* Venue card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 border border-border/50 hover:border-primary/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-heading font-bold">
                {uiText.eventInfo.venueTitle}
              </h3>
            </div>
            <motion.p
              className="text-2xl md:text-3xl font-heading font-bold gradient-text"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {uiText.eventInfo.venueTba}
            </motion.p>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              Stay tuned for venue announcement
            </p>
          </motion.div>

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 border border-border/50 hover:border-secondary/30 transition-all duration-300 flex flex-col justify-center"
          >
            <h3 className="text-xl md:text-2xl font-heading font-bold mb-4">
              Don't miss out
            </h3>
            <p className="text-muted-foreground mb-6 text-sm md:text-base">
              Be the first to know about ticket releases, venue announcements, and exclusive updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-1 h-12 bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-white font-semibold rounded-xl shadow-lg shadow-primary/20 transition-all duration-300 group"
              >
                <Bell className="w-4 h-4 mr-2" />
                {uiText.eventInfo.getNotified}
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex-1 h-12 border-border/50 hover:border-primary/50 hover:bg-primary/5 rounded-xl transition-all duration-300 group"
              >
                <Link to="/about-us">
                  {uiText.eventInfo.learnMore}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EventInfo;
