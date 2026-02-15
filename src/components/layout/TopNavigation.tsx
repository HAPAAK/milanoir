/**
 * TopNavigation - Fixed top navigation bar with iOS-inspired glassmorphism
 * Features: Logo on left, text links on right (desktop only)
 * Mobile uses bottom tab navigation instead
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { navigationItems } from "@/data/content";
import logo from "@/assets/milanoir-logo.png";

const TopNavigation = () => {
  const { pathname } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll for enhanced glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Main navigation bar */}
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
            <motion.img
              src={typeof logo === "string" ? logo : logo.src}
              alt="Milanoir Events"
              className="h-8 md:h-10 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </Link>

          {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-8" role="navigation">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                    isActive(item.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))",
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                </Link>
              ))}
            </nav>
        </div>
      </motion.header>
    </>
  );
};

export default TopNavigation;
