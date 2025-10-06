import { settings } from '../../../config';
import { api } from '../../client';
import type { DietTypeResponse } from '../../models/diet_type';
import type {
  PreferedRecipeTypeCreate,
  PreferedRecipeTypeDelete,
  PreferedRecipeTypeResponse,
} from '../../models/prefered_diet_type';

export const preferedDietTypeApi = {
  getById: (diet_type_id: number) =>
    api.get<PreferedRecipeTypeResponse>(`${settings.PREFERED_DIET_TYPES_ENDPOINT}`, {
      diet_type_id,
    }),

  getAll: () => api.get<PreferedRecipeTypeResponse[]>(`${settings.PREFERED_DIET_TYPES_ENDPOINT}`),

  create: (data: PreferedRecipeTypeCreate) =>
    api.post<DietTypeResponse>(`${settings.PREFERED_DIET_TYPES_ENDPOINT}`, data),

  delete: (diet_type_id: number) =>
    api.delete<PreferedRecipeTypeDelete>(`${settings.PREFERED_DIET_TYPES_ENDPOINT}`, {
      diet_type_id,
    }),
};
