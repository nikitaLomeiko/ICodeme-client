"use client";

import { Button } from "@/shared/ui/kit";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

export const WorkZone: React.FC<IProps> = ({ children }) => {
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
    }
  };

  return (
    <div className="relative">
      <div
        className="min-h-full overflow-y-auto overflow-x-auto"
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
      <Button disabled size="lg" className="w-full absolute -bottom-20">
        Далее
      </Button>
    </div>
  );
};
