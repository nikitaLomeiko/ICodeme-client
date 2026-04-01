"use client";

import React from "react";
import { useAnimation } from "../model/hooks/use.animation";
import { Background } from "./components/background";
import { SphereGradient } from "./components/sphere.gradient";
import { CardLiquid } from "./components/card.liquid";
import { Particals } from "./components/particals";

interface IProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<IProps> = ({ children }) => {
  const { rotateX, rotateY, translateX, translateY } = useAnimation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      <Background />

      <SphereGradient />

      <Particals />

      <div className="relative min-h-screen flex items-center justify-center p-4 perspective-1000">
        <CardLiquid
          rotateX={rotateX}
          rotateY={rotateY}
          translateX={translateX}
          translateY={translateY}
          title="ICodeMe"
          subtitle="Learn programming with AI"
        >
          {children}
        </CardLiquid>
      </div>
    </div>
  );
};
