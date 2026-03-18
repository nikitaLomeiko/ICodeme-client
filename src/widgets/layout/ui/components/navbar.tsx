import { motion } from "framer-motion";
import { ITab } from "../../model/types/tab.type";
import { Tab } from "./ui/tab.mobile";
import { useState } from "react";

interface IProps {
  tabs: ITab[];
  defaultSelectedId: string;
  onSelectTab: (id: string) => void;
}

export const Navbar: React.FC<IProps> = (props) => {
  const { defaultSelectedId, onSelectTab, tabs } = props;

  const [tabSelectedId, setTabSelectedId] = useState(defaultSelectedId);

  const handleTabSetSelectedId = (id: string) => {
    setTabSelectedId(id);
    onSelectTab(id);
  };

  return (
    <div className="bg-white/95 backdrop-blur-md shadow-xl rounded-t-2xl border border-emerald-100/50">
      <div className="flex items-center justify-between px-3 py-2 max-w-md mx-auto">
        <div className="flex-1 flex justify-start items-center space-x-2">
          {tabs.map((tab, index) => (
            <motion.div
              key={tab.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Tab
                {...tab}
                onActive={() => handleTabSetSelectedId(tab.id)}
                isLarge={Math.floor(tabs.length / 2) === index}
                isActive={tab.id === tabSelectedId}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
