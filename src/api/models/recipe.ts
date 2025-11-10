import type { DietCreate } from './diet';
import type { IngredientQuantity } from './ingredient';
import type { MicronutrientsTotal } from './utils';
import type { Category } from './enum_utils';

export interface RecipeCreate {
  title: string;
  description: string;
  instructions: string[];
  diet?: DietCreate[] | null;
  ingredient: IngredientQuantity[];
  category: Category;
}

export interface RecipeOverview {
  id: number;
  title: string;
}

export interface Recipe extends RecipeOverview {
  author_id: number;
  description: string;
  instructions: string[];
  category: Category;
}

export interface RecipeResponse extends Recipe {
  diet?: DietCreate[] | null;
  ingredient: IngredientQuantity[];
  micronutrients?: MicronutrientsTotal | {};
}
