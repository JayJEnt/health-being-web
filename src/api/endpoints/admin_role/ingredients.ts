import { api } from "../../client";
import { settings } from "../../../config";
import type { Ingredient, IngredientResponse } from "../../models/ingredient";

let ingredientsCache: Ingredient[] | null = null;
let ingredientsCachePromise: Promise<Ingredient[]> | null = null;

export const ingredientsApi = {
  getByName: (name: string, signal?: AbortSignal) =>
    api.get<IngredientResponse>(
      `${settings.INGREDIENTS_ENDPOINT}`,
      { name },
      { signal }
    ),

  getById: (id: number) =>
    api.get<IngredientResponse>(`${settings.INGREDIENTS_ENDPOINT}`, { id }),

  getAll: () => {
    if (ingredientsCache) {
      return Promise.resolve(ingredientsCache);
    }
    if (ingredientsCachePromise) {
      return ingredientsCachePromise;
    }
    ingredientsCachePromise = api
      .get<Ingredient[]>(`${settings.INGREDIENTS_ENDPOINT}`)
      .then((data) => {
        ingredientsCache = data;
        ingredientsCachePromise = null;
        return data;
      });
    return ingredientsCachePromise;
  },

  _clearCache: () => {
    ingredientsCache = null;
    ingredientsCachePromise = null;
  },
};
