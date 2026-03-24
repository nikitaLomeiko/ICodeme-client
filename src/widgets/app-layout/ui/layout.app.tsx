"use client";

import React from "react";
import { motion } from "framer-motion";
import { TypePosition } from "../model/types/type.position";
import { usePosition } from "../model/hooks/use.position";
import { LayoutWrapper } from "./components/layout.wrapper";

// import { NextUIProvider } from "@nextui-org/react";

interface IProps {
  children: React.ReactNode;
  position?: TypePosition;
  panelWidth?: string;
  className?: string;
}

export const LayoutApp: React.FC<IProps> = ({
  children,
  position = "right",
  panelWidth = "w-[30%]",
  className = "",
}) => {
  const { contentPosition, initialX, animation } = usePosition(position);

  return (
    <LayoutWrapper position={position}>
      <motion.div
        initial={animation.initial}
        animate={animation.animate}
        transition={animation.transition}
        className={`${className} absolute top-0 ${contentPosition} h-full ${position === "center" ? "left-1/2 -translate-x-1/2" : ""} ${panelWidth} backdrop-blur-md shadow-2xl overflow-y-auto`}
      >
        <div className="min-h-full w-full flex items-center justify-center p-8">
          <div className="w-full max-w-[480px]">{children}</div>
        </div>
      </motion.div>
    </LayoutWrapper>
  );
};
