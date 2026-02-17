/**
 * Shared Framer Motion animation variants.
 * Use as spread props: <motion.div {...fadeInUp}> or pick individual keys.
 */

export const fadeInUp = {
  initial: { opacity: 0, y: 40 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-100px" } as const,
  transition: { duration: 0.8 } as const,
};

export const fadeInDown = {
  initial: { opacity: 0, y: -20 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.6 } as const,
};

export const fadeIn = {
  initial: { opacity: 0 } as const,
  animate: { opacity: 1 } as const,
  transition: { duration: 0.6 } as const,
};

/** Staggered delay for items rendered in a list. */
export const staggeredDelay = (index: number, base = 0.1) => ({
  delay: index * base,
  duration: 0.5,
});
