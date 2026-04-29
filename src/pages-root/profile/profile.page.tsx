import { IAchievement } from "@/entities/achievement";
import { IStudy } from "@/entities/study";
import { AchievementCarousel } from "@/widgets/achievement-view";
import { AboutView, ProfileView } from "@/widgets/profile-view";
import { StudyList } from "@/widgets/study-view";
import { FaCrown, FaMedal, FaRocket, FaStar, FaTrophy } from "react-icons/fa";
import { FiBookOpen, FiCode, FiUsers } from "react-icons/fi";

export const mockStudies: IStudy[] = [
  {
    _id: "1",
    userId: "user_001",
    levelPlanJSON: [],
    level: {
      experienceToNextLevel: 1000,
      positionCount: 1,
      positionName: "Junior Frontend Developer",
    },
    studyPlanJSON: [],
    study: {
      programmingLanguage: "JavaScript",
      module: 1,
      moduleTitle: "Основы JavaScript",
      level: 1,
      levelTitle: "Введение в язык",
      step: 1,
    },
    createdAt: new Date("2024-01-15T10:30:00Z"),
    updatedAt: new Date("2024-03-20T14:45:00Z"),
  },
  {
    _id: "2",
    userId: "user_002",
    levelPlanJSON: [],
    level: {
      experienceToNextLevel: 2000,
      positionCount: 2,
      positionName: "Middle Backend Developer",
    },
    studyPlanJSON: [],
    study: {
      programmingLanguage: "Python",
      module: 2,
      moduleTitle: "Backend разработка",
      level: 2,
      levelTitle: "Работа с базами данных",
      step: 3,
    },
    createdAt: new Date("2024-02-01T09:15:00Z"),
    updatedAt: new Date("2024-03-25T16:20:00Z"),
  },
  {
    _id: "3",
    userId: "user_003",
    levelPlanJSON: [],
    level: {
      experienceToNextLevel: 3000,
      positionCount: 3,
      positionName: "Senior Fullstack Developer",
    },
    studyPlanJSON: [],
    study: {
      programmingLanguage: "TypeScript",
      module: 3,
      moduleTitle: "Продвинутый TypeScript",
      level: 3,
      levelTitle: "Дженерики и утилиты",
      step: 2,
    },
    createdAt: new Date("2024-01-20T11:00:00Z"),
    updatedAt: new Date("2024-03-18T10:30:00Z"),
  },
  {
    _id: "4",
    userId: "user_004",
    levelPlanJSON: [],
    level: {
      experienceToNextLevel: 5000,
      positionCount: 4,
      positionName: "Tech Lead",
    },
    studyPlanJSON: [],
    study: {
      programmingLanguage: "Go",
      module: 4,
      moduleTitle: "Конкурентность",
      level: 4,
      levelTitle: "Горутины и каналы",
      step: 1,
    },
    createdAt: new Date("2024-01-10T08:45:00Z"),
    updatedAt: new Date("2024-03-22T13:15:00Z"),
  },
  {
    _id: "5",
    userId: "user_005",
    levelPlanJSON: [],
    level: {
      experienceToNextLevel: 1500,
      positionCount: 2,
      positionName: "React Native Developer",
    },
    studyPlanJSON: [],
    study: {
      programmingLanguage: "React",
      module: 2,
      moduleTitle: "Нативные компоненты",
      level: 1,
      levelTitle: "Основы React Native",
      step: 4,
    },
    createdAt: new Date("2024-02-10T15:20:00Z"),
    updatedAt: new Date("2024-03-28T09:45:00Z"),
  },
];

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

export const ProfilePage = () => {
  return (
    <>
      <ProfileView
        profileDetails={{
          globalRank: 42,
          totalUser: 121,
          languages: ["C++", "C#", "Objective C"],
          profile: {
            userId: "1231241234124",
            _id: "1231241234124",
            data: {
              about: "lorem ipsum dollar hui negra bla bla",
              avatar: "person",
              name: "John Doe",
            },
            stats: { experience: 179 },
            level: {
              experienceToNextLevel: 10,
              positionCount: 2,
              positionName: "Junior",
            },
          },
        }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-5">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <AboutView about="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus iure perspiciatis quasi exercitationem reprehenderit esse, alias consequuntur hic accusantium mollitia officiis quo suscipit. Cum rem optio ex molestiae distinctio dignissimos!" />
          <AchievementCarousel
            achievements={mockAchievements}
            onAllAchievementsLink={console.log}
          />
        </div>

        <div className="space-y-4 sm:space-y-6">
          <StudyList list={mockStudies} />
        </div>
      </div>
    </>
  );
};
