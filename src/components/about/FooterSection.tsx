/**
 * FooterSection - Site footer with company links and language toggle
 * Features: Logo, tagline, social links, company links, language switcher
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube, Globe, ChevronDown } from "lucide-react";
import logo from "@/assets/milanoir-logo-infinity.png";

// Social media links
const socialLinks = [
  { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/share/1GdgPbQpWS/" },
  { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/milanoirevents?igsh=OGhzcjl1OHdjajRy" },
  { name: "TikTok", icon: null, url: "https://www.tiktok.com/@milanoirevents?is_from_webapp=1&sender_device=pc" },
  { name: "YouTube", icon: Youtube, url: "https://youtube.com/@milanoirevents?si=s1eAa9ycIymEKZkD" },
];

// Company navigation links
const companyLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

// Supported languages
const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "ne", label: "नेपाली", flag: "🇳🇵" },
];

// TikTok custom icon
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const FooterSection = () => {
  const [selectedLang, setSelectedLang] = useState("en");
  const [isLangOpen, setIsLangOpen] = useState(false);

  const currentLang = languages.find(l => l.code === selectedLang) || languages[0];

  const handleLanguageChange = (code: string) => {
    setSelectedLang(code);
    setIsLangOpen(false);
    // TODO: Integrate with i18n system when ready
    console.log("Language changed to:", code);
  };

  return (
    <footer className="py-16 md:py-20 border-t border-border relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cosmic-pink/5 rounded-full blur-[100px]" />
      </div>

      <div className="container px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main footer content */}
          <div className="grid md:grid-cols-3 gap-10 md:gap-8 mb-12">
            {/* Column 1: Logo & Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <motion.img 
                src={logo} 
                alt="Milanoir Events" 
                className="w-40 mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              
              {/* Glowing Tagline */}
              <motion.p 
                className="text-sm md:text-base max-w-xs font-medium italic"
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
                "The Beginning of Infinity — Representing the Nepalese Diaspora Globally"
              </motion.p>
            </motion.div>

            {/* Column 2: Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center md:items-start"
            >
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Company
              </h3>
              <nav className="flex flex-col gap-3">
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
            </motion.div>

            {/* Column 3: Social & Language */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center md:items-end"
            >
              {/* Social Links */}
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Follow Us
              </h3>
              <div className="flex items-center gap-3 mb-8">
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

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-2 px-4 py-2.5 glass-card rounded-xl border border-border/40 hover:border-primary/50 transition-all duration-300 min-w-[140px]"
                  aria-label="Select language"
                  aria-expanded={isLangOpen}
                >
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-lg">{currentLang.flag}</span>
                  <span className="text-sm font-medium text-foreground flex-1 text-left">
                    {currentLang.label}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isLangOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Language Dropdown */}
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bottom-full left-0 mb-2 w-full rounded-xl border border-border/40 bg-background shadow-xl overflow-hidden z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                          selectedLang === lang.code
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted/50 text-foreground"
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="section-divider w-full mb-8" />

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-xs text-muted-foreground/60">
              Registered in England & Wales • Company Number: 16820191
            </p>
            <p className="text-xs text-muted-foreground/50">
              © {new Date().getFullYear()} Milanoir Events Limited. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
