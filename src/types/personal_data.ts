export interface PersonalDataCreate {
    weight?: number | null;
    height?: number | null;
    age?: number | null;
    activity_level?: string | null; // e.g. sedentary, lightly active, etc.
    silhouette?: string | null; // e.g. ectomorph, mesomorph, endomorph
}

export interface PersonalData extends PersonalDataCreate {
    user_id: number;
}
