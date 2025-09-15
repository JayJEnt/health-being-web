/** Follows models */

export interface CreateFollows {
    username: string;
}

export interface Follows {
    user_id: number;
    followed_user_id: number;
}

export interface FollowsGet {
    users: string;
}
