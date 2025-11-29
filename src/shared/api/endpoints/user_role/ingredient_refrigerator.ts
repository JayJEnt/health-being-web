import { settings } from "../../../config";
import { api } from "../../client";
import type {
	IngredientRefrigeratorCreate,
	IngredientRefrigeratorCreateResponse,
	IngredientRefrigeratorDelete,
	IngredientRefrigeratorResponse,
} from "../../models/ingredient_refrigerator";

export const ingredientRefrigeratorApi = {
	getById: (ingredient_id: number) =>
		api.get<IngredientRefrigeratorResponse>(`${settings.REFRIGERATOR_ENDPOINT}`, { ingredient_id }),

	getAll: () => api.get<IngredientRefrigeratorResponse[]>(`${settings.REFRIGERATOR_ENDPOINT}`),

	create: (data: IngredientRefrigeratorCreate) =>
		api.post<IngredientRefrigeratorCreateResponse>(`${settings.REFRIGERATOR_ENDPOINT}`, data),

	delete: (ingredient_id: number) =>
		api.delete<IngredientRefrigeratorDelete>(`${settings.REFRIGERATOR_ENDPOINT}`, {
			ingredient_id,
		}),
};
