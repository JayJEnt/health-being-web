import { settings } from '../../../config';
import { api } from '../../client';
import type { Ingredient, IngredientResponse } from '../../models/ingredient';

export const ingredientsApi = {
  getByName: (ingredient_name: string, signal?: AbortSignal) =>
    api.get<IngredientResponse>(`${settings.INGREDIENT_ENDPOINT}`, { ingredient_name }, { signal }),

  getBySearchPhrase: (search_phrase: string) =>
    api.get<IngredientResponse[]>(`${settings.INGREDIENT_ENDPOINT}`, { search_phrase }),

  getById: (id: number) => api.get<IngredientResponse>(`${settings.INGREDIENT_ENDPOINT}`, { id }),

  getAll: () => api.get<Ingredient[]>(`${settings.INGREDIENT_ENDPOINT}`),
};
