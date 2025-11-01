import { settings } from '../../../config';
import { api } from '../../client';
import type {
  RecipeCreate,
  RecipeFilter,
  RecipeOverview,
  RecipeResponse,
} from '../../models/recipe';

export const recipesApi = {
  create: (data: RecipeCreate) => api.post<RecipeResponse>(`${settings.RECIPES_ENDPOINT}`, data),

  update: (id: string, data: RecipeCreate) =>
    api.put<RecipeResponse>(`${settings.RECIPES_ENDPOINT}`, data, { id }),

  delete: (id: string) => api.delete(`${settings.RECIPES_ENDPOINT}`, { id }),

  deepSearch: (phrase: string, filters: RecipeFilter) =>
    api.post<RecipeOverview[]>(`${settings.RECIPES_ENDPOINT}/deep_search`, filters, { phrase }),
};
