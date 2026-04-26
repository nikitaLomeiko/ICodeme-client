"use client";

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

  const centerIndex = Math.floor(tabs.length / 2);
  const [tabSelectedId, setTabSelectedId] = useState(defaultSelectedId);

  const handleTabSetSelectedId = (id: string) => {
    setTabSelectedId(id);
    onSelectTab(id);
  };

  return (
    <div className="relative">
      <div className="bg-[var(--ui-background-secondary)] rounded-3xl flex items-center justify-between px-4 py-3 mx-2 min-w-[326px] relative">
        {tabs.map((tab, index) => {
          const isCenter = index === centerIndex;
          const isActive = tab.id === tabSelectedId;

          return (
            <div key={tab.id} className={isCenter ? "relative -mt-10" : ""}>
              <Tab
                {...tab}
                onActive={() => handleTabSetSelectedId(tab.id)}
                isCenter={isCenter}
                isActive={isActive}
              />
            </div>
          );
        })}

        <div className="absolute -top-[1px] left-1/2 transform -translate-x-1/2 w-[72px] h-6 pointer-events-none">
          <div className="absolute z-10 -left-[23px] rotate-270 -top-[5px] w-[17px] h-[17px] bg-[var(--ui-background-secondary)] rounded-br-full border-b-6 border-r-6 border-[var(--ui-background)]" />
          <div className="absolute z-10 -right-[23px] rotate-180 -top-[5px] w-[17px] h-[17px] bg-[var(--ui-background-secondary)] rounded-br-full border-b-6 border-r-6 border-[var(--ui-background)]" />
        </div>
      </div>
    </div>
  );
};
