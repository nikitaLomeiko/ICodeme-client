"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { animatedData } from "../../model/data/animated.data";

interface AnimatedFormProps {
  mode: string;
  children: React.ReactNode;
}

export const AnimatedForm: React.FC<AnimatedFormProps> = ({
  mode,
  children,
}) => {
  const [direction, setDirection] = React.useState(0);
  const [prevMode, setPrevMode] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (prevMode !== null && prevMode !== mode) {
      const modes = ["login", "register", "forgot", "verify"];
      const currentIndex = modes.indexOf(mode);
      const prevIndex = modes.indexOf(prevMode);
      setDirection(currentIndex > prevIndex ? 1 : -1);
    }
    setPrevMode(mode);
  }, [mode, prevMode]);

  return (
    <AnimatePresence initial={false} mode="wait" custom={direction}>
      <motion.div
        key={mode}
        custom={direction}
        variants={animatedData}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
          scale: { duration: 0.2 },
        }}
        style={{ position: "relative" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
