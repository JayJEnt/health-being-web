import type { ActivityLevel, Role, Silhouette } from './enum_utils';

/** User Create models */
export interface UserBaseModel {
  username: string;
  email: string; // EmailStr → string
  weight?: number;
  hieght?: number;
  age?: number;
  activity_level?: ActivityLevel;
  silhouette?: Silhouette;
}

export interface UserCreate extends UserBaseModel {
  password: string;
}

export interface UserUpdateAdmin extends UserCreate {
  role: Role;
}

/** User models */
export interface User extends UserBaseModel {
  id: number;
  role: Role;
}

export interface UserOurAuth extends User {
  hashed_password: string;
}
