export interface CreatePreferedIngredients {
    name: string;
    preference: string;
}

export interface PreferedIngredients {
    user_id: number;
    ingredient_id: number;
    preference: string;
}
