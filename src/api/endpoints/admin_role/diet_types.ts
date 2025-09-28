import { api } from "../../client";
import { settings } from "../../../config";
import type { DietTypeCreate, DietTypeResponse } from "../../models/diet_type";


export const dietTypeAdminApi = {
  create: (data: DietTypeCreate) =>
    api.post<DietTypeResponse>(`${settings.DIET_TYPES_ENDPOINT}`, data),

  update: (id: number, data: DietTypeCreate) =>
    api.put<DietTypeResponse>(`${settings.DIET_TYPES_ENDPOINT}`, data, { id }),

  delete: (id: number) =>
    api.delete<DietTypeResponse>(`${settings.DIET_TYPES_ENDPOINT}`, { id }),
};