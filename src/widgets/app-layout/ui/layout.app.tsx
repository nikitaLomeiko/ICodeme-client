"use client";

import React from "react";
import { motion } from "framer-motion";
import { TypePosition } from "../model/types/type.position";
import { usePosition } from "../model/hooks/use.position";
import { LayoutWrapper } from "./components/layout.wrapper";

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
  const { contentPosition, initialX } = usePosition(position);

  return (
    <LayoutWrapper position={position}>
      <motion.div
        initial={{ x: initialX }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`${className} absolute top-0 ${contentPosition} h-full ${panelWidth} backdrop-blur-md shadow-2xl overflow-y-auto`}
      >
        <div className="min-h-full w-full flex items-center justify-center p-8">
          <div className="w-full max-w-[480px]">{children}</div>
        </div>
      </motion.div>
    </LayoutWrapper>
  );
};
