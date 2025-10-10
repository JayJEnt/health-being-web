import { api } from "../../client";
import { settings } from "../../../config";
import type { UserUpdateAdmin, User } from "../../models/user";

let usersCache: User[] | null = null;
let usersCachePromise: Promise<User[]> | null = null;

export const usersApi = {
  getByName: (username: string) =>
    api.get<User>(`${settings.USERS_ENDPOINT}`, { username }),

  getByEmail: (email: string) =>
    api.get<User>(`${settings.USERS_ENDPOINT}`, { email }),

  getById: (user_id: number) =>
    api.get<User>(`${settings.USERS_ENDPOINT}`, { user_id }),

  getAll: () => {
    if (usersCache) {
      return Promise.resolve(usersCache);
    }
    if (usersCachePromise) {
      return usersCachePromise;
    }
    usersCachePromise = api
      .get<User[]>(`${settings.USERS_ENDPOINT}`)
      .then((data) => {
        usersCache = data;
        usersCachePromise = null;
        return data;
      });
    return usersCachePromise;
  },

  update: (data: UserUpdateAdmin, user_id: number) => {
    usersCache = null;
    return api.put<User>(`${settings.USERS_ENDPOINT}`, data, { user_id });
  },

  delete: (user_id: number) => {
    usersCache = null;
    return api.delete<User>(`${settings.USERS_ENDPOINT}`, { user_id });
  },
};
