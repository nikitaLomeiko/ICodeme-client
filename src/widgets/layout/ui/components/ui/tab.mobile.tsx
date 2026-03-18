import { motion } from "framer-motion";
import { ITab } from "../../../model/types/tab.type";

interface IProps extends Omit<ITab, "id"> {
  onActive: () => void;
  isActive: boolean;
  isLarge?: boolean;
}

export const Tab: React.FC<IProps> = (props) => {
  const { isActive, onActive, icon, label, isLarge = false } = props;

  const IconComponent = icon;

  return (
    <button
      onClick={onActive}
      className={`relative group ${isLarge ? "border-4 !rounded-full w-16 h-16" : ""}`}
    >
      <motion.div
        animate={
          isActive
            ? {
                color: "#059669",
                scale: [1, 1.1, 1],
              }
            : {
                color: "#6B7280",
              }
        }
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center px-3 py-1.5 rounded-xl group-hover:bg-emerald-50 transition-colors"
      >
        <IconComponent className={isLarge ? "text-3xl" : "text-xl"} />
        {!isLarge && (
          <span className="text-[10px] mt-1 font-medium">{label}</span>
        )}
      </motion.div>

      {isActive && (
        <motion.div
          layoutId="mobileActiveIndicator"
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emerald-600 rounded-full"
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      )}
    </button>
  );
};
