import { settings } from '../../../config';
import { api } from '../../client';
import type { Ingredient, IngredientResponse } from '../../models/ingredient';

export const ingredientApi = {
  getByName: (name: string, signal?: AbortSignal) =>
    api.get<IngredientResponse>(`${settings.INGREDIENT_ENDPOINT}`, { name }, { signal }),

  getById: (ingredient_id: number) =>
    api.get<IngredientResponse>(`${settings.INGREDIENT_ENDPOINT}`, { ingredient_id }),

  getAll: () => api.get<Ingredient[]>(`${settings.INGREDIENT_ENDPOINT}`),
};
