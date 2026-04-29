export interface IProfile {
  _id: string;
  userId: string;
  data: IProfileData;
  level: IPosition;
  stats: IStats;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProfileData {
  avatar: string;
  name: string;
  about: string;
}

export interface IPosition {
  experienceToNextLevel: number;
  positionCount: number;
  positionName: string;
}

export interface IStats {
  experience: number;
}
