export interface IAchievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  isLocked?: boolean;
  progress?: number;
  rarity?: "common" | "rare" | "epic" | "legendary";
}
