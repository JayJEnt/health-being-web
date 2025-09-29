import { api } from "../../client";
import { settings } from "../../../config";
import type { DietTypeResponse } from "../../models/diet_type";


export const dietTypeApi = {
  getByName: (diet_name: string, signal?: AbortSignal) =>
    api.get<DietTypeResponse>(`${settings.DIET_TYPES_ENDPOINT}`, { diet_name }, { signal }),

  getById: (id: number) =>
    api.get<DietTypeResponse>(`${settings.DIET_TYPES_ENDPOINT}`, { id }),

  getAll: () =>
    api.get<DietTypeResponse[]>(`${settings.DIET_TYPES_ENDPOINT}`),
};