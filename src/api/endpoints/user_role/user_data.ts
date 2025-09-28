import { api } from "../../client";
import { settings } from "../../../config";
import type { UserDataCreate, UserData } from "../../models/user_data";


export const userDataOwnerApi = {
  get: () =>
    api.get<UserData>(`${settings.USERSDATA_OWNER_ENDPOINT}`),

  create: (data: UserDataCreate) =>
    api.post<UserData>(`${settings.USERSDATA_OWNER_ENDPOINT}`, data),

  update: (data: UserDataCreate) =>
    api.put<UserData>(`${settings.USERSDATA_OWNER_ENDPOINT}`, data),

  delete: () =>
    api.delete<UserData>(`${settings.USERSDATA_OWNER_ENDPOINT}`),
};