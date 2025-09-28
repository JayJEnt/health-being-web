import { api } from "../../client";
import { settings } from "../../../config";
import type { Ingredient, IngredientResponse } from "../../models/ingredient";


export const ingredientsApi = {
  getByName: (name: string) =>
    api.get<IngredientResponse>(`${settings.INGREDIENTS_ENDPOINT}`, { name }),

  getById: (id: number) =>
    api.get<IngredientResponse>(`${settings.INGREDIENTS_ENDPOINT}`, { id }),

  getAll: () =>
    api.get<Ingredient[]>(`${settings.INGREDIENTS_ENDPOINT}`),
};