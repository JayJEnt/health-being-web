import type { IngredientQuantity } from "./ingredient";
import type { DietTypeCreate } from "./diet_type";

export interface RecipeBaseModel {
    title: string;
    image_url?: string | null;
    description: string;
    instructions: string[];
}

export interface RecipePage extends RecipeBaseModel {
    diet_type?: DietTypeCreate[] | null;
    ingredients: IngredientQuantity[];
}

export interface RecipeOverview {
    id: number;
    title: string;
    image_url?: string | null;
}

export interface Recipe extends RecipeOverview {
    description: string;
    instructions: string[];
}

export interface RecipePageResponse extends Recipe {
    diet_type?: DietTypeCreate[] | null;
    ingredients: IngredientQuantity[];
}
