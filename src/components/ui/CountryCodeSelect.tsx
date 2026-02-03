/**
 * CountryCodeSelect - Dropdown for selecting country codes
 * Mobile-friendly with search and flags
 */

import * as React from "react";
import { ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { countryCodes, defaultCountryCode, type CountryCode } from "@/data/countryCodes";
import { cn } from "@/lib/utils";

interface CountryCodeSelectProps {
  value: string;
  onChange: (code: string) => void;
  className?: string;
}

const CountryCodeSelect = ({ value, onChange, className }: CountryCodeSelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Get current selected country
  const selectedCountry = countryCodes.find(c => c.code === value) || countryCodes[0];

  // Filter countries based on search
  const filteredCountries = React.useMemo(() => {
    if (!search) return countryCodes;
    const lowerSearch = search.toLowerCase();
    return countryCodes.filter(
      c => c.country.toLowerCase().includes(lowerSearch) || c.code.includes(search)
    );
  }, [search]);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle selection
  const handleSelect = (code: string) => {
    onChange(code);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 h-12 px-3 glass-card border border-border/40 rounded-l-lg bg-background/50 hover:border-primary/50 focus:border-primary/50 focus:outline-none transition-colors min-w-[90px]"
        aria-label="Select country code"
        aria-expanded={isOpen}
      >
        <span className="text-lg" role="img" aria-label={selectedCountry.country}>
          {selectedCountry.flag}
        </span>
        <span className="text-sm font-medium text-foreground">{selectedCountry.code}</span>
        <ChevronDown className={cn(
          "w-3.5 h-3.5 text-muted-foreground transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-1 w-64 max-h-72 overflow-hidden rounded-xl border border-border/40 bg-background shadow-xl z-50"
          >
            {/* Search input */}
            <div className="p-2 border-b border-border/30">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search country..."
                  className="w-full h-9 pl-9 pr-3 text-sm bg-muted/50 border-0 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/60"
                  autoFocus
                />
              </div>
            </div>

            {/* Country list */}
            <div className="overflow-y-auto max-h-52 p-1">
              {filteredCountries.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground py-4">
                  No countries found
                </p>
              ) : (
                filteredCountries.map((country) => (
                  <button
                    key={country.code + country.country}
                    type="button"
                    onClick={() => handleSelect(country.code)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-lg transition-colors",
                      value === country.code
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted/50 text-foreground"
                    )}
                  >
                    <span className="text-lg" role="img" aria-label={country.country}>
                      {country.flag}
                    </span>
                    <span className="flex-1 text-sm truncate">{country.country}</span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {country.code}
                    </span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CountryCodeSelect;
