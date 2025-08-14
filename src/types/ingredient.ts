// Zakładamy, że masz te interfejsy w innym pliku:
import type { Vitamin, VitaminCreate } from "./vitamin";

export interface IngredientBaseModel {
    name: string;
}

export interface IngredientDetailedModel extends IngredientBaseModel {
    calories_per_100?: number; // = 0.0 in Python default
    protein_per_100?: number;
    fat_per_100?: number;
    carbon_per_100?: number;
    fiber_per_100?: number;
    sugar_per_100?: number;
    salt_per_100?: number;
}

export interface IngredientCreate extends IngredientDetailedModel {
    vitamins?: VitaminCreate[] | null;
}

export interface Ingredient extends IngredientDetailedModel {
    id: number;
}

export interface IngredientResponse extends Ingredient {
    vitamins?: Vitamin[] | null;
}

// Models used by other models/endpoints

export interface IngredientQuantity extends IngredientBaseModel {
    amount: number; // e.g. 100g, 1l, 2szt.
    measure_unit: string; // e.g. "g", "ml", "szt."
}
