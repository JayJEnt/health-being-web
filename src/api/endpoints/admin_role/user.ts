import { settings } from '../../../config';
import { api } from '../../client';
import type { User, UserUpdateAdmin } from '../../models/user';

export const userAdminApi = {
  getByName: (name: string) => api.get<User>(`${settings.USER_ENDPOINT}`, { name }),

  getByEmail: (email: string) => api.get<User>(`${settings.USER_ENDPOINT}`, { email }),

  getById: (user_id: number) => api.get<User>(`${settings.USER_ENDPOINT}`, { user_id }),

  getAll: () => api.get<User[]>(`${settings.USER_ENDPOINT}`),

  update: (data: UserUpdateAdmin, user_id: number) =>
    api.put<User>(`${settings.USER_ENDPOINT}`, data, { user_id }),

  delete: (user_id: number) => api.delete<User>(`${settings.USER_ENDPOINT}`, { user_id }),
};
