import { api } from "../client";
import { settings } from "../../config";
import type { PreferedRecipeTypeCreate, PreferedRecipeTypeResponse, PreferedRecipeTypeDelete } from "../models/prefered_diet_type";
import type { DietTypeResponse } from "../models/diet_type";


export const preferedDietTypeApi = {
  getById: (diet_type_id: number, requesting_user: number) =>
    api.get<PreferedRecipeTypeResponse>(`${settings.PREFERED_DIET_TYPES_ENDPOINT}`, { diet_type_id, requesting_user }),

  getAll: (requesting_user: number) =>
    api.get<PreferedRecipeTypeResponse[]>(`${settings.PREFERED_DIET_TYPES_ENDPOINT}`, { requesting_user }),

  create: (data: PreferedRecipeTypeCreate, requesting_user: number) =>
    api.post<DietTypeResponse>(`${settings.PREFERED_DIET_TYPES_ENDPOINT}`, data, { requesting_user }),

  delete: (diet_type_id: number, requesting_user: number) =>
    api.delete<PreferedRecipeTypeDelete>(`${settings.PREFERED_DIET_TYPES_ENDPOINT}`, { diet_type_id, requesting_user }),
};