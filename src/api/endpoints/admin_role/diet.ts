import { settings } from '../../../config';
import { api } from '../../client';
import type { DietCreate, DietResponse } from '../../models/diet';

export const dietAdminApi = {
  create: (data: DietCreate) => api.post<DietResponse>(`${settings.DIET_ENDPOINT}`, data),

  update: (diet_id: number, data: DietCreate) =>
    api.put<DietResponse>(`${settings.DIET_ENDPOINT}`, data, { diet_id }),

  delete: (diet_id: number) => api.delete<DietResponse>(`${settings.DIET_ENDPOINT}`, { diet_id }),
};
