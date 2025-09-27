import { api } from "../client";
import { settings } from "../../config";
import type { DietTypeCreate, DietTypeResponse } from "../models/diet_type";


export const dietTypeApi = {
  getByName: (name: string) =>
    api.get<DietTypeResponse>(`${settings.DIET_TYPES_ENDPOINT}`, { name }),

  getById: (id: number) =>
    api.get<DietTypeResponse>(`${settings.DIET_TYPES_ENDPOINT}`, { id }),

  getAll: () =>
    api.get<DietTypeResponse[]>(`${settings.DIET_TYPES_ENDPOINT}`),

  create: (data: DietTypeCreate) =>
    api.post<DietTypeResponse>(`${settings.DIET_TYPES_ENDPOINT}`, data),

  update: (id: number, data: DietTypeCreate) =>
    api.put<DietTypeResponse>(`${settings.DIET_TYPES_ENDPOINT}`, data, { id }),

  delete: (id: number) =>
    api.delete<DietTypeResponse>(`${settings.DIET_TYPES_ENDPOINT}`, { id }),
};