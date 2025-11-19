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
    });

    lenisRef.current = lenis;

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
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [isInsideModal]);

  return <>{children}</>;
};

export default SmoothScroll;
