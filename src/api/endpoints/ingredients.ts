import { api } from "../client";
import { settings } from "../../config";
import type { IngredientCreate, Ingredient, IngredientResponse } from "../models/ingredient";


export const ingredientsApi = {
  getByName: (name: string) =>
    api.get<IngredientResponse>(`${settings.INGREDIENTS_ENDPOINT}`, { name }),

  getById: (id: number) =>
    api.get<IngredientResponse>(`${settings.INGREDIENTS_ENDPOINT}`, { id }),

  getAll: () =>
    api.get<Ingredient[]>(`${settings.INGREDIENTS_ENDPOINT}`),

  create: (data: IngredientCreate) =>
    api.post<IngredientResponse>(`${settings.INGREDIENTS_ENDPOINT}`, data),

  update: (id: number, data: IngredientCreate) =>
    api.put<IngredientResponse>(`${settings.INGREDIENTS_ENDPOINT}`, data, { id }),

  delete: (id: number) =>
    api.delete<IngredientResponse>(`${settings.INGREDIENTS_ENDPOINT}`, { id }),
};