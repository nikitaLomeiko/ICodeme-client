import { FaGithub, FaGoogle, FaTelegram } from "react-icons/fa";

export const oauthProviders = [
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
    color: "!bg-gray-900 hover:bg-gray-800",
    textColor: "text-white",
    borderColor: "border-gray-900",
    iconColor: "text-white",
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: FaTelegram,
    color: "!bg-blue-500 hover:bg-blue-600",
    textColor: "text-white",
    borderColor: "border-blue-500",
    iconColor: "text-white",
  },
];
