import { settings } from '../../../config';
import { api } from '../../client';
import type { Vitamin } from '../../models/vitamin';

export const vitaminApi = {
  getByName: (name: string) => api.get<Vitamin>(`${settings.VITAMIN_ENDPOINT}`, { name }),

  getById: (vitamin_id: number) => api.get<Vitamin>(`${settings.VITAMIN_ENDPOINT}`, { vitamin_id }),

  getAll: () => api.get<Vitamin[]>(`${settings.VITAMIN_ENDPOINT}`),
};
