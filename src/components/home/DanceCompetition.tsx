/**
 * DanceCompetition - "Dance With Them" entry section
 * Sits between the host section and the footer. Reuses the glass-card styling
 * used by HostCard / ArtistCard so it reads as part of the same set.
 */

import { motion } from "framer-motion";
import { Music4 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

// TODO(Teej): deadline not finalised. Set this string once confirmed
// (e.g. "Entries close 31 August 2026") and it will render under the button.
const DEADLINE: string | null = null;

const MAILTO =
  "mailto:info@milanoir-events.com?subject=Teej%20Dhamaka%20Dance%20Competition";

const DanceCompetition = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold gradient-text">
            {t.danceComp.sectionTitle}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="relative group"
        >
          {/* Animated gradient border, matching HostCard */}
          <motion.div
            className="absolute -inset-[1px] rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(135deg, hsl(348 85% 55%), hsl(0 78% 48%), hsl(30 90% 55%), hsl(43 95% 55%))",
              backgroundSize: "300% 300%",
            }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />

          <div className="relative glass-card rounded-2xl md:rounded-3xl border border-border/50 group-hover:border-transparent transition-all duration-300 overflow-hidden p-6 md:p-8 text-center">
            <div className="flex justify-center mb-4">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                <Music4 className="w-6 h-6" />
              </span>
            </div>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {t.danceComp.body}
            </p>

            <div className="mt-8 flex flex-col items-center gap-2">
              <a href={MAILTO}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    className="h-12 px-8 text-sm md:text-base font-bold rounded-full cursor-pointer"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                    }}
                  >
                    {t.danceComp.cta}
                  </Button>
                </motion.div>
              </a>

              {DEADLINE && (
                <span className="text-[11px] text-muted-foreground/60 tracking-wide">
                  {t.danceComp.deadlineLabel}: {DEADLINE}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DanceCompetition;
