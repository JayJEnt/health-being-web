import { settings } from "../../../config";
import type { DietCreate, DietResponse } from "../../../models/diet";
import { api } from "../../client";

export const dietAdminApi = {
	create: (data: DietCreate) => api.post<DietResponse>(`${settings.DIET_ENDPOINT}`, data),

	update: (diet_id: number, data: DietCreate) =>
		api.put<DietResponse>(`${settings.DIET_ENDPOINT}`, data, { diet_id }),

	delete: (diet_id: number) => api.delete<DietResponse>(`${settings.DIET_ENDPOINT}`, { diet_id }),
};
