export interface FollowsCreate {
	name: string;
}

export interface FollowsResponse extends FollowsCreate {
	followed_user_id: number;
}

export interface FollowsDelete {
	followed_user_id: number;
	user_id: number;
}
