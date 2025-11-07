import { settings } from '../../../config';
import { api } from '../../client';
import type { Token } from '../../models/token';
import type { User, UserCreate } from '../../models/user';

export const oauth2Api = {
  ourRegister: (user: UserCreate) =>
    api.post<User>(`${settings.REGISTER_ENDPOINT}`, user),

  ourLogin: (credentials: Omit<UserCreate, 'email'>) =>
    api.postForm<Token>(`${settings.LOGIN_ENDPOINT}`, credentials),

  googleLogin: (provider: string) => api.get<Token>(`${settings.LOGIN_ENDPOINT}`, { provider }),
};
