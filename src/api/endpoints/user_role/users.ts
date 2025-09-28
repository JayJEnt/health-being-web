import { api } from "../../client";
import { settings } from "../../../config";
import type { UserCreate, UserCreateAll, User } from "../../models/user";


export const usersOwnerApi = {
  get: () =>
    api.get<UserCreateAll>(`${settings.USERS_OWNER_ENDPOINT}`),

  update: (data: UserCreate) =>
    api.put<User>(`${settings.USERS_OWNER_ENDPOINT}`, data),

  delete: () =>
    api.delete<User>(`${settings.USERS_OWNER_ENDPOINT}`),
};