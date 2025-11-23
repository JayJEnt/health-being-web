import { settings } from "../../../config";
import { api } from "../../client";
import type { IngredientCreate, IngredientResponse } from "../../models/ingredient";

export const ingredientAdminApi = {
	create: (data: IngredientCreate) =>
		api.post<IngredientResponse>(`${settings.INGREDIENT_ENDPOINT}`, data),

	update: (ingredient_id: number, data: IngredientCreate) =>
		api.put<IngredientResponse>(`${settings.INGREDIENT_ENDPOINT}`, data, { ingredient_id }),

	delete: (ingredient_id: number) =>
		api.delete<IngredientResponse>(`${settings.INGREDIENT_ENDPOINT}`, { ingredient_id }),
};
