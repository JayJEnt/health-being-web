import { settings } from '../../../config';
import { api } from '../../client';
import type { RecipeOverview, RecipeResponse } from '../../models/recipe';

export const recipeApi = {
  getByPhrase: (phrase: string) =>
    api.get<RecipeResponse[]>(`${settings.RECIPE_ENDPOINT}`, { phrase }),

  getById: (recipe_id: string) =>
    api.get<RecipeResponse>(`${settings.RECIPE_ENDPOINT}`, { recipe_id }),

  getAll: () => api.get<RecipeOverview[]>(`${settings.RECIPE_ENDPOINT}`),
};
