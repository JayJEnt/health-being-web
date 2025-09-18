/** Prefered recipe type models */

export interface CreatePreferedRecipeType {
    diet_name: string;
}

export interface PostCreatePreferedRecipeType extends CreatePreferedRecipeType {
    id: number;
}

export interface PreferedRecipeType {
    user_id: number;
    type_id: number;
}

export interface PreferedRecipeTypeGet {
    diet_name: string;
    type_id: number;
}
