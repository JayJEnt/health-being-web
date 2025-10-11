import type { Role } from './enum_utils';
import type { ActivityLevel, Silhouette } from './enum_utils';


export interface UserBaseModel {
  username: string;
  email: string; // EmailStr (TODO: add some email patern validation)
  weight?: number | null;
  height?: number | null;
  age?: number | null;
  activity_level?: ActivityLevel | null;
  silhouette?: Silhouette | null;
}

export interface UserCreate extends UserBaseModel {
  password: string;
}

export interface UserUpdateAdmin extends UserCreate {
  role: Role;
}

export interface User extends UserBaseModel {
  id: number;
  role: Role;
}

export interface UserOurAuth extends User {
  hashed_password: string;
}
