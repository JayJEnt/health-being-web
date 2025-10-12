import type { Quantity } from './utils';
import type { Vitamin, VitaminCreate } from './vitamin';

export interface IngredientName {
  name: string;
}

export interface Ingredient extends IngredientName {
  calories_per_100?: number;
  protein_per_100?: number;
  fat_per_100?: number;
  carbon_per_100?: number;
  fiber_per_100?: number;
  sugar_per_100?: number;
  salt_per_100?: number;
}

export interface IngredientResponse extends Ingredient {
  id: number;
}

export interface IngredientCreate extends Ingredient {
  vitamins?: VitaminCreate[] | null;
}

export interface IngredientResponseAll extends IngredientResponse {
  vitamins?: Vitamin[] | null;
}

export interface IngredientQuantity extends IngredientName, Quantity {}
