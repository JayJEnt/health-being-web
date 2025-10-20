import type { Preference } from './enum_utils';

export interface PreferedIngredientsCreate {
  name: string;
  preference: Preference;
}

export interface PreferedIngredientsCreateResponse extends PreferedIngredientsCreate {
  id: number;
}

export interface PreferedIngredientsResponse extends PreferedIngredientsCreate {
  ingredient_id: number;
}

export interface PreferedIngredientsDelete {
  user_id: number;
  ingredient_id: number;
  preference: Preference;
}
