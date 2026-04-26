"use client";

import React from "react";

import { Sidebar } from "./components/sidebar";
import { Navbar } from "./components/navbar";

import { Logotype } from "@/shared/ui/logotype";
import { tabs } from "../model/data/tabs.data";
import { useMobile } from "@/shared/lib/hooks";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useMobile();

  return (
    <div className="min-h-screen bg-[var(--ui-background)] transition-colors duration-300">
      {isMobile && <Logotype />}

      {/* <Notifications /> */}

      <main
        className="min-h-screen transition-all duration-300 ease-in-out"
        style={{
          marginLeft: !isMobile ? "280px" : "0",
          width: !isMobile ? "calc(100% - 280px)" : "100%",
        }}
      >
        <div
          className={`text-[var(--ui-text)] container mx-auto px-4 pt-4 pb-28`}
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
            {/* <LevelBar {...levelData} /> */}
          </div>
        </div>
      ) : (
        <div className="fixed bottom-0 left-0 right-0 z-50">
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
