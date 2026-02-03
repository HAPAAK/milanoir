/**
 * ParallaxContainer - Creates premium "liquid scroll" depth effect
 * Uses Framer Motion's useScroll and useTransform for smooth parallax
 */

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxContainerProps {
  children: ReactNode;
  /** Speed multiplier: 0.5 = moves at half scroll speed (appears further), 1.5 = faster */
  speed?: number;
  /** Direction of parallax movement */
  direction?: "vertical" | "horizontal";
  /** Additional className for the container */
  className?: string;
  /** Whether to use the element as scroll container (vs window) */
  useElement?: boolean;
}

const ParallaxContainer = ({
  children,
  speed = 0.5,
  direction = "vertical",
  className = "",
  useElement = false,
}: ParallaxContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll(
    useElement
      ? { target: ref, offset: ["start end", "end start"] }
      : undefined
  );
  
  // Calculate the parallax offset based on speed
  // A speed of 0.5 means the element moves 50% slower than scroll
  // A speed of 1.5 means the element moves 50% faster
  const offset = (1 - speed) * 200; // Range in pixels
  
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "vertical" ? [offset, -offset] : [0, 0]
  );
  
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "horizontal" ? [offset, -offset] : [0, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxContainer;
