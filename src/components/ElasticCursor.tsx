import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { cn } from "../lib/utils";
import { useMouse } from "../hooks/use-mouse";
import { useMediaQuery } from "../hooks/use-media-query";
import { usePreloader } from "../components/preloader/preloader-context";

type TickerCallback = () => void;

function useTicker(callback: TickerCallback | null, paused: boolean) {
  useEffect(() => {
    if (!paused && callback) {
      gsap.ticker.add(callback);
    }
    return () => {
      if (callback) {
        gsap.ticker.remove(callback);
      }
    };
  }, [callback, paused]);
}

type SetterFn = (value: number) => void;

type CursorSetters = {
  x?: SetterFn;
  y?: SetterFn;
  r?: SetterFn;
  width?: SetterFn;
  sx?: SetterFn;
  sy?: SetterFn;
};

function getScale(diffX: number, diffY: number) {
  const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  return Math.min(distance / 735, 0.35);
}

function getAngle(diffX: number, diffY: number) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

function getRekt(el: HTMLElement) {
  if (el.classList.contains("cursor-can-hover"))
    return el.getBoundingClientRect();
  else if (el.parentElement?.classList.contains("cursor-can-hover"))
    return el.parentElement.getBoundingClientRect();
  else if (
    el.parentElement?.parentElement?.classList.contains("cursor-can-hover")
  )
    return el.parentElement.parentElement.getBoundingClientRect();
  return null;
}

const CURSOR_DIAMETER = 50;

const ElasticCursor: React.FC = () => {
  const { loadingPercent, isLoading } = usePreloader();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const jellyRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const { x, y } = useMouse();

  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });

  const settersRef = useRef<CursorSetters>({});

  useLayoutEffect(() => {
  if (!jellyRef.current) return;

  settersRef.current = {
    x: gsap.quickSetter(jellyRef.current, "x", "px") as SetterFn,
    y: gsap.quickSetter(jellyRef.current, "y", "px") as SetterFn,
    r: gsap.quickSetter(jellyRef.current, "rotate", "deg") as SetterFn,
    sx: gsap.quickSetter(jellyRef.current, "scaleX") as SetterFn,
    sy: gsap.quickSetter(jellyRef.current, "scaleY") as SetterFn,
    width: gsap.quickSetter(jellyRef.current, "width", "px") as SetterFn,
  };
  }, []);


  const loop = useCallback<TickerCallback>(() => {
    const setters = settersRef.current;
    if (!setters.width || !setters.sx || !setters.sy || !setters.r) return;

    const { x: vx, y: vy } = velRef.current;
    const rotation = getAngle(vx, vy);
    const scale = getScale(vx, vy);

    if (!isHovering && !isLoading) {
      const { x: px, y: py } = posRef.current;
      setters.x?.(px);
      setters.y?.(py);
      setters.width?.(50 + scale * 300);
      setters.r?.(rotation);
      setters.sx?.(1 + scale);
      setters.sy?.(1 - scale * 2);
    } else {
      setters.r?.(0);
    }
  }, [isHovering, isLoading]);

  const [cursorMoved, setCursorMoved] = useState(false);

  useLayoutEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!jellyRef.current) return;
      if (!cursorMoved) setCursorMoved(true);

      const el = e.target as HTMLElement;
      const hoverElemRect = getRekt(el);

      if (hoverElemRect) {
        const rect = el.getBoundingClientRect();
        setIsHovering(true);

        gsap.to(jellyRef.current, { rotate: 0, duration: 0 });
        gsap.to(jellyRef.current, {
          width: el.offsetWidth + 20,
          height: el.offsetHeight + 20,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          borderRadius: 10,
          duration: 1.5,
          ease: "elastic.out(1, 0.3)",
        });
      } else {
        gsap.to(jellyRef.current, {
          borderRadius: 50,
          width: CURSOR_DIAMETER,
          height: CURSOR_DIAMETER,
        });
        setIsHovering(false);
      }

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      gsap.to(posRef.current, {
        x: mouseX,
        y: mouseY,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        onUpdate: () => {
          velRef.current.x = (mouseX - posRef.current.x) * 1.2;
          velRef.current.y = (mouseY - posRef.current.y) * 1.2;
        },
      });

      loop();
    };

    if (!isLoading) window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (!isLoading) window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isLoading, isMobile, cursorMoved, loop]);

  useEffect(() => {
    if (!jellyRef.current) return;
    jellyRef.current.style.height = "2rem";
    jellyRef.current.style.borderRadius = "1rem";
    jellyRef.current.style.width = `${loadingPercent * 2}vw`;
  }, [loadingPercent]);

  useTicker(loop, isLoading || !cursorMoved || isMobile);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={jellyRef}
        id="jelly-id"
        className={cn(
          "border-2 border-black dark:border-white",
          "jelly-blob fixed left-0 top-0 rounded-lg z-[999] pointer-events-none will-change-transform",
          "translate-x-[-50%] translate-y-[-50%]"
        )}
        style={{
          width: CURSOR_DIAMETER,
          height: CURSOR_DIAMETER,
          zIndex: 100,
          backdropFilter: "invert(100%)",
        }}
      />
      <div
        className="w-3 h-3 rounded-full fixed translate-x-[-50%] translate-y-[-50%] pointer-events-none transition-none duration-300"
        style={{
          top: y,
          left: x,
          backdropFilter: "invert(100%)",
        }}
      />
    </>
  );
};

export default ElasticCursor;
