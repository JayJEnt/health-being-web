import { settings } from '../../../config';
import { api } from '../../client';
import type { DietResponse } from '../../models/diet';

export const dietApi = {
  getByName: (name: string, signal?: AbortSignal) =>
    api.get<DietResponse>(`${settings.DIET_ENDPOINT}`, { name }, { signal }),

  getById: (diet_id: number) => api.get<DietResponse>(`${settings.DIET_ENDPOINT}`, { diet_id }),

  getAll: () => api.get<DietResponse[]>(`${settings.DIET_ENDPOINT}`),
};
