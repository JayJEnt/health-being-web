import { settings } from '../../../config';
import { api } from '../../client';
import type { RecipeFilter } from '../../models/filters';
import type { RecipeCreate, RecipeOverview, RecipeResponse } from '../../models/recipe';

export const recipeApi = {
  create: (data: RecipeCreate) => api.post<RecipeResponse>(`${settings.RECIPE_ENDPOINT}`, data),

  update: (recipe_id: string, data: RecipeCreate) =>
    api.put<RecipeResponse>(`${settings.RECIPE_ENDPOINT}`, data, { recipe_id }),

  delete: (recipe_id: string) => api.delete(`${settings.RECIPE_ENDPOINT}`, { recipe_id }),

  deepSearch: (phrase: string, data: RecipeFilter) =>
    api.post<RecipeOverview[]>(`${settings.RECIPE_ENDPOINT}/deep_search`, data, { phrase }),
};
