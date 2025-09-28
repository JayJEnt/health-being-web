import { api } from "../client";
import { settings } from "../../config";
import type {
    RefrigeratorCreate,
    RefrigeratorCreateResponse,
    RefrigeratorResponse,
    RefrigeratorDelete,
} from "../models/refrigerator";


export const refrigeratorApi = {
  getById: (ingredient_id: number, requesting_user: number) =>
    api.get<RefrigeratorResponse>(`${settings.REFRIGERATOR_ENDPOINT}`, { ingredient_id, requesting_user }),

  getAll: (requesting_user: number) =>
    api.get<RefrigeratorResponse[]>(`${settings.REFRIGERATOR_ENDPOINT}`, { requesting_user }),

  create: (data: RefrigeratorCreate, requesting_user: number) =>
    api.post<RefrigeratorCreateResponse>(`${settings.REFRIGERATOR_ENDPOINT}`, data, { requesting_user }),

  delete: (ingredient_id: number, requesting_user: number) =>
    api.delete<RefrigeratorDelete>(`${settings.REFRIGERATOR_ENDPOINT}`, { ingredient_id, requesting_user }),
};