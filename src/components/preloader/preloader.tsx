import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";

import Loader from "./loader";
import { PreloaderContext } from "./preloader-context";

type PreloaderProps = {
  children: ReactNode;
  disabled?: boolean;
};

const LOADING_TIME = 2.5;

function Preloader({ children, disabled = false }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(() => !disabled);
  const [loadingPercent, setLoadingPercent] = useState(() =>
    disabled ? 100 : 0
  );

  const loadingTween = useRef<gsap.core.Tween | null>(null);
  const loadingPercentRef = useRef<{ value: number }>({
    value: disabled ? 100 : 0,
  });

  useEffect(() => {
    if (disabled) {
      return;
    }

    loadingTween.current = gsap.to(loadingPercentRef.current, {
      value: 100,
      duration: LOADING_TIME,
      ease: "slow(0.7,0.7,false)",
      onUpdate: () => {
        setLoadingPercent(loadingPercentRef.current.value);
      },
      onComplete: () => {
        setIsLoading(false);
      },
    });

    return () => {
      loadingTween.current?.kill();
    };
  }, [disabled]);

  const bypassLoading = () => {
    if (disabled) return;
    loadingTween.current?.progress(0.99).kill();
    setLoadingPercent(100);
    setIsLoading(false);
  };

  return (
    <PreloaderContext.Provider
      value={{ isLoading, bypassLoading, loadingPercent }}
    >
      <AnimatePresence mode="wait">{isLoading && <Loader />}</AnimatePresence>
      {children}
    </PreloaderContext.Provider>
  );
}

export default Preloader;
