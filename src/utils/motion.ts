import type { Variants } from "framer-motion";

// Text animation
export const textVariant = (): Variants => ({
  hidden: {
    y: -50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1.25,
    },
  },
});

// Fade animation with direction
export const fadeIn = (
  direction: "up" | "down" | "left" | "right" | "" = "",
  type: "tween" | "spring" | "" = "",
  delay = 0,
  duration = 0.75
): Variants => ({
  hidden: {
    x:
      direction === "left"
        ? 100
        : direction === "right"
        ? -100
        : 0,
    y:
      direction === "up"
        ? 100
        : direction === "down"
        ? -100
        : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      ...(type ? { type } : {}),
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

// Zoom animation
export const zoomIn = (delay = 0, duration = 0.75): Variants => ({
  hidden: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "tween",
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

// Slide animation
export const slideIn = (
  direction: "up" | "down" | "left" | "right" | "" = "",
  type: "tween" | "spring" | "" = "",
  delay = 0,
  duration = 0.75
): Variants => ({
  hidden: {
    x:
      direction === "left"
        ? "-100%"
        : direction === "right"
        ? "100%"
        : 0,
    y:
      direction === "up"
        ? "100%"
        : direction === "down"
        ? "100%"
        : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      ...(type ? { type } : {}),
      delay,
      duration,
      ease: "easeOut",
    },
  },
});
