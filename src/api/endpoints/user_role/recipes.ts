import { api } from "../../client";
import { settings } from "../../../config";
import type { RecipeCreate, RecipeResponse } from "../../models/recipe";


export const recipesApi = {
  create: (data: RecipeCreate) =>
    api.post<RecipeResponse>(`${settings.RECIPES_ENDPOINT}`, data),

  update: (id: number, data: RecipeResponse) =>
    api.put<RecipeResponse>(`${settings.RECIPES_ENDPOINT}`, data, { id }),

  delete: (id: number) =>
    api.delete(`${settings.RECIPES_ENDPOINT}`, { id }),
};