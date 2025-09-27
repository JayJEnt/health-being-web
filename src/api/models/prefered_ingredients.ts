import type { Preference } from "./enum_utils";


export interface CreatePreferedIngredients {
    name: string;
    preference: Preference;
}


export interface PostCreatePreferedIngredients
    extends CreatePreferedIngredients {
    id: number;
}


export interface PreferedIngredients {
    user_id: number;
    ingredient_id: number;
    preference: Preference;
}


export interface PreferedIngredientsGet {
    ingredient_id: number;
    preference: Preference;
    name: string;
}
