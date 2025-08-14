import type { IngredientQuantity } from "./ingredient";

export interface Refrigerator {
    user_id: number;
    ingredients: IngredientQuantity[];
}
