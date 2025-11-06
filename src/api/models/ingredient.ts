import type { Quantity, Micronutrients } from './utils';
import type { Vitamin, VitaminCreate } from './vitamin';

export interface IngredientName {
  name: string;
}

export interface Ingredient extends IngredientName, Micronutrients {}

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
