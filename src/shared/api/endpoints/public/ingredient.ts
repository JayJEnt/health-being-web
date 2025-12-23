import { settings } from "../../../config";
import type { Ingredient, IngredientResponse } from "../../../models/ingredient";
import { api } from "../../client";

export const ingredientApi = {
	getByName: (name: string, signal?: AbortSignal) =>
		api.get<IngredientResponse>(`${settings.INGREDIENT_ENDPOINT}`, { name }, { signal }),
	
	getByPhrase: (phrase: string, signal: AbortSignal) =>
		api.get<IngredientResponse[]>(`${settings.INGREDIENT_ENDPOINT}`, { phrase }, { signal }),
	
	getById: (ingredient_id: number) =>
		api.get<IngredientResponse>(`${settings.INGREDIENT_ENDPOINT}`, { ingredient_id }),

	getAll: () => api.get<Ingredient[]>(`${settings.INGREDIENT_ENDPOINT}`),
};
