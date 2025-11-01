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

export interface RecipeFilter {
  allergies_off?: boolean;
  dislike_off?: boolean;
  only_favourite_ingredients?: boolean;
  only_favourite_diets?: boolean;
  only_followed_authors?: boolean;
  only_owned_ingredients?: boolean;
}
