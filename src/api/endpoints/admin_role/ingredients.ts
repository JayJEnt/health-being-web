import { api } from "../../client";
import { settings } from "../../../config";
import type { IngredientCreate, IngredientResponse } from "../../models/ingredient";


export const ingredientsAdminApi = {
  create: (data: IngredientCreate) =>
    api.post<IngredientResponse>(`${settings.INGREDIENTS_ENDPOINT}`, data),

  update: (id: number, data: IngredientCreate) =>
    api.put<IngredientResponse>(`${settings.INGREDIENTS_ENDPOINT}`, data, { id }),

  delete: (id: number) =>
    api.delete<IngredientResponse>(`${settings.INGREDIENTS_ENDPOINT}`, { id }),
};