import type { ActivityLevel, Silhouette } from './enum_utils';

export interface UserDataCreate {
  weight?: number | null;
  height?: number | null;
  age?: number | null;
  activity_level?: ActivityLevel | null;
  silhouette?: Silhouette | null;
}

export interface UserData extends UserDataCreate {
  user_id: number;
}
