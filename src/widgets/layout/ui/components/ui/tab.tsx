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
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
        isActive
          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
          : "text-gray-600 hover:bg-emerald-50"
      }`}
    >
      <IconComponent className="text-xl" />
      <span className="font-medium">{label}</span>
      {isActive && (
        <motion.div
          layoutId="desktopActive"
          className="ml-auto w-2 h-2 bg-white rounded-full"
        />
      )}
    </button>
  );
};
