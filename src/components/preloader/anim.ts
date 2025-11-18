import type { Variants } from "framer-motion";

export const opacity: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0.75,
    transition: { duration: 1, delay: 0.2 },
  },
};

export const slideUp: Variants = {
  initial: {
    top: 0,
  },
  exit: {
    top: "-100dvh",
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      delay: 0.2,
    },
  },
};
