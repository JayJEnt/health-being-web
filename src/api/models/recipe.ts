import type { IngredientQuantity } from "./ingredient";
import type { DietTypeCreate } from "./diet_type"


export interface RecipeCreate {
    title: string;
    description: string;
    instructions: string[];
    diet_type?: DietTypeCreate[] | null;
    ingredients: IngredientQuantity[];
}


export interface RecipeOverview {
    id: number;
    title: string;
}


export interface RecipeResponse extends RecipeOverview {
    owner_id: number;
    description: string;
    instructions: string[];
    diet_type?: DietTypeCreate[] | null;
    ingredients: IngredientQuantity[];
}
