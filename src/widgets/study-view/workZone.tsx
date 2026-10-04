"use client";

import { motion } from "framer-motion";
import React from "react";
import { FaCrosshairs, FaMap } from "react-icons/fa";
import { SideBar } from "./components/side.bar";
import { useRouter } from "next/navigation";

interface IProps {
  children: React.ReactNode;
}

export const WorkZone: React.FC<IProps> = ({ children }) => {
  const router = useRouter();
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
    }
  };

  const handleGoToCurrentStep = () => {
    const currentStep = document.querySelector("[data-current-step]");

    currentStep?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  const handleOpenModulesMap = () => {
    router.push("/map");
  };

  return (
    <div className="relative h-full min-h-0 w-full">
      <div
        className="h-full min-h-0 pr-[440px]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(128, 128, 128, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(128, 128, 128, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          backgroundColor: "var(--ui-background)",
          scrollBehavior: "smooth",
        }}
        onWheel={handleWheel}
      >
        {children}
      </div>

      <div className="fixed right-[432px] bottom-8 z-50 flex flex-col gap-3">
        <motion.button
          type="button"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleOpenModulesMap}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--ui-border)] bg-[var(--ui-background-secondary)] text-[var(--ui-text)] shadow-xl backdrop-blur-md transition-colors hover:bg-[var(--ui-background-tertiary)]"
          title="Карта модулей"
        >
          <FaMap size={17} />
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleGoToCurrentStep}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--ui-border)] bg-[var(--ui-background-secondary)] text-[var(--ui-text)] shadow-xl backdrop-blur-md transition-colors hover:bg-[var(--ui-background-tertiary)]"
          title="К текущему шагу"
        >
          <FaCrosshairs size={17} />
        </motion.button>
      </div>

      <SideBar />
    </div>
  );
};
