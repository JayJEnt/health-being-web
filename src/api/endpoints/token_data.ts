import { api } from "../client";
import { settings } from "../../config";
import type { User } from "../models/user";
import type { Token } from "../models/token";


export const tokenDataApi = {
  getUser: (requesting_user: number) =>
    api.get<User>(`${settings.TOKEN_DATA_ENDPOINT}`, { requesting_user }),

  getUserRole: (requesting_user: number) =>
    api.get<boolean>(`${settings.TOKEN_DATA_ENDPOINT}`, { requesting_user, admin_role: true }),

  refreshToken: (requesting_user: number) =>
    api.post<Token>(`${settings.TOKEN_DATA_ENDPOINT}`, { requesting_user }),
};