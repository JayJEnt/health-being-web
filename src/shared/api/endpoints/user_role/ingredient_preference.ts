import { settings } from "../../../config";
import type {
	IngredientPreferenceCreate,
	IngredientPreferenceCreateResponse,
	IngredientPreferenceDelete,
	IngredientPreferenceResponse,
} from "../../../models/ingredient_preference";
import { api } from "../../client";

export const ingredientPreferenceApi = {
	getById: (ingredient_id: number) =>
		api.get<IngredientPreferenceResponse>(`${settings.INGREDIENT_PREFERENCE_ENDPOINT}`, {
			ingredient_id,
		}),

	getAll: () =>
		api.get<IngredientPreferenceResponse[]>(`${settings.INGREDIENT_PREFERENCE_ENDPOINT}`),

	create: (data: IngredientPreferenceCreate) =>
		api.post<IngredientPreferenceCreateResponse>(
			`${settings.INGREDIENT_PREFERENCE_ENDPOINT}`,
			data,
		),

	delete: (ingredient_id: number) =>
		api.delete<IngredientPreferenceDelete>(`${settings.INGREDIENT_PREFERENCE_ENDPOINT}`, {
			ingredient_id,
		}),
};
