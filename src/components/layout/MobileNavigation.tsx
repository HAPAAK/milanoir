/**
 * MobileNavigation - Modern bottom tab navigation for mobile
 * Fixed at bottom with iOS-inspired design and active state indicators
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Home, Users, Mail, Music } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, type Translations } from "@/contexts/LanguageContext";
import { TOGGLE_THEME_MUSIC } from "@/lib/audioEvents";

interface NavItem {
  id: string;
  labelKey: keyof Translations["nav"];
  href: string;
  icon: typeof Home;
}

const navItems: NavItem[] = [
  { id: "home", labelKey: "home", href: "/", icon: Home },
  { id: "about", labelKey: "about", href: "/about-us", icon: Users },
  { id: "contact", labelKey: "contact", href: "/contact", icon: Mail },
];

const MobileNavigation = () => {
  const { pathname } = useRouter();
  const { t } = useLanguage();
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const isActive = (href: string) => pathname === href;

  // Listen for music state changes from ThemeMusicPlayer
  useEffect(() => {
    const handleMusicState = (e: Event) => {
      const detail = (e as CustomEvent<{ playing: boolean }>).detail;
      setIsMusicPlaying(detail.playing);
    };
    window.addEventListener("themeMusicState", handleMusicState);
    return () => window.removeEventListener("themeMusicState", handleMusicState);
  }, []);

  const handleMusicToggle = () => {
    window.dispatchEvent(new CustomEvent(TOGGLE_THEME_MUSIC));
  };

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div
        className="backdrop-blur-2xl bg-background/90 border-t border-border/40"
        style={{
          boxShadow: "0 -4px 30px rgba(0, 0, 0, 0.15)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                {active && (
                  <motion.div
                    layoutId="mobileNavIndicator"
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--secondary) / 0.1))",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <motion.div whileTap={{ scale: 0.9 }} className="relative z-10">
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-all duration-300",
                      active && "drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]",
                    )}
                  />
                </motion.div>

                <span
                  className={cn(
                    "relative z-10 text-[10px] font-medium mt-1 transition-all duration-300",
                    active && "font-semibold",
                  )}
                >
                  {t.nav[item.labelKey]}
                </span>

                {active && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    style={{ boxShadow: "0 0 8px hsl(var(--primary))" }}
                  />
                )}
              </Link>
            );
          })}

          {/* Music toggle in mobile nav - only on home page */}
          {pathname === "/" && <button
            onClick={handleMusicToggle}
            className={cn(
              "relative flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300",
              isMusicPlaying ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
            aria-label={isMusicPlaying ? "Pause music" : "Play music"}
          >
            {/* Animated gradient border -- bright+fast when on, subtle+slow when off */}
            <motion.div
              className="absolute -inset-[1px] rounded-2xl"
              style={{
                background: "linear-gradient(135deg, hsl(330 85% 60%), hsl(280 80% 55%), hsl(200 85% 55%), hsl(185 85% 50%))",
                backgroundSize: "300% 300%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                opacity: isMusicPlaying ? 1 : 0.35,
              }}
              transition={{
                backgroundPosition: {
                  duration: isMusicPlaying ? 3 : 6,
                  repeat: Infinity,
                  ease: "linear",
                },
                opacity: { duration: 0.4 },
              }}
            />

            {/* Inner background to create the border effect */}
            <div className="absolute inset-0 rounded-2xl bg-background" />

            <motion.div whileTap={{ scale: 0.9 }} className="relative z-10">
              <Music
                className={cn(
                  "w-5 h-5 transition-all duration-300",
                  isMusicPlaying && "drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)] animate-pulse",
                )}
              />
            </motion.div>

            <span
              className={cn(
                "relative z-10 text-[10px] font-medium mt-1 transition-all duration-300",
                isMusicPlaying && "font-semibold",
              )}
            >
              {isMusicPlaying ? "♪" : "Vibe"}
            </span>
          </button>}
        </div>
      </div>
    </motion.nav>
  );
};

export default MobileNavigation;
