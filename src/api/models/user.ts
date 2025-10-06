import type { Role } from './enum_utils';
import type { UserDataCreate } from './user_data';

/** User Create models */
export interface UserBaseModel {
  username: string;
  email: string; // EmailStr → string
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

/** User with UserData models */
export interface UserCreateAll extends User, UserDataCreate {}
