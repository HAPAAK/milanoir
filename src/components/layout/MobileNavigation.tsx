/**
 * MobileNavigation - Modern bottom tab navigation for mobile
 * Fixed at bottom with iOS-inspired design and active state indicators
 */

import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Home, Users, Mail, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: typeof Home;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "/", icon: Home },
  { id: "about", label: "About", href: "/about-us", icon: Users },
  { id: "waitlist", label: "Waitlist", href: "/waitlist", icon: Ticket },
  { id: "contact", label: "Contact", href: "/contact", icon: Mail },
];

const MobileNavigation = () => {
  const { pathname } = useRouter();

  const isActive = (href: string) => pathname === href;

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      role="navigation"
      aria-label="Mobile navigation"
    >
      {/* Safe area spacer for notched devices */}
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
                  "relative flex flex-col items-center justify-center w-16 h-14 rounded-2xl transition-all duration-300",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                {/* Active indicator background */}
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

                {/* Icon */}
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="relative z-10"
                >
                  <Icon 
                    className={cn(
                      "w-5 h-5 transition-all duration-300",
                      active && "drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
                    )} 
                  />
                </motion.div>

                {/* Label */}
                <span 
                  className={cn(
                    "relative z-10 text-[10px] font-medium mt-1 transition-all duration-300",
                    active && "font-semibold"
                  )}
                >
                  {item.label}
                </span>

                {/* Active dot indicator */}
                {active && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    style={{
                      boxShadow: "0 0 8px hsl(var(--primary))",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default MobileNavigation;
