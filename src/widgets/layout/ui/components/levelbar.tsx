import { motion } from "framer-motion";
import { FaArrowUp, FaStar } from "react-icons/fa";
import { ILevel } from "../../model/types/level.type";
import { ProgressBar } from "@/shared/ui/kit";

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

        <ProgressBar
          value={progress}
          size="sm"
          state="success"
          variant="capsule"
          duration={1000}
        />

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
