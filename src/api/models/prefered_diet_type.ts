export interface PreferedRecipeTypeCreate {
    diet_name: string;
}


export interface PreferedRecipeTypeResponse extends PreferedRecipeTypeCreate {
    type_id: number;
}


export interface PreferedRecipeTypeDelete {
    user_id: number;
    type_id: number;
}
