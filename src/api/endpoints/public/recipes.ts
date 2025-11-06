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

  // Mock search endpoint - replace with actual /search endpoint when backend is ready
  search: (phrase: string, opts?: { page?: number; limit?: number }) =>
    api.get<RecipeOverview[]>(`${settings.RECIPES_ENDPOINT}/search`, {
      phrase,
      page: opts?.page,
      limit: opts?.limit,
    }),

  getById: (id: string) => api.get<RecipeResponse>(`${settings.RECIPES_ENDPOINT}`, { id }),
};
