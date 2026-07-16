import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

interface LenisProps {
  children: React.ReactNode;
  isInsideModal?: boolean;
}

const SmoothScroll: React.FC<LenisProps> = ({
  children,
  isInsideModal = false,
}) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,         
      smoothWheel: true,
      easing: (t) => 1 - Math.pow(1 - t, 3), 
      anchors: false,
    });

    lenisRef.current = lenis;

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        e.preventDefault();
        lenis.scrollTo(targetElement as HTMLElement, { offset: -80 });
      }
    };

    document.addEventListener("click", handleAnchorClick);

    let frameId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    if (isInsideModal) {
      lenis.stop();
    }

    // Cleanup on unmount
    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [isInsideModal]);

  return <>{children}</>;
};

export default SmoothScroll;
