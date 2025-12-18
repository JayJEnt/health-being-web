import { settings } from "../../../config";
import type { User, UserCreate } from "../../../models/user";
import { api } from "../../client";

export const userOwnerApi = {
	get: () => api.get<User>(`${settings.USER_OWNER_ENDPOINT}`),

	update: (data: UserCreate) => api.put<User>(`${settings.USER_OWNER_ENDPOINT}`, data),

	delete: () => api.delete<User>(`${settings.USER_OWNER_ENDPOINT}`),
};
