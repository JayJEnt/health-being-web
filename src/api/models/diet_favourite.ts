export interface DietFavouriteCreate {
	name: string;
}

export interface DietFavouriteResponse extends DietFavouriteCreate {
	diet_id: number;
}

export interface DietFavouriteDelete {
	user_id: number;
	diet_id: number;
}
