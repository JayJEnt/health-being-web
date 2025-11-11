class Settings {
  API_BASE_URL: string = '';
  ENVIRONMENT: string = '';
  LOG_LEVEL: string = '';

  DIET_ENDPOINT: string = '/diet';
  USER_FOLLOWED_ENDPOINT: string = '/user_followed';
  RECIPES_PAGE_SIZE: number = 18;
  IMAGES_UPLOAD_ENDPOINT: string = '/images/upload';
  IMAGES_DOWNLOAD_ENDPOINT: string = '/images/download';
  INGREDIENT_ENDPOINT: string = '/ingredient';
  OAUTH2_ENDPOINT: string = '/oauth2';
  INGREDIENT_PREFERENCE_ENDPOINT: string = '/ingredient_preference';
  DIET_FAVOURITE_ENDPOINT: string = '/diet_favourite';
  RECIPE_FAVOURITE_ENDPOINT: string = '/recipe_favourite';
  REFRIGERATOR_ENDPOINT: string = '/ingredient_refrigerator';
  RECIPE_ENDPOINT: string = '/recipe';
  TOKEN_DATA_ENDPOINT: string = '/token_data';
  USER_ENDPOINT: string = '/user';
  USER_OWNER_ENDPOINT: string = '/user/owner';
  VITAMIN_ENDPOINT: string = '/vitamin';

  AUTH_TOKEN_KEY: string = 'app.auth.token';
}

class LocalSettings extends Settings {
  API_BASE_URL: string = 'http://127.0.0.1:8000';
  ENVIRONMENT: string = 'local';
  LOG_LEVEL: string = 'DEBUG';
}

class RemoteSettings extends Settings {
  API_BASE_URL: string = 'unknown :)';
  ENVIRONMENT: string = 'remote';
  LOG_LEVEL: string = 'INFO';
}

type Environment = 'remote' | 'local';
const getSettings = (): Settings => {
  const rawEnv: unknown = import.meta.env.VITE_ENVIRONMENT;
  const environment: Environment =
    typeof rawEnv === 'string' && rawEnv.toLowerCase() === 'remote' ? 'remote' : 'local';

  return environment === 'remote' ? new RemoteSettings() : new LocalSettings();
};
export const settings = getSettings();
