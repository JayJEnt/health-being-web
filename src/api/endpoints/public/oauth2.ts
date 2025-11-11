import { settings } from '../../../config';
import { api } from '../../client';
import type { Token } from '../../models/token';
import type { User, UserCreate } from '../../models/user';
import type { Oauth2RequestForm } from '../../models/oauth2_form';

export const oauth2Api = {
  ourRegister: (user: UserCreate) =>
    api.post<User>(`${settings.OAUTH2_ENDPOINT}/register`, user),

  ourLogin: (credentials: Oauth2RequestForm) =>
    api.postForm<Token>(`${settings.OAUTH2_ENDPOINT}/login`, credentials),

  sendVerificationEmail: (email: string) =>
    api.post<JSON>(`${settings.OAUTH2_ENDPOINT}/send_verification_email`, undefined, { email }),

  verifyEmail: () =>
    api.get<User>(`${settings.OAUTH2_ENDPOINT}/verify_email`),

  externalLogin: (provider: string) =>
    api.get<Token>(`${settings.OAUTH2_ENDPOINT}/login`, { provider }),
};
