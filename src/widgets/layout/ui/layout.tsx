"use client";

import React from "react";

import { Notifications } from "./components/notifications";
import { Sidebar } from "./components/sidebar";
import { Navbar } from "./components/navbar";
import { LevelBar } from "./components/levelbar";

import { Logotype } from "@/shared/ui/logotype";
import { levelData } from "../model/data/level.data";
import { tabs } from "../model/data/tabs.data";
import { useMobile } from "@/shared/lib/hooks";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {isMobile && <Logotype />}

      <Notifications />

      <main
        className="min-h-screen transition-all duration-300 ease-in-out"
        style={{
          marginLeft: !isMobile ? "280px" : "0",
          width: !isMobile ? "calc(100% - 280px)" : "100%",
        }}
      >
        <div
          className={`container mx-auto px-4 ${!isMobile ? "pt-4" : "pt-16"} pb-28`}
        >
          {children}
        </div>
      </main>

      {!isMobile ? (
        <div>
          <Sidebar
            defaultSelectedId={tabs[0].id}
            onSelectTab={console.log}
            tabs={tabs}
          />
          <div className="-mt-16 ml-[290px] w-[calc(100%-320px)]">
            <LevelBar {...levelData} />
          </div>
        </div>
      ) : (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <LevelBar {...levelData} />
          <Navbar
            defaultSelectedId={tabs[0].id}
            tabs={tabs}
            onSelectTab={console.log}
          />
        </div>
      )}
    </div>
  );
};
