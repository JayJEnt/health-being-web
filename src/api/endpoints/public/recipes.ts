import { settings } from '../../../config';
import { api } from '../../client';
import type { RecipeOverview, RecipeResponse } from '../../models/recipe';

export const recipesApi = {
  getByPhrase: (phrase: string) =>
    api.get<RecipeResponse>(`${settings.RECIPES_ENDPOINT}`, { phrase }),

  getById: (id: string) => api.get<RecipeResponse>(`${settings.RECIPES_ENDPOINT}`, { id }),

  getAll: () => api.get<RecipeOverview[]>(`${settings.RECIPES_ENDPOINT}`),
};
