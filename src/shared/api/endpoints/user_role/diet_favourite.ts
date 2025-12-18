import { settings } from "../../../config";
import type { DietResponse } from "../../../models/diet";
import type {
	DietFavouriteCreate,
	DietFavouriteDelete,
	DietFavouriteResponse,
} from "../../../models/diet_favourite";
import { api } from "../../client";

export const dietFavouriteApi = {
	getById: (diet_id: number) =>
		api.get<DietFavouriteResponse>(`${settings.DIET_FAVOURITE_ENDPOINT}`, { diet_id }),

	getAll: () => api.get<DietFavouriteResponse[]>(`${settings.DIET_FAVOURITE_ENDPOINT}`),

	create: (data: DietFavouriteCreate) =>
		api.post<DietResponse>(`${settings.DIET_FAVOURITE_ENDPOINT}`, data),

	delete: (diet_id: number) =>
		api.delete<DietFavouriteDelete>(`${settings.DIET_FAVOURITE_ENDPOINT}`, { diet_id }),
};
