import type { DietCreate } from './diet';
import type { IngredientQuantity } from './ingredient';

export interface RecipeCreate {
  title: string;
  description: string;
  instructions: string[];
  diet?: DietCreate[] | null;
  ingredient: IngredientQuantity[];
}

export interface RecipeOverview {
  id: number;
  title: string;
}

export interface Recipe extends RecipeOverview {
  author_id: number;
  description: string;
  instructions: string[];
}

export interface RecipeResponse extends Recipe {
  diet?: DietCreate[] | null;
  ingredient: IngredientQuantity[];
}
