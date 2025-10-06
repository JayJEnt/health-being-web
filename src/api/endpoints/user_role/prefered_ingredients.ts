import { settings } from '../../../config';
import { api } from '../../client';
import type {
  PreferedIngredientsCreate,
  PreferedIngredientsCreateResponse,
  PreferedIngredientsDelete,
  PreferedIngredientsResponse,
} from '../../models/prefered_ingredients';

export const preferedIngredientsApi = {
  getById: (ingredient_id: number) =>
    api.get<PreferedIngredientsResponse>(`${settings.PREFERED_INGREDIENTS_ENDPOINT}`, {
      ingredient_id,
    }),

  getAll: () => api.get<PreferedIngredientsResponse[]>(`${settings.PREFERED_INGREDIENTS_ENDPOINT}`),

  create: (data: PreferedIngredientsCreate) =>
    api.post<PreferedIngredientsCreateResponse>(`${settings.PREFERED_INGREDIENTS_ENDPOINT}`, data),

  delete: (ingredient_id: number) =>
    api.delete<PreferedIngredientsDelete>(`${settings.PREFERED_INGREDIENTS_ENDPOINT}`, {
      ingredient_id,
    }),
};
