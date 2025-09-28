import { api } from "../../client";
import { settings } from "../../../config";
import type { UserUpdateAdmin, User } from "../../models/user";


export const usersApi = {
  getByName: (username: string) =>
    api.get<User>(`${settings.USERS_ENDPOINT}`, { username }),

  getByEmail: (email: string) =>
    api.get<User>(`${settings.USERS_ENDPOINT}`, { email }),

  getById: (user_id: number) =>
    api.get<User>(`${settings.USERS_ENDPOINT}`, { user_id }),

  getAll: () =>
    api.get<User[]>(`${settings.USERS_ENDPOINT}`),

  update: (data: UserUpdateAdmin, user_id: number) =>
    api.put<User>(`${settings.USERS_ENDPOINT}`, data, { user_id }),

  delete: (user_id: number) =>
    api.delete<User>(`${settings.USERS_ENDPOINT}`, { user_id }),
};