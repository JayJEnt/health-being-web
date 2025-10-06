import { settings } from '../../../config';
import { api } from '../../client';
import type { FollowsCreate, FollowsDelete, FollowsResponse } from '../../models/follows';

export const followsApi = {
  getById: (followed_user_id: number) =>
    api.get<FollowsResponse>(`${settings.FOLLOWS_ENDPOINT}`, { followed_user_id }),

  getAll: () => api.get<FollowsResponse[]>(`${settings.FOLLOWS_ENDPOINT}`),

  create: (data: FollowsCreate) => api.post<FollowsResponse>(`${settings.FOLLOWS_ENDPOINT}`, data),

  delete: (followed_user_id: number) =>
    api.delete<FollowsDelete>(`${settings.FOLLOWS_ENDPOINT}`, { followed_user_id }),
};
