import { settings } from "../../../config";
import { api } from "../../client";
import type { Token } from "../../models/token";
import type { User } from "../../models/user";

export const tokenDataApi = {
	getUser: () => api.get<User>(`${settings.TOKEN_DATA_ENDPOINT}`),

	hasAdminRole: () => api.get<boolean>(`${settings.TOKEN_DATA_ENDPOINT}`, { radmin_role: true }),

	refreshToken: () => api.post<Token>(`${settings.TOKEN_DATA_ENDPOINT}`),
};
