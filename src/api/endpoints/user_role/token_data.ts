import { api } from "../../client";
import { settings } from "../../../config";
import type { User } from "../../models/user";
import type { Token } from "../../models/token";


export const tokenDataApi = {
  getUser: () =>
    api.get<User>(`${settings.TOKEN_DATA_ENDPOINT}`),

  getUserRole: () =>
    api.get<boolean>(`${settings.TOKEN_DATA_ENDPOINT}`, { radmin_role: true }),

  refreshToken: () =>
    api.post<Token>(`${settings.TOKEN_DATA_ENDPOINT}`),
};