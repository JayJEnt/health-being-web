import { settings } from '../../../config';
import { api } from '../../client';
import type { RecipeOverview, RecipeResponse } from '../../models/recipe';

export const recipesApi = {
  getByPhrase: (phrase: string, opts?: { dietType?: string; page?: number; limit?: number }) =>
    api.get<RecipeOverview[]>(`${settings.RECIPES_ENDPOINT}`, {
      phrase,
      diet_type: opts?.dietType,
      page: opts?.page,
      limit: opts?.limit,
    }),

  getById: (id: string) => api.get<RecipeResponse>(`${settings.RECIPES_ENDPOINT}`, { id }),

  getAll: (opts?: { page?: number; limit?: number }) =>
    api.get<RecipeOverview[]>(`${settings.RECIPES_ENDPOINT}`, {
      page: opts?.page,
      limit: opts?.limit,
    }),
};
