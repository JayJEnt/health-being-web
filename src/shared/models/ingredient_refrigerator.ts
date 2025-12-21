import type { Quantity } from "./utils";

export interface IngredientRefrigeratorCreate extends Quantity {
	name: string;
}

export interface IngredientRefrigeratorCreateResponse extends IngredientRefrigeratorCreate {
	id: number;
}

export interface IngredientRefrigeratorResponse extends IngredientRefrigeratorCreate {
	ingredient_id: number;
}

export interface IngredientRefrigeratorDelete extends Quantity {
	user_id: number;
	ingredient_id: number;
}
