import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./style.module.scss";
import { opacity, slideUp } from "./anim";
import { usePreloader } from "./preloader-context";
import type { Variants } from "framer-motion";

const steps = [
  "10%",
  "20%",
  "30%",
  "40%",
  "50%",
  "60%",
  "70%",
  "80%",
  "90%",
  "100%",
];

export default function Loader() {
  const { loadingPercent } = usePreloader();
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState(() => ({
  width: typeof window !== "undefined" ? window.innerWidth : 0,
  height: typeof window !== "undefined" ? window.innerHeight : 0,
  }));

  useEffect(() => {
  const handleResize = () => {
    setDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    if (index === steps.length - 1) return;
    const timeout = setTimeout(
      () => setIndex((prev) => prev + 1),
      index === 0 ? 1000 : 150
    );
    return () => clearTimeout(timeout);
  }, [index]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  }  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;


  const curve: Variants = {
  initial: {
    d: initialPath,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
  exit: {
    d: targetPath,
    transition: { duration: 0.7, ease: "easeInOut", delay: 0.3 },
  },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className={styles.introduction}
    >
      {dimension.width > 0 && (
        <>
          <motion.p variants={opacity} initial="initial" animate="enter">
            {(loadingPercent - (loadingPercent % 5)).toFixed(0)} %
          </motion.p>
          <svg>
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
            ></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
}
