import { motion } from "framer-motion";
import { FaArrowUp, FaStar } from "react-icons/fa";
import { ILevel } from "../../model/types/level.type";

export const LevelBar: React.FC<ILevel> = (props) => {
  const { currentLevel, currentXP, levelName, nextLevelXP, progress } = props;

  return (
    <div className="bg-white/95 backdrop-blur-md border-t border-emerald-100/50 px-4 py-2">
      <div className="mx-auto">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-2">
            <FaStar className="text-yellow-500 text-xs" />
            <span className="text-xs font-medium text-emerald-700">
              Ур. {currentLevel} · {levelName}
            </span>
          </div>
          <span className="text-xs text-emerald-600">
            {currentXP}/{nextLevelXP} XP
          </span>
        </div>

        <div className="h-1.5 bg-emerald-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ delay: 0.3, duration: 1 }}
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-end space-x-1 mt-1"
        >
          <FaArrowUp className="text-emerald-500 text-[10px]" />
          <span className="text-[10px] text-emerald-600">
            {nextLevelXP - currentXP} XP до след. уровня
          </span>
        </motion.div>
      </div>
    </div>
  );
};
