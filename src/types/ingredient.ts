import type { MeasureUnit } from "./enum_utils";
import type { VitaminCreate, Vitamin } from "./vitamin";

/** Ingredient base models */
export interface IngredientName {
    name: string;
}

export interface IngredientIndex {
    id: number;
}

/** Ingredient data models */
export interface IngredientDataCreate {
    calories_per_100?: number; // default 0.0
    protein_per_100?: number;
    fat_per_100?: number;
    carbon_per_100?: number;
    fiber_per_100?: number;
    sugar_per_100?: number;
    salt_per_100?: number;
}

export interface IngredientDataResponse extends IngredientDataCreate {
    ingredient_id: number;
}

/** Ingredient models */
export interface Ingredient extends IngredientName, IngredientIndex { }

export interface IngredientCreate extends IngredientName {
    vitamins?: VitaminCreate[] | null;
    ingredients_data?: IngredientDataCreate | null;
}

export interface IngredientResponse extends Ingredient, IngredientDataCreate {
    vitamins?: Vitamin[] | null;
}

export interface IngredientUpdate extends IngredientName {
    vitamins?: VitaminCreate[] | null;
}

export interface IngredientUpdateResponse extends Ingredient {
    vitamins?: Vitamin[] | null;
}

/** Ingredient included models */
export interface IngredientQuantity extends IngredientName {
    amount: number;
    measure_unit: MeasureUnit;
}
