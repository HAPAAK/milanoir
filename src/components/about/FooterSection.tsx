import { motion } from "framer-motion";
import logo from "@/assets/milanoir-logo.png";
import { Facebook, Instagram, Youtube } from "lucide-react";

const socialLinks = [
  { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/share/1GdgPbQpWS/" },
  { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/milanoirevents?igsh=OGhzcjl1OHdjajRy" },
  { name: "TikTok", icon: null, url: "https://www.tiktok.com/@milanoirevents?is_from_webapp=1&sender_device=pc" },
  { name: "YouTube", icon: Youtube, url: "https://youtube.com/@milanoirevents?si=s1eAa9ycIymEKZkD" },
];

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const FooterSection = () => {
  return (
    <footer className="py-20 border-t border-border relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cosmic-pink/5 rounded-full blur-[100px]" />
      </div>

      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <motion.img 
            src={logo} 
            alt="Milanoir Events" 
            className="w-40 mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          
          <p className="text-muted-foreground text-sm max-w-md mb-6">
            Milanoir Events Limited — Curating experiences that transcend ordinary entertainment.
          </p>

          {/* Social Links */}
          <motion.div 
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 group"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
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
          </motion.div>

          <p className="text-xs text-muted-foreground/60 mb-2">
            Registered in London, United Kingdom • Company Number: 16820191
          </p>
          
          <div className="section-divider w-32 my-6" />
          
          <p className="text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} Milanoir Events Limited. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
