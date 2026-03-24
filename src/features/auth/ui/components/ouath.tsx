import { motion } from "framer-motion";
import { FaGithub, FaGoogle, FaTelegram } from "react-icons/fa";

export const OAuth = () => {
  const oauthProviders = [
    {
      id: "google",
      name: "Google",
      icon: FaGoogle,
      color: "bg-white hover:bg-gray-50",
      textColor: "text-gray-700",
      borderColor: "border-gray-300",
      iconColor: "text-red-500",
    },
    {
      id: "github",
      name: "GitHub",
      icon: FaGithub,
      color: "bg-gray-900 hover:bg-gray-800",
      textColor: "text-white",
      borderColor: "border-gray-900",
      iconColor: "text-white",
    },
    {
      id: "telegram",
      name: "Telegram",
      icon: FaTelegram,
      color: "bg-blue-500 hover:bg-blue-600",
      textColor: "text-white",
      borderColor: "border-blue-500",
      iconColor: "text-white",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-1 mb-3 mt-3">
      {oauthProviders.map((provider) => {
        const Icon = provider.icon;
        return (
          <motion.button
            key={provider.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => null}
            disabled={false}
            className={`${provider.color} ${provider.textColor} border ${provider.borderColor} py-1.5 rounded-lg flex items-center justify-center transition-all shadow-xs hover:shadow disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Icon className={`text-sm ${provider.iconColor}`} />
          </motion.button>
        );
      })}
    </div>
  );
};
