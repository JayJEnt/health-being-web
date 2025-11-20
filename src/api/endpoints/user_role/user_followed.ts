import { settings } from '../../../config';
import { api } from '../../client';
import type { FollowsCreate, FollowsDelete, FollowsResponse } from '../../models/user_followed';

export const userFollowedApi = {
  getById: (followed_user_id: number) =>
    api.get<FollowsResponse>(`${settings.USER_FOLLOWED_ENDPOINT}`, { followed_user_id }),

  getAll: () => api.get<FollowsResponse[]>(`${settings.USER_FOLLOWED_ENDPOINT}`),

  create: (data: FollowsCreate) =>
    api.post<FollowsResponse>(`${settings.USER_FOLLOWED_ENDPOINT}`, data),

  delete: (followed_user_id: number) =>
    api.delete<FollowsDelete>(`${settings.USER_FOLLOWED_ENDPOINT}`, { followed_user_id }),
};
