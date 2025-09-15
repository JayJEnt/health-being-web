import type { ActivityLevel, Silhouette } from "./enum_utils";

/** UserData models */

export interface UserDataCreate {
    weight?: number | null;
    height?: number | null;
    age?: number | null;
    activity_level?: ActivityLevel | null;
    silhouette?: Silhouette | null;
}

/** UserData response models */

export interface UserData extends UserDataCreate {
    user_id: number;
}
