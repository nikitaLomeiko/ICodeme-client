"use client";

import React from "react";

import { Sidebar } from "./components/sidebar";
import { Navbar } from "./components/navbar";

import { Logotype } from "@/shared/ui/logotype";
import { tabs } from "../model/data/tabs.data";
import { useMobile } from "@/shared/lib/hooks";

interface LayoutProps {
  children: React.ReactNode;
  isRenderSideBar?: boolean;
  isCentered?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  isRenderSideBar = true,
  isCentered = true,
}) => {
  const isMobile = useMobile();

  return (
    <div className="min-h-screen bg-[var(--ui-background)] transition-colors duration-300">
      {isMobile && (
        <header className="sticky top-0 z-40 border-b border-[var(--ui-border)] bg-[var(--ui-background)]/95 shadow-sm backdrop-blur-md">
          <div className="mx-auto max-w-screen-lg px-3">
            <Logotype isMobile />
          </div>
        </header>
      )}

      <main
        className="min-h-screen transition-all duration-300 ease-in-out"
        style={{
          marginLeft: !isMobile && isRenderSideBar ? "280px" : "0",
          width: !isMobile && isRenderSideBar ? "calc(100% - 280px)" : "100%",
        }}
      >
        <div
          className={`text-[var(--ui-text)] ${isCentered ? "container mx-auto md:pl-20 md:pr-6 px-5" : ""} pt-4 pb-28`}
        >
          {children}
        </div>
      </main>

      {!isMobile ? (
        <>
          {isRenderSideBar && (
            <Sidebar
              defaultSelectedId={tabs[0].id}
              onSelectTab={console.log}
              tabs={tabs}
            />
          )}
        </>
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
