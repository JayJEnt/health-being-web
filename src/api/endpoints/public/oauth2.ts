import { settings } from '../../../config';
import { api } from '../../client';
import type { Token } from '../../models/token';
import type { User, UserCreate } from '../../models/user';

export const oauth2Api = {
  ourRegister: (user: UserCreate) =>
    api.get<User>(`${settings.OAUTH2_OUR_REGISTER_ENDPOINT}`, { user }),

  ourLogin: (credentials: Omit<UserCreate, 'email'>) =>
    api.postForm<Token>(`${settings.OAUTH2_OUR_LOGIN_ENDPOINT}`, credentials),

  googleLogin: () => api.get<Token>(`${settings.OAUTH2_GOOGLE_LOGIN_ENDPOINT}`),
};
