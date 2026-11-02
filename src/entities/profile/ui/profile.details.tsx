"use client";

import { LanguageList, AvatarLevel, LevelBar, Rating } from "./components";
import { Card, Title } from "@/shared/ui/kit";
import { IProfile } from "../model";
import { FiEdit2 } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";

export interface IProps {
  profile: IProfile;
  onEdit: () => void;
  onLogout: () => void;
  totalUser: number;
  globalRank: number;
}

export const ProfileDetails: React.FC<IProps> = (props) => {
  const { profile, onEdit, onLogout, totalUser, globalRank } = props;

  return (
    <Card
      variant="default"
      padding="md"
      radius="md"
      hoverable={false}
      className="relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0">
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-3 sm:gap-5">
            <AvatarLevel
              avatar={profile.data.avatar}
              experience={profile.level.experience}
            />

            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Title
                  size="xl"
                  weight="bold"
                  className="text-[var(--ui-text)] !my-0 sm:!my-2"
                >
                  {profile.data.name}
                </Title>
                <button
                  onClick={onEdit}
                  className="p-1 rounded-lg text-[var(--ui-text-secondary)] hover:text-[var(--ui-primary)] transition-all"
                >
                  <FiEdit2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>

              <div className="hidden sm:block text-[10px]">
                <span className="text-[var(--ui-text-muted)]">ID:</span>{" "}
                {profile.userId}
              </div>

              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[var(--ui-primary)]/30 bg-[var(--ui-primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--ui-primary)] shadow-sm">
                <span aria-hidden="true">✦</span>
                <span>Звание: {profile.data.position}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="absolute top-0 right-0 sm:relative sm:top-auto sm:right-auto p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-all"
          >
            <FaSignOutAlt size={20} />
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-[var(--ui-border)] bg-[var(--ui-background)]/50 p-4">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--ui-text-muted)]">
            Направление и языки программирования
          </div>
          <LanguageList languages={profile.data.chips} />
        </div>

        <div className="flex flex-col lg:flex-row justify-between w-full border-t border-[var(--ui-border)] mt-4 sm:mt-6 pt-4 sm:pt-6 gap-4 sm:gap-6">
          <LevelBar experience={profile.level.experience} />
          <Rating totalUser={totalUser} globalRank={globalRank} />
        </div>
      </div>
    </Card>
  );
};
