import type { ActivityLevel, Role, Silhouette } from './enum_utils';

export interface UserData {
  weight?: number | null;
  height?: number | null;
  age?: number | null;
  activity_level?: ActivityLevel | null;
  silhouette?: Silhouette | null;
}

export interface UserCreate extends UserData {
  name: string;
  email: string; // EmailStr (TODO: add some email patern validation)
  password?: string | null;
}

export interface User extends UserCreate {
  id: number;
  role: Role;
}

export interface UserPatch extends UserData {
  name?: string | null;
  email?: string | null;
  password?: string | null;
}
