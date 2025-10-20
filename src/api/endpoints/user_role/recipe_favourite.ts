import { settings } from '../../../config';
import { api } from '../../client';
import type { Recipe } from '../../models/recipe';
import type {
  RecipeFavouriteCreate,
  RecipeFavouriteDelete,
  RecipeFavouriteResponse,
} from '../../models/recipe_favourite';

export const recipeFavouriteApi = {
  getById: (recipe_id: number) =>
    api.get<RecipeFavouriteResponse>(`${settings.RECIPE_FAVOURITE_ENDPOINT}`, { recipe_id }),

  getAll: () => api.get<RecipeFavouriteResponse[]>(`${settings.RECIPE_FAVOURITE_ENDPOINT}`),

  create: (data: RecipeFavouriteCreate) =>
    api.post<Recipe>(`${settings.RECIPE_FAVOURITE_ENDPOINT}`, data),

  delete: (recipe_id: number) =>
    api.delete<RecipeFavouriteDelete>(`${settings.RECIPE_FAVOURITE_ENDPOINT}`, { recipe_id }),
};
