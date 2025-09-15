/** Recipe favourite models */

export interface CreateRecipeFavourite {
    title: string;
}

export interface PostCreateRecipeFavourite {
    id: number;
}

export interface RecipeFavourite {
    user_id: number;
    recipe_id: number;
}

export interface RecipeFavouriteGet {
    users: string;
    recipes: string;
}
