export interface RecipeFavouriteCreate {
  title: string;
}

export interface RecipeFavouriteResponse extends RecipeFavouriteCreate {
  recipe_id: number;
}

export interface RecipeFavouriteDelete {
  user_id: number;
  recipe_id: number;
}
