/**
 * FooterSection - Site footer with centered layout
 * Features: Links left, Logo + tagline center, Social + language right, registration bottom
 */

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram, Youtube, Globe, ChevronDown } from "lucide-react";
import logo from "@/assets/milanoir-logo-infinity.png";
import { useLanguage, languages, type LanguageCode } from "@/contexts/LanguageContext";

// Social media links
const socialLinks = [
  { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/share/1GdgPbQpWS/" },
  { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/milanoirevents?igsh=OGhzcjl1OHdjajRy" },
  { name: "TikTok", icon: null, url: "https://www.tiktok.com/@milanoirevents?is_from_webapp=1&sender_device=pc" },
  { name: "YouTube", icon: Youtube, url: "https://youtube.com/@milanoirevents?si=s1eAa9ycIymEKZkD" },
];

// TikTok custom icon
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const FooterSection = () => {
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
    <footer className="py-16 md:py-20 border-t border-border relative overflow-hidden">
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
            className="flex flex-col items-center text-center mb-10"
          >
            <motion.img 
              src={logo} 
              alt="Milanoir Events" 
              className="w-48 md:w-56 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            
            {/* Glowing Tagline */}
            <motion.p 
              className="text-sm md:text-base max-w-md font-medium italic"
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

          {/* Follow Us, Social Links, Links & Language - all on same row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-10"
          >
            {/* Follow Us Label */}
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {t.footer.followUs}
            </h3>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  aria-label={social.name}
                >
                  {social.icon ? (
                    <social.icon className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_hsl(330,85%,60%)]" />
                  ) : (
                    <TikTokIcon />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Divider */}
            <span className="hidden md:block w-px h-5 bg-border/50" />

            {/* Links */}
            <nav className="flex items-center gap-4">
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
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

          {/* Divider */}
          <div className="section-divider w-full mb-8" />

          {/* Bottom section - Centered */}
          <div className="flex flex-col items-center gap-3 text-center">
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

export default FooterSection;
