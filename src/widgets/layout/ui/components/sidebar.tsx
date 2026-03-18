import React, { useState } from "react";
import { motion } from "framer-motion";
import { Logotype } from "@/shared/ui/logotype";
import { Tab } from "./ui/tab";
import { ITab } from "../../model/types/tab.type";

interface IProps {
  tabs: ITab[];
  defaultSelectedId: string;
  onSelectTab: (id: string) => void;
}

export const Sidebar: React.FC<IProps> = (props) => {
  const { tabs, defaultSelectedId, onSelectTab } = props;

  const [tabSelectedId, setTabSelectedId] = useState(defaultSelectedId);

  const handleTabSetSelectedId = (id: string) => {
    setTabSelectedId(id);
    onSelectTab(id);
  };

  return (
    <aside className="fixed left-4 top-4 bottom-4 w-64 z-40">
      <div className="bg-white/95 backdrop-blur-md shadow-xl rounded-2xl border border-emerald-100/50 h-full">
        <div className="flex flex-col h-full">
          <Logotype />

          <nav className="space-y-2 flex-1">
            {tabs.map((tab) => (
              <motion.div
                key={tab.id}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Tab
                  {...tab}
                  onActive={() => handleTabSetSelectedId(tab.id)}
                  isActive={tab.id === tabSelectedId}
                />
              </motion.div>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};
