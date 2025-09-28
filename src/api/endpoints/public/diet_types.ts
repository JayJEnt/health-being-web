import { api } from "../../client";
import { settings } from "../../../config";
import type { DietTypeResponse } from "../../models/diet_type";


export const dietTypeApi = {
  getByName: (name: string) =>
    api.get<DietTypeResponse>(`${settings.DIET_TYPES_ENDPOINT}`, { name }),

  getById: (id: number) =>
    api.get<DietTypeResponse>(`${settings.DIET_TYPES_ENDPOINT}`, { id }),

  getAll: () =>
    api.get<DietTypeResponse[]>(`${settings.DIET_TYPES_ENDPOINT}`),
};