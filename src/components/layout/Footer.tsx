/**
 * FooterSection - Site footer with centered layout
 * Features: Links left, Logo + tagline center, Social + language right, registration bottom
 */

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/milanoir-logo-infinity.png";
import { useLanguage, languages, type LanguageCode } from "@/contexts/LanguageContext";
import { socialLinks, TikTokIcon } from "@/data/socialLinks";

const Footer = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find(l => l.code === language) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (code: LanguageCode) => {
    setLanguage(code);
    setIsLangOpen(false);
  };

  // Company links (Privacy Policy and Terms only)
  const companyLinks = [
    { label: t.footer.privacyPolicy, href: "/privacy-policy" },
    { label: t.footer.terms, href: "/terms" },
  ];

  return (
    <footer className="pt-8 md:pt-12 pb-12 md:pb-16 relative overflow-hidden">
      {/* Subtle top gradient fade instead of hard border */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-transparent pointer-events-none" />
      
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cosmic-pink/5 rounded-full blur-[100px]" />
      </div>

      <div className="container px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Center section - Logo & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center mb-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-44 md:w-52 mb-4"
            >
              <Image
                src={logo}
                alt="Milanoir Events"
                width={208}
                height={208}
                className="w-full h-auto"
              />
            </motion.div>
            
            {/* Glowing Tagline - Larger */}
            <motion.p 
              className="text-base md:text-xl lg:text-2xl max-w-xl font-medium italic"
              style={{
                background: "linear-gradient(90deg, hsl(330 85% 65%), hsl(280 80% 60%), hsl(185 85% 55%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 10px hsl(330 85% 60% / 0.4))",
              }}
              animate={{
                filter: [
                  "drop-shadow(0 0 10px hsl(330 85% 60% / 0.4))",
                  "drop-shadow(0 0 20px hsl(185 85% 55% / 0.5))",
                  "drop-shadow(0 0 10px hsl(330 85% 60% / 0.4))",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              "{t.footer.tagline}"
            </motion.p>
          </motion.div>

          {/* Follow Us & Social Links - Separate centered row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center text-center mb-6"
          >
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {t.footer.followUs}
            </h3>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  aria-label={social.name}
                >
                  {social.icon ? (
                    <social.icon className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_hsl(330,85%,60%)]" />
                  ) : (
                    <TikTokIcon />
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links & Language - Same row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-5 mb-6"
          >
            {/* Links */}
            <nav className="flex items-center gap-4">
              {companyLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Divider */}
            <span className="hidden md:block w-px h-5 bg-border/50" />

            {/* Language Switcher */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-2 glass-card rounded-lg border border-border/40 hover:border-primary/50 transition-all duration-300"
                aria-label="Select language"
                aria-expanded={isLangOpen}
              >
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span className="text-base">{currentLang.flag}</span>
                <span className="text-sm font-medium text-foreground">
                  {currentLang.label}
                </span>
                <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${isLangOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Language Dropdown */}
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full left-0 mb-2 w-full min-w-[140px] rounded-xl border border-border/40 bg-background/95 backdrop-blur-md shadow-xl overflow-hidden z-50"
                  >
                    {languages.filter(lang => lang.code !== language).map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 text-foreground"
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Subtle Divider */}
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent mx-auto mb-5" />

          {/* Bottom section - Centered */}
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-xs text-muted-foreground/60">
              {t.footer.registered}
            </p>
            <p className="text-xs text-muted-foreground/50">
              {t.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
