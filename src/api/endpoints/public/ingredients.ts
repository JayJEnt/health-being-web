import { settings } from '../../../config';
import { api } from '../../client';
import type { Ingredient, IngredientResponse } from '../../models/ingredient';

export const ingredientsApi = {
  getByName: (name: string, signal?: AbortSignal) =>
    api.get<IngredientResponse>(`${settings.INGREDIENTS_ENDPOINT}`, { name }, { signal }),

  getById: (id: number) => api.get<IngredientResponse>(`${settings.INGREDIENTS_ENDPOINT}`, { id }),

  getAll: () => api.get<Ingredient[]>(`${settings.INGREDIENTS_ENDPOINT}`),
};
