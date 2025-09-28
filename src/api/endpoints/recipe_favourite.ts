import { api } from "../client";
import { settings } from "../../config";
import type {
    RecipeFavouriteCreate,
    RecipeFavouriteResponse,
    RecipeFavouriteDelete,
} from "../models/recipe_favourite";
import type { Recipe } from "../models/recipe";


export const recipeFavouriteApi = {
  getById: (recipe_id: number, requesting_user: number) =>
    api.get<RecipeFavouriteResponse>(`${settings.RECIPE_FAVOURITE_ENDPOINT}`, { recipe_id, requesting_user }),

  getAll: (requesting_user: number) =>
    api.get<RecipeFavouriteResponse[]>(`${settings.RECIPE_FAVOURITE_ENDPOINT}`, { requesting_user }),

  create: (data: RecipeFavouriteCreate, requesting_user: number) =>
    api.post<Recipe>(`${settings.RECIPE_FAVOURITE_ENDPOINT}`, data, { requesting_user }),

  delete: (recipe_id: number, requesting_user: number) =>
    api.delete<RecipeFavouriteDelete>(`${settings.RECIPE_FAVOURITE_ENDPOINT}`, { recipe_id, requesting_user }),
};