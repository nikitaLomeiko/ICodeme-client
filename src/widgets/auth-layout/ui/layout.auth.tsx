"use client";

import React from "react";
import { useAnimation } from "../model/hooks/use.animation";
import { SphereGradient } from "./components/sphere.gradient";
import { CardLiquid } from "./components/card.liquid";
import { Particals } from "./components/particals";

interface IProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<IProps> = ({ children }) => {
  const { rotateX, rotateY } = useAnimation();

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: "var(--ui-background)",
        backgroundImage:
          "linear-gradient(to bottom right, var(--ui-background-secondary), var(--ui-background), var(--ui-background-tertiary))",
      }}
    >
      <SphereGradient />

      <Particals />

      <div className="relative min-h-screen flex items-center justify-center p-4 perspective-1000">
        <CardLiquid
          rotateX={rotateX}
          rotateY={rotateY}
          title="ICodeMe"
          subtitle="Learn programming with AI"
        >
          {children}
        </CardLiquid>
      </div>
    </div>
  );
};
