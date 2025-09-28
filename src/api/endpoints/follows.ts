import { api } from "../client";
import { settings } from "../../config";
import type { FollowsCreate, FollowsResponse, FollowsDelete } from "../models/follows";


export const followsApi = {
  getById: (followed_user_id: number, requesting_user: number) =>
    api.get<FollowsResponse>(`${settings.FOLLOWS_ENDPOINT}`, { followed_user_id, requesting_user }),

  getAll: (requesting_user: number) =>
    api.get<FollowsResponse[]>(`${settings.FOLLOWS_ENDPOINT}`, { requesting_user }),

  create: (data: FollowsCreate, requesting_user: number) =>
    api.post<FollowsResponse>(`${settings.FOLLOWS_ENDPOINT}`, data, { requesting_user }),

  delete: (followed_user_id: number, requesting_user: number) =>
    api.delete<FollowsDelete>(`${settings.FOLLOWS_ENDPOINT}`, { followed_user_id, requesting_user }),
};