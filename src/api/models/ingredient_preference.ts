import type { Preference } from './enum_utils';

export interface IngredientPreferenceCreate {
  name: string;
  preference: Preference;
}

export interface IngredientPreferenceCreateResponse extends IngredientPreferenceCreate {
  id: number;
}

export interface IngredientPreferenceResponse extends IngredientPreferenceCreate {
  ingredient_id: number;
}

export interface IngredientPreferenceDelete {
  user_id: number;
  ingredient_id: number;
  preference: Preference;
}
