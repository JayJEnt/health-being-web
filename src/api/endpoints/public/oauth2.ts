import { settings } from '../../../config';
import { api } from '../../client';
import type { Token } from '../../models/token';
import type { User, UserCreate } from '../../models/user';
import type { Oauth2RequestForm } from '../../models/oauth2_form';

export const oauth2Api = {
  ourRegister: (user: UserCreate) =>
    api.post<User>(`${settings.REGISTER_ENDPOINT}`, user),

  ourLogin: (credentials: Oauth2RequestForm) =>
    api.postForm<Token>(`${settings.LOGIN_ENDPOINT}`, credentials),

  googleLogin: (provider: string) => api.get<Token>(`${settings.LOGIN_ENDPOINT}`, { provider }),
};
