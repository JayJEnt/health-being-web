import { settings } from "../../../config";
import type { RecipeOverview, RecipeResponse } from "../../../models/recipe";
import { api } from "../../client";

export const recipeApi = {
	getById: (recipe_id: string) =>
		api.get<RecipeResponse>(`${settings.RECIPE_ENDPOINT}`, { recipe_id }),

	getAll: () => api.get<RecipeOverview[]>(`${settings.RECIPE_ENDPOINT}`),

	search: (phrase: string) => api.get<RecipeOverview[]>(`${settings.RECIPE_ENDPOINT}`, { phrase }),
};
