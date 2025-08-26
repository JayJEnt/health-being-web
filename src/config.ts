class Settings {
    API_BASE_URL: string = "";
    ENVIRONMENT: string = "";
    LOG_LEVEL: string = "";

    // DIET_TYPES ROUTER
    DIET_TYPES_BASE_ENDPOINT: string = "/diet_types"; // or /{diet_type_id}
    DIET_TYPES_NAME_ENDPOINT: string = "/diet_types/name/"; // {diet_name}

    // IMAGES ROUTER
    IMAGES_UPLOAD_ENDPOINT: string = "/images/upload";
    IMAGES_DOWNLOAD_ENDPOINT: string = "/images/download/"; // {filename}

    // INGREDIENTS ROUTER
    INGREDIENTS_BASE_ENDPOINT: string = "/ingredients"; // or /{ingredient_id}
    INGREDIENTS_NAME_ENDPOINT: string = "/ingredients/name/"; // {ingredient_name}

    // OAUTH2 ROUTER
    OAUTH2_GOOGLE_LOGIN_ENDPOINT: string = "/oauth2_google/login";
    OAUTH2_OUR_LOGIN_ENDPOINT: string = "/oauth2_our/login";
    OAUTH2_OUR_REGISTER_ENDPOINT: string = "/oauth2_our/register";

    // RECIPES ROUTER
    RECIPES_BASE_ENDPOINT: string = "/recipes"; // or /{recipe_id}
    RECIPES_SEARCH_ENDPOINT: string = "/recipes/search/"; // {phrase}

    // TOKEN_DATA ROUTER
    TOKEN_DATA_USER_ENDPOINT: string = "/token_data/user";
    TOKEN_DATA_ADMIN_ROLE_ENDPOINT: string = "/token_data/admin_role";

    // USERS ROUTER
    USERS_BASE_ENDPOINT: string = "/users"; // or /{user_id}
    USERS_OWNER_ID_ENDPOINT: string = "/users/owner/"; // {user_id}
    USERS_NAME_ENDPOINT: string = "/users/name/"; // {username}
    USERS_EMAIL_ENDPOINT: string = "/users/email/"; // {email}

    // VITAMINS ROUTER
    VITAMINS_BASE_ENDPOINT: string = "/vitamins"; // or /{vitamin_id}
    VITAMINS_NAME_ENDPOINT: string = "/vitamins/name/"; // {vitamin_name}

    // USERS DATA
    USERSDATA_BASE_ENDPOINT: string = "/users_data/"; // or /{user_id}
    USERSDATA_OWNER_ENDPOINT: string = "/users_data/owner/"; // {user_id}
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
