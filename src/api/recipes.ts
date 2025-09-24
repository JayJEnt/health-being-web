import { api } from "./client";
import { settings } from "../config";
import type { RecipeCreate, RecipeOverview, RecipeResponse } from "../types/recipe";


export const RecipesApi = {
  getByPhrase: (phrase: string) =>
    api.get<RecipeResponse>(`${settings.RECIPES_ENDPOINT}`, { params: { phrase } }),

  getById: (id: number) =>
    api.get<RecipeResponse>(`${settings.RECIPES_ENDPOINT}`, { params: { id } }),

  getAll: () =>
    api.get<RecipeOverview[]>(`${settings.RECIPES_ENDPOINT}`),

  create: (data: RecipeCreate) =>
    api.postJson<RecipeResponse>(`${settings.RECIPES_ENDPOINT}`, data),

  update: (id: number, data: Partial<RecipeResponse>) =>
    api.put<RecipeResponse>(`${settings.RECIPES_ENDPOINT}`, data, { params: { id } }),

  delete: (id: number) =>
    api.delete(`${settings.RECIPES_ENDPOINT}`, { params: { id } }),
};