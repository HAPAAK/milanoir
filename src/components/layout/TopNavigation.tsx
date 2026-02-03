/**
 * TopNavigation - Fixed top navigation bar with iOS-inspired glassmorphism
 * Features: Logo on left, text links on right, mobile hamburger menu
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navigationItems, uiText } from "@/data/content";
import logo from "@/assets/milanoir-logo.png";

const TopNavigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll for enhanced glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => location.pathname === href;

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
          <Link
            to="/"
            className="relative z-10 flex items-center gap-2 group"
            aria-label="Milanoir Events - Home"
          >
            <motion.img
              src={logo}
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
                to={item.href}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isActive(item.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {/* Active indicator */}
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

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative z-10 p-2 text-foreground hover:text-primary transition-colors"
            aria-label={isMenuOpen ? uiText.nav.menuClose : uiText.nav.menuOpen}
            aria-expanded={isMenuOpen}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden"
          >
            <nav
              className="backdrop-blur-2xl bg-background/95 border-b border-border/40 py-6"
              style={{
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="container px-4 flex flex-col gap-4">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      to={item.href}
                      className={`block py-3 px-4 rounded-xl text-base font-medium transition-all duration-300 ${
                        isActive(item.href)
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TopNavigation;
