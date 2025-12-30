import type { DietCreate } from "./diet";
import type { Category } from "./enum_utils";
import type { IngredientQuantity } from "./ingredient";
import type { MicronutrientsTotal } from "./utils";

export interface RecipeCreate {
	title: string;
	description: string;
	instructions: string[];
	diet: DietCreate[];
	ingredient: IngredientQuantity[];
	category: Category[];
}

export interface RecipeOverview {
	id: number;
	title: string;
}

export interface Recipe extends RecipeOverview {
	author_id: number;
	description: string;
	instructions: string[];
	category: Category[];
}

export interface RecipeResponse extends Recipe {
	diet: DietCreate[];
	ingredient: IngredientQuantity[];
	micronutrients: MicronutrientsTotal;
}

export interface RecipeFilter {
	allergies_off?: boolean;
	dislike_off?: boolean;
	only_favourite_ingredients?: boolean;
	only_favourite_diets?: boolean;
	only_followed_authors?: boolean;
	only_owned_ingredients?: boolean;
}

export const EMPTY_RECIPE: RecipeCreate = {
	title: "",
	description: "",
	instructions: [],
	diet: [],
	ingredient: [],
	category: [],
};
