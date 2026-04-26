import { FaGithub, FaGoogle, FaTelegram } from "react-icons/fa";
import { IOAtuh } from "../types/oauth.types";
import { BASE_URL } from "@/shared/api";

export const oauthProviders: IOAtuh[] = [
  {
    id: "google",
    icon: FaGoogle,
    textColor: "!text-red-500",
    url: `${BASE_URL}oauth/google`,
  },
  {
    id: "github",
    icon: FaGithub,
    textColor: "!text-gray-700",
    url: `${BASE_URL}oauth/github`,
  },
  {
    id: "telegram",
    icon: FaTelegram,
    textColor: "!text-blue-500",
    url: "https://oauth.telegram.org/auth?bot_id=8694368343&origin=http://127.0.0.1:5173&return_to=http://127.0.0.1:5173/oauth/telegram",
  },
];
