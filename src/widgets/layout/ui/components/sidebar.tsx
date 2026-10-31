import React, { useState } from "react";
import { motion } from "framer-motion";
import { Logotype } from "@/shared/ui/logotype";
import { Tab } from "./ui/tab";
import { ITab } from "../../model/types/tab.type";
import { Title } from "@/shared/ui/kit";
import { useRouter } from "next/navigation";
import { FaCog } from "react-icons/fa";

interface IProps {
  tabs: ITab[];
  defaultSelectedId: string;
  onSelectTab: (id: string) => void;
}

export const Sidebar: React.FC<IProps> = (props) => {
  const { tabs, defaultSelectedId, onSelectTab } = props;

  const [tabSelectedId, setTabSelectedId] = useState(defaultSelectedId);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const router = useRouter();

  const handleTabSetSelectedId = (id: string) => {
    if (id === "Other") {
      setIsMoreOpen((isOpen) => !isOpen);
      return;
    }

    setIsMoreOpen(false);
    router.push(id);
    setTabSelectedId(id);
    onSelectTab(id);
  };

  const openSettings = () => {
    setIsMoreOpen(false);
    setTabSelectedId("Other");
    router.push("/settings");
    onSelectTab("/settings");
  };

  return (
    <aside className="fixed left-4 top-4 bottom-4 w-80 z-40">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[var(--ui-background-secondary)] backdrop-blur-md shadow-xl rounded-2xl border border-[var(--ui-border)] h-full transition-colors duration-300"
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-[var(--ui-border)]">
            <Logotype />
          </div>

          <nav className="flex-1 p-3 space-y-1.5">
            {tabs.map((tab) => (
              <motion.div
                key={tab.id}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Tab
                  {...tab}
                  onActive={() => handleTabSetSelectedId(tab.id)}
                  isActive={tab.id === tabSelectedId || (tab.id === "Other" && isMoreOpen)}
                />
                {tab.id === "Other" && isMoreOpen && (
                  <div className="ml-4 mt-2 rounded-xl border border-[var(--ui-border)] bg-[var(--ui-background)] p-1 shadow-lg">
                    <button
                      type="button"
                      onClick={openSettings}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-[var(--ui-text-secondary)] transition-colors hover:bg-[var(--ui-primary)]/10 hover:text-[var(--ui-primary)]"
                    >
                      <FaCog className="text-[var(--ui-text-muted)]" />
                      <span>Настройки</span>
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </nav>

          <div className="p-4 border-t border-[var(--ui-border)] text-xs text-[var(--ui-text)]">
            <Title size="xs" as="p">
              © 2026 Your App
            </Title>
          </div>
        </div>
      </motion.div>
    </aside>
  );
};
