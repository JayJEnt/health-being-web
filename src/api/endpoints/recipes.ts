import { api } from "../client";
import { settings } from "../../config";
import type { RecipeCreate, RecipeOverview, RecipeResponse } from "../models/recipe";


export const recipesApi = {
  getByPhrase: (phrase: string) =>
    api.get<RecipeResponse>(`${settings.RECIPES_ENDPOINT}`, { phrase }),

  getById: (id: number) =>
    api.get<RecipeResponse>(`${settings.RECIPES_ENDPOINT}`, { id }),

  getAll: () =>
    api.get<RecipeOverview[]>(`${settings.RECIPES_ENDPOINT}`),

  create: (data: RecipeCreate) =>
    api.post<RecipeResponse>(`${settings.RECIPES_ENDPOINT}`, data),

  update: (id: number, data: RecipeResponse) =>
    api.put<RecipeResponse>(`${settings.RECIPES_ENDPOINT}`, data, { id }),

  delete: (id: number) =>
    api.delete(`${settings.RECIPES_ENDPOINT}`, { id }),
};