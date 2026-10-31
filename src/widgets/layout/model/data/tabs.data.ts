import {
  FaEllipsisH,
  FaHome,
  FaStore,
  FaTrophy,
  FaUser,
  FaCode,
  FaCog,
} from "react-icons/fa";
import { ITab } from "../types/tab.type";

export const tabs: ITab[] = [
  { id: "/", icon: FaHome, label: "Обучение" },
  { id: "profile", icon: FaUser, label: "Профиль" },
  { id: "/settings", icon: FaCog, label: "Настройки" },
  { id: "dev", icon: FaCode, label: "Тренажеры" },
  { id: "shop", icon: FaStore, label: "Магазин" },
  { id: "Other", icon: FaEllipsisH, label: "Еще" },
];
