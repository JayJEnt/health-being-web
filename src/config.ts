class Settings {
    API_BASE_URL: string = "";
    ENVIRONMENT: string = "";
    LOG_LEVEL: string = "";

    DIET_TYPES_ENDPOINT: string = "/diet_types";
    FOLLOWS_ENDPOINT: string = "/follows";
    IMAGES_UPLOAD_ENDPOINT: string = "/images/upload";
    IMAGES_DOWNLOAD_ENDPOINT: string = "/images/download";
    INGREDIENTS_ENDPOINT: string = "/ingredients";
    OAUTH2_GOOGLE_LOGIN_ENDPOINT: string = "/oauth2_google/login";
    OAUTH2_OUR_LOGIN_ENDPOINT: string = "/oauth2_our/login";
    OAUTH2_OUR_REGISTER_ENDPOINT: string = "/oauth2_our/register";
    PREFERED_INGREDIENTS_ENDPOINT: string = "/prefered_ingredients";
    PREFERED_DIET_TYPES_ENDPOINT: string = "/prefered_recipe_type";
    RECIPE_FAVOURITE_ENDPOINT: string = "/recipe_favourite";
    REFRIGERATOR_ENDPOINT: string = "/refrigerator";
    RECIPES_ENDPOINT: string = "/recipes";
    TOKEN_DATA_ENDPOINT: string = "/token_data";
    USERSDATA_ENDPOINT: string = "/users_data";
    USERSDATA_OWNER_ENDPOINT: string = "/users_data/owner";
    USERS_ENDPOINT: string = "/users";
    USERS_OWNER_ENDPOINT: string = "/users/owner";
    VITAMINS_ENDPOINT: string = "/vitamins";
}


class LocalSettings extends Settings {
    API_BASE_URL: string = "http://127.0.0.1:8000";
    ENVIRONMENT: string = "local";
    LOG_LEVEL: string = "DEBUG";
}


class RemoteSettings extends Settings {
    API_BASE_URL: string = "unknown :)";
    ENVIRONMENT: string = "remote";
    LOG_LEVEL: string = "INFO";
}


const getSettings = (): Settings => {
    const environment =
        import.meta.env.VITE_ENVIRONMENT?.toLowerCase() || "local";

    return environment === "remote" ? new RemoteSettings() : new LocalSettings();
};

export const settings = getSettings();
