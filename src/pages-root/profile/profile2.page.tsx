"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FaSave,
  FaTrophy,
  FaMedal,
  FaCrown,
  FaStar,
  FaRocket,
  FaSignOutAlt,
  FaPlus,
} from "react-icons/fa";
import {
  FiEdit2,
  FiTrendingUp,
  FiCode,
  FiBookOpen,
  FiBriefcase,
  FiGlobe,
  FiLock,
  FiUsers,
} from "react-icons/fi";
import { Button, Title, Avatar, ProgressBar } from "@/shared/ui/kit";
import { Carousel, CarouselApi } from "@/shared/ui/kit/carousel";
import { InputWithSuggestions } from "@/shared/ui/kit";
import { Modal, ModalBody } from "@/shared/ui/kit/modal";

/* Types */
export interface IProfile {
  _id: string;
  userId: string;
  data: IProfileData;
  level: IPosition[];
  levelPlanJSON: IPosition[];
  studyPlanJSON: IModule[];
  study: IStudy[];
  stats: IStats;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProfileData {
  avatar: string;
  status: string;
  about: string;
}

export interface IPosition {
  experienceToNextLevel: number;
  positionCount: number;
  positionName: string;
  programmingLanguage?: string;
}

export interface IStudy {
  programmingLanguage: string;
  module: number;
  level: number;
  step: number;
  position: IPosition;
}

export interface IStats {
  experience: number;
}

export interface IModule {
  title: string;
  description?: string;
  levels: {
    title: string;
    description?: string;
    steps: { title?: string }[];
  }[];
}

interface IAchievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  isLocked?: boolean;
  progress?: number;
  rarity?: "common" | "rare" | "epic" | "legendary";
}

interface IRanking {
  globalRank: number;
  totalUsers: number;
  nextRankProgress: number;
  nextRankXPNeeded: number;
}

const programmingLanguages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C#",
  "C++",
  "Go",
  "Rust",
  "Ruby",
  "PHP",
  "Swift",
  "Kotlin",
  "Dart",
  "Scala",
  "Perl",
  "Haskell",
  "Lua",
  "R",
  "MATLAB",
  "SQL",
];

const illustratedAvatars = [
  { emoji: "👤", label: "person", color: "#667eea" },
  { emoji: "👨", label: "man", color: "#f093fb" },
  { emoji: "👩", label: "woman", color: "#4facfe" },
  { emoji: "🧑", label: "person-neutral", color: "#43e97b" },
  { emoji: "🐶", label: "dog", color: "#fa709a" },
  { emoji: "🐱", label: "cat", color: "#30cfd0" },
  { emoji: "🦊", label: "fox", color: "#a8edea" },
  { emoji: "🦁", label: "lion", color: "#ff9a9e" },
  { emoji: "🐯", label: "tiger", color: "#f6d365" },
  { emoji: "🐼", label: "panda", color: "#84fab0" },
  { emoji: "🐨", label: "koala", color: "#667eea" },
  { emoji: "🐸", label: "frog", color: "#e0c3fc" },
];

const mockProfile: IProfile = {
  _id: "profile_01",
  userId: "john_developer",
  data: {
    avatar: "man",
    status: "Активен",
    about:
      "Frontend developer with a passion for clean UI, performance and accessibility. Loves mentoring and coffee.",
  },
  level: [
    {
      experienceToNextLevel: 800,
      positionCount: 2,
      positionName: "Middle Frontend",
      programmingLanguage: "TypeScript",
    },
    {
      experienceToNextLevel: 600,
      positionCount: 1,
      positionName: "Junior Python",
      programmingLanguage: "Python",
    },
    {
      experienceToNextLevel: 400,
      positionCount: 1,
      positionName: "Junior Go",
      programmingLanguage: "Go",
    },
  ],
  levelPlanJSON: [
    { experienceToNextLevel: 0, positionCount: 1, positionName: "Junior" },
    { experienceToNextLevel: 800, positionCount: 2, positionName: "Middle" },
    { experienceToNextLevel: 1200, positionCount: 3, positionName: "Senior" },
    { experienceToNextLevel: 2400, positionCount: 4, positionName: "Lead" },
  ],
  studyPlanJSON: [
    {
      title: "Basics",
      description: "Core JS and HTML/CSS",
      levels: [
        { title: "Intro", steps: [{}, {}, {}] },
        { title: "DOM & Events", steps: [{}, {}] },
      ],
    },
    {
      title: "React",
      description: "From components to performance",
      levels: [
        { title: "Components", steps: [{}, {}, {}, {}] },
        { title: "State & Hooks", steps: [{}, {}, {}] },
        { title: "Performance", steps: [{}, {}] },
      ],
    },
    {
      title: "Advanced",
      description: "Testing, CI, architecture",
      levels: [
        { title: "Testing", steps: [{}, {}] },
        { title: "Architecture", steps: [{}, {}, {}] },
      ],
    },
  ],
  study: [
    {
      programmingLanguage: "TypeScript",
      module: 2,
      level: 2,
      step: 1,
      position: {
        experienceToNextLevel: 800,
        positionCount: 2,
        positionName: "Middle Frontend",
        programmingLanguage: "TypeScript",
      },
    },
    {
      programmingLanguage: "Python",
      module: 1,
      level: 1,
      step: 3,
      position: {
        experienceToNextLevel: 600,
        positionCount: 1,
        positionName: "Junior Python",
        programmingLanguage: "Python",
      },
    },
    {
      programmingLanguage: "Go",
      module: 1,
      level: 1,
      step: 1,
      position: {
        experienceToNextLevel: 400,
        positionCount: 1,
        positionName: "Junior Go",
        programmingLanguage: "Go",
      },
    },
  ],
  stats: {
    experience: 3200,
  },
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365),
  updatedAt: new Date(),
};

const mockAchievements: IAchievement[] = [
  {
    id: "1",
    title: "Новичок",
    description: "Завершить первый модуль",
    icon: <FaStar />,
    iconColor: "#10b981",
    isLocked: false,
    rarity: "common",
  },
  {
    id: "2",
    title: "Мастер кода",
    description: "Написать 1000 строк кода",
    icon: <FiCode />,
    iconColor: "#3b82f6",
    isLocked: false,
    rarity: "rare",
  },
  {
    id: "3",
    title: "Реакт гуру",
    description: "Завершить React модуль",
    icon: <FaRocket />,
    iconColor: "#8b5cf6",
    isLocked: false,
    rarity: "epic",
  },
  {
    id: "4",
    title: "Топ 100",
    description: "Войти в топ 100 рейтинга",
    icon: <FaTrophy />,
    iconColor: "#f59e0b",
    isLocked: false,
    rarity: "legendary",
  },
  {
    id: "5",
    title: "Элитный разработчик",
    description: "Достичь уровня Lead",
    icon: <FaCrown />,
    iconColor: "#fbbf24",
    isLocked: true,
    progress: 75,
    rarity: "legendary",
  },
  {
    id: "6",
    title: "Победитель челленджа",
    description: "Выиграть недельный челлендж",
    icon: <FaMedal />,
    iconColor: "#ef4444",
    isLocked: true,
    progress: 40,
    rarity: "epic",
  },
  {
    id: "7",
    title: "Быстрый старт",
    description: "Завершить первый урок за 10 минут",
    icon: <FaRocket />,
    iconColor: "#06b6d4",
    isLocked: false,
    rarity: "common",
  },
  {
    id: "8",
    title: "Перфекционист",
    description: "Набрать 100% в тесте",
    icon: <FaStar />,
    iconColor: "#f97316",
    isLocked: false,
    rarity: "rare",
  },
  {
    id: "9",
    title: "Командный игрок",
    description: "Завершить командный проект",
    icon: <FiUsers />,
    iconColor: "#ec4899",
    isLocked: true,
    progress: 20,
    rarity: "epic",
  },
  {
    id: "10",
    title: "Гуру документации",
    description: "Прочитать всю документацию",
    icon: <FiBookOpen />,
    iconColor: "#14b8a6",
    isLocked: true,
    progress: 60,
    rarity: "rare",
  },
];

const mockRanking: IRanking = {
  globalRank: 42,
  totalUsers: 1250,
  nextRankProgress: 68,
  nextRankXPNeeded: 450,
};

const AvatarSelector: React.FC<{
  value: string;
  onChange: (label: string) => void;
}> = ({ value, onChange }) => (
  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
    {illustratedAvatars.map((a) => (
      <button
        key={a.label}
        type="button"
        onClick={() => onChange(a.label)}
        className={`flex flex-col items-center justify-center gap-2 p-2 rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none ${
          value === a.label
            ? "ring-2 ring-[var(--ui-primary)] shadow-md"
            : "hover:bg-[var(--ui-background-secondary)]"
        }`}
      >
        <Avatar
          initials={a.emoji}
          bgColor={a.color}
          size="lg"
          showDefaultIcon={false}
        />
        <div className="text-xs text-[var(--ui-text-secondary)] text-center hidden sm:block">
          {a.label}
        </div>
      </button>
    ))}
  </div>
);

const Card: React.FC<{
  children: React.ReactNode;
  title?: string;
  actionButton?: React.ReactNode;
}> = ({ children, title, actionButton }) => (
  <div className="bg-gradient-to-br from-[var(--ui-background)] to-[var(--ui-background-secondary)] border border-[var(--ui-border)] rounded-xl p-4 sm:p-5 transition-all duration-300 hover:shadow-lg">
    {title && (
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-[var(--ui-primary)] to-[var(--ui-primary-hover)] rounded-full" />
          <Title
            size="lg"
            weight="semibold"
            className="text-[var(--ui-text)] text-lg sm:text-xl"
          >
            {title}
          </Title>
        </div>
        {actionButton}
      </div>
    )}
    {children}
  </div>
);

const AchievementCard: React.FC<{ achievement: IAchievement }> = ({
  achievement,
}) => {
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

const StudyLanguageCard: React.FC<{
  study: IStudy;
  moduleData: IModule;
  levelData: any;
  onContinue: () => void;
}> = ({ study, moduleData, levelData, onContinue }) => {
  return (
    <div className="group relative overflow-hidden bg-gradient-to-r from-[var(--ui-background)] to-[var(--ui-background-secondary)] border border-[var(--ui-border)] rounded-xl transition-all duration-300 hover:shadow-lg">
      <div className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-start gap-3">
          <div className="p-2 bg-[var(--ui-primary)]/10 rounded-lg flex-shrink-0 self-start">
            <FiCode className="text-[var(--ui-primary)] text-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-bold text-[var(--ui-text)] mb-1">
              {study.programmingLanguage}
            </div>
            <div className="text-xs text-[var(--ui-text-secondary)]">
              Модуль {study.module}: {moduleData?.title ?? "—"}
            </div>
            <div className="text-xs text-[var(--ui-text-secondary)]">
              Уровень {study.level}: {levelData?.title ?? "—"}
            </div>
            <div className="mt-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-[var(--ui-primary)]/10 rounded-md text-xs font-medium text-[var(--ui-primary)]">
                <FiBriefcase size={12} />
                {study.position.positionName}
              </span>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={onContinue}
              className="w-full"
            >
              <FaRocket size={14} /> Перейти
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Language Step Component for adding new language
const LanguageStep: React.FC<{
  value: string;
  onChange: (value: string) => void;
  error?: string;
}> = ({ value, onChange, error }) => {
  return (
    <InputWithSuggestions
      id="language"
      name="language"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onSelectSuggestion={(value) => onChange(value)}
      suggestions={programmingLanguages}
      placeholder="Выберите язык программирования"
      error={error}
      variant="underline"
      size="lg"
      fullWidth
      inputMode="static"
      maxSuggestions={8}
    />
  );
};

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<IProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isAddingLanguage, setIsAddingLanguage] = useState(false);
  const [newLanguage, setNewLanguage] = useState("");
  const [languageError, setLanguageError] = useState("");
  const [achievements] = useState<IAchievement[]>(mockAchievements);
  const [ranking] = useState<IRanking>(mockRanking);
  const carouselRef = useRef<CarouselApi>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        setCurrentSlide(carouselRef.current.selectedIndex);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const avatarMeta =
    illustratedAvatars.find((a) => a.label === profile.data.avatar) ??
    illustratedAvatars[0];

  // Calculate user level based on total experience
  const userLevel = Math.floor(profile.stats.experience / 100) + 1;
  const expForNextLevel = 100;
  const currentLevelExp = profile.stats.experience % 100;
  const levelProgress = (currentLevelExp / expForNextLevel) * 100;

  const handleSave = (
    updated: Partial<IProfile["data"]>,
    newUserId?: string,
  ) => {
    setProfile({
      ...profile,
      userId: newUserId || profile.userId,
      data: { ...profile.data, ...updated },
      updatedAt: new Date(),
    });
    setIsEditing(false);
  };

  const handleContinue = (language: string) => {
    console.log(`Continue learning ${language}`);
    // Navigate to the learning page for this language
  };

  const handleLogout = () => {
    console.log("Logout");
    // Handle logout logic here
  };

  const handleAddLanguage = () => {
    setNewLanguage("");
    setLanguageError("");
    setIsAddingLanguage(true);
  };

  const handleConfirmAddLanguage = () => {
    if (!newLanguage.trim()) {
      setLanguageError("Выберите язык программирования");
      return;
    }

    // Check if language already exists
    if (profile.study.some((s) => s.programmingLanguage === newLanguage)) {
      setLanguageError("Этот язык уже добавлен");
      return;
    }

    // Create new study object with default values
    const newStudy: IStudy = {
      programmingLanguage: newLanguage,
      module: 1,
      level: 1,
      step: 1,
      position: {
        experienceToNextLevel: 400,
        positionCount: 1,
        positionName: `Junior ${newLanguage}`,
        programmingLanguage: newLanguage,
      },
    };

    setProfile({
      ...profile,
      study: [...profile.study, newStudy],
      updatedAt: new Date(),
    });

    setIsAddingLanguage(false);
    setNewLanguage("");
  };

  return (
    <div className="text-[var(--ui-text)] space-y-4 p-3 sm:p-0">
      {/* Profile Card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[var(--ui-background-secondary)] to-[var(--ui-background)] border border-[var(--ui-border)] rounded-xl p-4 sm:p-6">
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-[var(--ui-primary)] opacity-5 rounded-full blur-3xl" />
        <div className="relative z-10">
          {/* Mobile Avatar - Centered Circular */}
          <div className="block sm:hidden mb-4">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-primary-hover)] rounded-full blur-md opacity-50" />
                <div className="relative">
                  <Avatar
                    initials={avatarMeta.emoji}
                    bgColor={avatarMeta.color}
                    size="2xl"
                    showDefaultIcon={false}
                  />
                  {/* Level circle badge on mobile */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--ui-primary)] to-[var(--ui-primary-hover)] border-2 border-[var(--ui-background)] flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xs">
                      {userLevel}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Title
                  size="xl"
                  weight="bold"
                  className="text-[var(--ui-text)] text-center"
                >
                  {profile.userId}
                </Title>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 rounded-lg text-[var(--ui-text-secondary)] hover:text-[var(--ui-primary)] transition-all"
                >
                  <FiEdit2 size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {profile.study.map((lang, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-[var(--ui-primary)]/10 rounded-lg text-xs font-medium text-[var(--ui-primary)]"
                  >
                    {lang.programmingLanguage}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-primary-hover)] rounded-full blur-md opacity-50" />
                <div className="relative">
                  <Avatar
                    initials={avatarMeta.emoji}
                    bgColor={avatarMeta.color}
                    size="2xl"
                    showDefaultIcon={false}
                  />
                  {/* Level circle badge */}
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-[var(--ui-primary)] to-[var(--ui-primary-hover)] border-2 border-[var(--ui-background)] flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">
                      {userLevel}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Title
                    size="2xl"
                    weight="bold"
                    className="text-[var(--ui-text)] !my-2"
                  >
                    {profile.userId}
                  </Title>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 rounded-lg text-[var(--ui-text-secondary)] hover:text-[var(--ui-primary)] transition-all"
                  >
                    <FiEdit2 size={18} />
                  </button>
                </div>
                <div className="text-[10px]">
                  <span className="text-[var(--ui-text-muted)]">ID:</span>{" "}
                  {profile._id}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.study.map((lang, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-[var(--ui-primary)]/10 rounded-lg text-sm font-medium text-[var(--ui-primary)]"
                    >
                      {lang.programmingLanguage}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Logout Button - Top Right Corner */}
          <button
            onClick={handleLogout}
            className="absolute top-0 right-0 p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-all"
          >
            <FaSignOutAlt size={20} />
          </button>

          {/* Progress and Ranking Section */}
          <div className="flex flex-col lg:flex-row justify-between w-full border-t border-[var(--ui-border)] mt-4 sm:mt-6 pt-4 sm:pt-6 gap-4 sm:gap-6">
            <div className="w-full">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <FiTrendingUp className="text-[var(--ui-primary)] text-sm sm:text-base" />
                <span className="text-xs sm:text-sm font-semibold text-[var(--ui-text)]">
                  Прогресс до следующего уровня
                </span>
              </div>
              <ProgressBar
                size="md"
                value={levelProgress}
                labelPosition="inside-left"
                showValue={true}
                className="[&>div>div]:bg-gradient-to-r [&>div>div]:from-[var(--ui-primary)] [&>div>div]:to-[var(--ui-primary-hover)]"
              />
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-2 sm:mt-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[var(--ui-primary)] rounded-full" />
                  <div className="text-xs text-[var(--ui-text-secondary)]">
                    Всего опыта:{" "}
                    <span className="font-semibold text-[var(--ui-text)]">
                      {profile.stats.experience} XP
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[var(--ui-primary-hover)] rounded-full" />
                  <div className="text-xs text-[var(--ui-text-secondary)]">
                    До следующего уровня:{" "}
                    <span className="font-semibold text-[var(--ui-primary)]">
                      {expForNextLevel - currentLevelExp} XP
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden p-3 sm:p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20 min-w-[180px] sm:min-w-[200px]">
              <div className="absolute top-0 right-0 text-3xl sm:text-4xl opacity-10">
                <FaTrophy />
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FiGlobe className="text-yellow-500 text-sm sm:text-base" />
                  <span className="text-xs text-[var(--ui-text-secondary)]">
                    Мировой рейтинг
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-yellow-500">
                  #{ranking.globalRank}
                </div>
              </div>
              <div className="text-xs text-[var(--ui-text-secondary)]">
                из {ranking.totalUsers.toLocaleString()} пользователей
              </div>
              <div className="mt-2 text-xs text-yellow-500/80">
                Лучше чем{" "}
                {Math.round(
                  ((ranking.totalUsers - ranking.globalRank) /
                    ranking.totalUsers) *
                    100,
                )}
                % пользователей
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <Card
            title="О себе"
            actionButton={
              <button
                onClick={() => setIsEditingAbout(true)}
                className="p-1 rounded-lg text-[var(--ui-text-secondary)] hover:text-[var(--ui-primary)] transition-all"
              >
                <FiEdit2 size={16} />
              </button>
            }
          >
            <p className="text-sm sm:text-base text-[var(--ui-text)] leading-relaxed">
              {profile.data.about}
            </p>
          </Card>

          <Card title="Достижения">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                <button
                  onClick={() => carouselRef.current?.scrollPrev()}
                  className="bg-[var(--ui-background-secondary)] text-[var(--ui-text)] hover:bg-[var(--ui-primary)] hover:text-white w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all text-sm"
                >
                  ←
                </button>
                <button
                  onClick={() => carouselRef.current?.scrollNext()}
                  className="bg-[var(--ui-background-secondary)] text-[var(--ui-text)] hover:bg-[var(--ui-primary)] hover:text-white w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all text-sm"
                >
                  →
                </button>
              </div>
              <Button variant="primary" size="sm">
                Все достижения
              </Button>
            </div>

            <Carousel
              ref={carouselRef}
              options={{
                slidesToShow: 4,
                slidesToScroll: 4,
                gap: 4,
                speed: 0.4,
              }}
            >
              {achievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                />
              ))}
            </Carousel>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-4 sm:space-y-6">
          <Card
            title="Прогресс обучения"
            actionButton={
              <button
                onClick={handleAddLanguage}
                className="p-1 rounded-lg text-[var(--ui-primary)] hover:bg-[var(--ui-primary)]/10 transition-all"
              >
                <FaPlus size={18} />
              </button>
            }
          >
            <div className="space-y-3">
              {profile.study.map((study, idx) => {
                const moduleData = profile.studyPlanJSON[study.module - 1];
                const levelData = moduleData?.levels[study.level - 1];
                return (
                  <StudyLanguageCard
                    key={idx}
                    study={study}
                    moduleData={moduleData}
                    levelData={levelData}
                    onContinue={() => handleContinue(study.programmingLanguage)}
                  />
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Edit Profile Modal - using Modal component */}
      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="Редактировать профиль"
        variant="blur"
        size="md"
        closeOnOverlayClick={true}
        closeOnEsc={true}
        showCloseButton={true}
        withAnimation={true}
      >
        <ModalBody>
          <EditForm
            initial={profile}
            onCancel={() => setIsEditing(false)}
            onSave={handleSave}
          />
        </ModalBody>
      </Modal>

      {/* Edit About Modal - using Modal component with blur effect */}
      <Modal
        isOpen={isEditingAbout}
        onClose={() => setIsEditingAbout(false)}
        title="Редактировать 'О себе'"
        variant="blur"
        size="full"
        closeOnOverlayClick={true}
        closeOnEsc={true}
        showCloseButton={true}
        withAnimation={true}
      >
        <ModalBody>
          <div className="space-y-5">
            <div>
              <Title size="sm" weight="semibold" className="mb-3">
                О себе
              </Title>
              <textarea
                value={profile.data.about}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    data: { ...profile.data, about: e.target.value },
                  })
                }
                maxLength={500}
                rows={6}
                placeholder="Расскажите о себе..."
                className="w-92 px-3 py-2.5 rounded-lg border border-[var(--ui-border)] bg-[var(--ui-background)] text-[var(--ui-text)] text-sm font-inherit resize-y focus:outline-none focus:ring-2 focus:ring-[var(--ui-primary)] transition-all"
              />
              <div className="text-xs text-[var(--ui-text-secondary)] mt-2 text-right">
                {profile.data.about.length}/500
              </div>
            </div>
            <div className="flex gap-3 justify-end pt-3">
              <Button variant="ghost" onClick={() => setIsEditingAbout(false)}>
                Отмена
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setIsEditingAbout(false);
                  setProfile({
                    ...profile,
                    updatedAt: new Date(),
                  });
                }}
              >
                <FaSave size={16} /> Сохранить
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* Add Language Modal - using Modal component with transparent variant */}
      <Modal
        isOpen={isAddingLanguage}
        onClose={() => setIsAddingLanguage(false)}
        title="Добавить язык программирования"
        variant="blur"
        size="sm"
        closeOnOverlayClick={true}
        closeOnEsc={true}
        showCloseButton={true}
        withAnimation={true}
      >
        <ModalBody>
          <div className="space-y-5">
            <div>
              <Title size="sm" weight="semibold" className="mb-3">
                Язык программирования
              </Title>
              <LanguageStep
                value={newLanguage}
                onChange={setNewLanguage}
                error={languageError}
              />
            </div>
            <div className="flex gap-3 justify-end pt-3">
              <Button
                variant="ghost"
                onClick={() => setIsAddingLanguage(false)}
              >
                Отмена
              </Button>
              <Button variant="primary" onClick={handleConfirmAddLanguage}>
                <FaPlus size={14} /> Добавить
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

const EditForm: React.FC<{
  initial: IProfile;
  onCancel: () => void;
  onSave: (data: Partial<IProfile["data"]>, newUserId?: string) => void;
}> = ({ initial, onCancel, onSave }) => {
  const [avatar, setAvatar] = useState(initial.data.avatar);
  const [status, setStatus] = useState(initial.data.status);
  const [about, setAbout] = useState(initial.data.about);
  const [userId, setUserId] = useState(initial.userId);

  return (
    <div className="space-y-5">
      <div>
        <Title size="sm" weight="semibold" className="mb-3">
          Имя пользователя
        </Title>
        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          maxLength={50}
          placeholder="Ваше имя пользователя"
          className="w-full px-3 py-2.5 rounded-lg border border-[var(--ui-border)] bg-[var(--ui-background)] text-[var(--ui-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ui-primary)] transition-all"
        />
      </div>
      <div>
        <Title size="sm" weight="semibold" className="mb-3">
          Аватар
        </Title>
        <AvatarSelector value={avatar} onChange={setAvatar} />
      </div>
      <div className="flex gap-3 justify-end pt-3">
        <Button variant="ghost" onClick={onCancel}>
          Отмена
        </Button>
        <Button
          variant="primary"
          onClick={() => onSave({ avatar, status, about }, userId)}
        >
          <FaSave size={16} /> Сохранить
        </Button>
      </div>
    </div>
  );
};
