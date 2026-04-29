import { FiLock } from "react-icons/fi";
import { IAchievement } from "../model";

interface IProps {
  achievement: IAchievement;
}

export const AchievementCard: React.FC<IProps> = ({ achievement }) => {
  const getRarityColor = (rarity?: string, isLocked?: boolean) => {
    if (isLocked) return "from-gray-600 to-gray-700 border-gray-600 opacity-25";
    switch (rarity) {
      case "legendary":
        return "from-yellow-600 to-orange-600 border-yellow-500";
      case "epic":
        return "from-purple-600 to-pink-600 border-purple-500";
      case "rare":
        return "from-blue-600 to-cyan-600 border-blue-500";
      default:
        return "from-green-600 to-emerald-600 border-green-500";
    }
  };

  return (
    <div
      className={`relative bg-gradient-to-br ${getRarityColor(achievement.rarity, achievement.isLocked)} h-56 rounded-xl p-3 sm:p-5 border shadow-lg transition-all duration-200 hover:shadow-xl mx-1 sm:mx-2`}
    >
      {achievement.isLocked && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
          <FiLock className="text-gray-400 text-xs sm:text-sm" />
        </div>
      )}
      <div className="flex flex-col items-center text-center gap-2 sm:gap-3">
        <div
          className="w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-3xl sm:text-5xl bg-white/10 backdrop-blur-sm shadow-md flex-shrink-0"
          style={{ color: achievement.iconColor }}
        >
          {achievement.icon}
        </div>
        <div className="w-full">
          <div className="font-bold text-white text-xs sm:text-base leading-tight">
            {achievement.title}
          </div>
          <div className="text-[10px] sm:text-xs text-white/70 mt-1 leading-relaxed hidden sm:block">
            {achievement.description}
          </div>
        </div>
      </div>
    </div>
  );
};
