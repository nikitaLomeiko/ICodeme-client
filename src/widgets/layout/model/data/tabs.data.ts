import { FaEllipsisH, FaHome, FaStore, FaTrophy, FaUser } from "react-icons/fa";
import { ITab } from "../types/tab.type";

export const tabs: ITab[] = [
  { id: "learn", icon: FaHome, label: "Обучение" },
  { id: "rating", icon: FaTrophy, label: "Рейтинг" },
  { id: "profile", icon: FaUser, label: "Профиль" },
  { id: "shop", icon: FaStore, label: "Магазин" },
  { id: "more", icon: FaEllipsisH, label: "Еще" },
];
