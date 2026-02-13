/**
 * CountdownTimer - Real-time countdown to event date
 * Bento-style glassmorphism cells with pulsing glow animations
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { CountdownTime } from "@/types/event";
import { uiText, mainEvent } from "@/data/content";

const calculateTimeLeft = (targetDate: Date): CountdownTime => {
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(
    calculateTimeLeft(mainEvent.date)
  );
  const [isEventPassed, setIsEventPassed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(mainEvent.date);
      setTimeLeft(newTimeLeft);

      // Check if event has passed
      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        setIsEventPassed(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: uiText.countdown.days },
    { value: timeLeft.hours, label: uiText.countdown.hours },
    { value: timeLeft.minutes, label: uiText.countdown.minutes },
    { value: timeLeft.seconds, label: uiText.countdown.seconds },
  ];

  if (isEventPassed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-2xl p-6 md:p-8 text-center"
      >
        <span className="text-2xl md:text-3xl font-heading font-bold gradient-text">
          {uiText.countdown.eventPassed}
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative group"
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "radial-gradient(circle at center, hsl(330 85% 60% / 0.2), transparent 70%)",
                filter: "blur(20px)",
              }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            />

            {/* Card */}
            <div className="relative glass-card rounded-xl md:rounded-2xl px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-8 text-center border border-border/50 hover:border-primary/30 transition-all duration-300 overflow-visible">
              {/* Number with pulsing glow */}
              <motion.span
                className="block text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-heading font-bold gradient-text"
                animate={{
                  textShadow: [
                    "0 0 20px hsl(330 85% 60% / 0.3)",
                    "0 0 40px hsl(200 85% 55% / 0.5)",
                    "0 0 20px hsl(330 85% 60% / 0.3)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.25,
                }}
              >
                {String(unit.value).padStart(2, "0")}
              </motion.span>

              {/* Label */}
              <span className="block text-[10px] sm:text-xs md:text-sm text-muted-foreground uppercase tracking-wider mt-1 md:mt-2">
                {unit.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CountdownTimer;
