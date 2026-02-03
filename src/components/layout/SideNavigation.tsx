/**
 * SideNavigation - Fixed left-side navigation with glassmorphism
 * Desktop: Always visible, expandable
 * Mobile: Hamburger menu with slide-in overlay
 */

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Users, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigationItems } from "@/data/content";
import logo from "@/assets/milanoir-logo-infinity.png";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  about: Users,
  contact: Mail,
};

const SideNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile hamburger button - fixed top left */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 glass-card rounded-xl border border-border/50 hover:border-primary/30 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open navigation menu"
      >
        <Menu className="w-6 h-6 text-foreground" />
      </motion.button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />

            {/* Mobile menu */}
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 glass-card border-r border-border/50 z-50 flex flex-col"
            >
              {/* Close button */}
              <div className="flex items-center justify-between p-4 border-b border-border/30">
                <Link to="/" onClick={() => setIsOpen(false)}>
                  <img src={logo} alt="Milanoir" className="h-10 w-auto" />
                </Link>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              </div>

              {/* Navigation links */}
              <div className="flex-1 p-4 space-y-2">
                {navigationItems.map((item, index) => {
                  const Icon = iconMap[item.id] || Home;
                  const active = isActive(item.href);

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group",
                          active
                            ? "bg-primary/10 border border-primary/30"
                            : "hover:bg-muted/50 border border-transparent hover:border-border/50"
                        )}
                      >
                        <div
                          className={cn(
                            "p-2 rounded-lg transition-all duration-300",
                            active
                              ? "bg-primary/20 text-primary"
                              : "bg-muted/30 text-muted-foreground group-hover:text-foreground"
                          )}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span
                          className={cn(
                            "font-medium transition-colors",
                            active ? "text-primary" : "text-foreground"
                          )}
                        >
                          {item.label}
                        </span>
                        {active && (
                          <motion.div
                            layoutId="mobile-active-indicator"
                            className="ml-auto w-2 h-2 rounded-full bg-primary"
                            style={{
                              boxShadow: "0 0 10px hsl(330 85% 60% / 0.5)",
                            }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="hidden lg:flex fixed left-0 top-0 bottom-0 w-20 hover:w-64 glass-card border-r border-border/50 z-40 flex-col transition-all duration-300 group/nav"
      >
        {/* Logo */}
        <div className="p-4 border-b border-border/30 flex items-center justify-center group-hover/nav:justify-start transition-all duration-300 overflow-hidden">
          <Link to="/">
            <motion.img
              src={logo}
              alt="Milanoir"
              className="h-10 w-auto min-w-[40px]"
              whileHover={{ scale: 1.05 }}
            />
          </Link>
        </div>

        {/* Navigation links */}
        <div className="flex-1 p-3 space-y-2">
          {navigationItems.map((item) => {
            const Icon = iconMap[item.id] || Home;
            const active = isActive(item.href);

            return (
              <Link
                key={item.id}
                to={item.href}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group/link overflow-hidden",
                  active
                    ? "bg-primary/10 border border-primary/30"
                    : "hover:bg-muted/50 border border-transparent hover:border-border/50"
                )}
              >
                <div
                  className={cn(
                    "p-2 rounded-lg transition-all duration-300 shrink-0",
                    active
                      ? "bg-primary/20 text-primary"
                      : "bg-muted/30 text-muted-foreground group-hover/link:text-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={cn(
                    "font-medium whitespace-nowrap opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300",
                    active ? "text-primary" : "text-foreground"
                  )}
                >
                  {item.label}
                </span>
                {active && (
                  <motion.div
                    layoutId="desktop-active-indicator"
                    className="ml-auto w-2 h-2 rounded-full bg-primary shrink-0 opacity-0 group-hover/nav:opacity-100 transition-opacity"
                    style={{
                      boxShadow: "0 0 10px hsl(330 85% 60% / 0.5)",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
};

export default SideNavigation;
