/**
 * TopNavigation - Fixed top navigation bar with glassmorphism
 * Features: Logo on left, translated text links + music toggle on right (desktop only)
 * Mobile uses bottom tab navigation instead
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Music } from "lucide-react";
import { navigationItems } from "@/data/content";
import { useLanguage, type Translations } from "@/contexts/LanguageContext";
import logo from "@/assets/milanoir-logo.png";
import { TOGGLE_THEME_MUSIC } from "@/lib/audioEvents";

const navLabelMap: Record<string, keyof Translations["nav"]> = {
  home: "home",
  about: "about",
  contact: "contact",
  waitlist: "waitlist",
};

const TopNavigation = () => {
  const { pathname } = useRouter();
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for music state changes from ThemeMusicPlayer
  useEffect(() => {
    const handleMusicState = (e: Event) => {
      const detail = (e as CustomEvent<{ playing: boolean }>).detail;
      setIsMusicPlaying(detail.playing);
    };
    window.addEventListener("themeMusicState", handleMusicState);
    return () => window.removeEventListener("themeMusicState", handleMusicState);
  }, []);

  const isActive = (href: string) => pathname === href;

  const handleMusicToggle = () => {
    window.dispatchEvent(new CustomEvent(TOGGLE_THEME_MUSIC));
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-2xl bg-background/80 border-b border-border/40"
          : "backdrop-blur-xl bg-background/60 border-b border-border/20"
      }`}
      style={{
        boxShadow: isScrolled
          ? "0 4px 30px rgba(0, 0, 0, 0.15)"
          : "0 4px 20px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="container max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-2 group" aria-label="Milanoir Events - Home">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Image
              src={logo}
              alt="Milanoir Events"
              className="h-8 md:h-10 w-auto"
              width={40}
              height={40}
              priority
            />
          </motion.div>
        </Link>

        {/* Desktop navigation + music toggle */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8" role="navigation">
            {navigationItems.map((item) => {
              const labelKey = navLabelMap[item.id];
              const label = labelKey ? t.nav[labelKey] : item.id;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                    isActive(item.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                      style={{
                        background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))",
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Music toggle button - only on home page */}
          {pathname === "/" && <motion.button
            onClick={handleMusicToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative rounded-full"
            aria-label={isMusicPlaying ? "Pause theme music" : "Play theme music"}
          >
            {/* Animated gradient border -- bright+fast when on, subtle+slow when off */}
            <motion.div
              className="absolute -inset-[1px] rounded-full"
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
            <div
              className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 bg-background ${
                isMusicPlaying
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Music className={`w-3.5 h-3.5 ${isMusicPlaying ? "animate-pulse" : ""}`} />
              <span>{isMusicPlaying ? "Vibing ♪" : "Vibe Mode"}</span>
            </div>
          </motion.button>}
        </div>
      </div>
    </motion.header>
  );
};

export default TopNavigation;
