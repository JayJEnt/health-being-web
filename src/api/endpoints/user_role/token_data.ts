import { settings } from '../../../config';
import { isToken } from '../../../utils';
import { api } from '../../client';
import type { Token } from '../../models/token';
import type { User } from '../../models/user';

export const tokenDataApi = {
  getUser: () => {
    const rawToken = localStorage.getItem('app.auth.token');
    if (!rawToken) throw new Error("Couldn't find token");
    let token: Token | null;
    const parsed: unknown = JSON.parse(rawToken);
    if (isToken(parsed)) {
      token = parsed;
    } else {
      console.log('nie token');
      token = null;
    }

    return api.get<User>(`${settings.TOKEN_DATA_ENDPOINT}`, undefined, {
      headers: {
        Authorization: `Bearer ${token?.access_token}`,
      },
    });
  },
  hasAdminRole: () => api.get<boolean>(`${settings.TOKEN_DATA_ENDPOINT}`, { radmin_role: true }),

  refreshToken: () => api.post<Token>(`${settings.TOKEN_DATA_ENDPOINT}`),
};
