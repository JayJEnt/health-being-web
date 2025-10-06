import { settings } from '../../../config';
import { api } from '../../client';
import type { Vitamin } from '../../models/vitamin';

export const vitaminApi = {
  getByName: (vitamin_name: string) =>
    api.get<Vitamin>(`${settings.VITAMINS_ENDPOINT}`, { vitamin_name }),

  getById: (vitamin_id: number) =>
    api.get<Vitamin>(`${settings.VITAMINS_ENDPOINT}`, { vitamin_id }),

  getAll: () => api.get<Vitamin[]>(`${settings.VITAMINS_ENDPOINT}`),
};
