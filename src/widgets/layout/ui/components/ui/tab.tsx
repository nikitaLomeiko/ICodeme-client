import { motion } from "framer-motion";
import { ITab } from "../../../model/types/tab.type";

interface IProps extends Omit<ITab, "id"> {
  onActive: () => void;
  isActive: boolean;
}

export const Tab: React.FC<IProps> = (props) => {
  const { isActive, onActive, icon, label } = props;

  const IconComponent = icon;

  return (
    <button
      onClick={onActive}
      className={`
        w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
        ${
          isActive
            ? "bg-[var(--ui-primary)] text-[var(--ui-text-inverse)] shadow-md"
            : "text-[var(--ui-text-secondary)] hover:bg-[var(--ui-primary)]/10"
        }
      `}
    >
      <IconComponent
        className={`text-xl transition-colors duration-200 ${
          isActive
            ? "text-[var(--ui-text-inverse)]"
            : "text-[var(--ui-text-muted)] group-hover:text-[var(--ui-primary)]"
        }`}
      />
      <span className="font-medium">{label}</span>
      {isActive && (
        <motion.div
          layoutId="desktopActive"
          className="ml-auto w-2 h-2 rounded-full bg-[var(--ui-text-inverse)]"
        />
      )}
    </button>
  );
};
