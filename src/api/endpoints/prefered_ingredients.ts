import { api } from "../client";
import { settings } from "../../config";
import type {
    PreferedIngredientsCreate,
    PreferedIngredientsCreateResponse,
    PreferedIngredientsResponse,
    PreferedIngredientsDelete,
} from "../models/prefered_ingredients";


export const preferedIngredientsApi = {
  getById: (ingredient_id: number, requesting_user: number) =>
    api.get<PreferedIngredientsResponse>(`${settings.PREFERED_INGREDIENTS_ENDPOINT}`, { ingredient_id, requesting_user }),

  getAll: (requesting_user: number) =>
    api.get<PreferedIngredientsResponse[]>(`${settings.PREFERED_INGREDIENTS_ENDPOINT}`, { requesting_user }),

  create: (data: PreferedIngredientsCreate, requesting_user: number) =>
    api.post<PreferedIngredientsCreateResponse>(`${settings.PREFERED_INGREDIENTS_ENDPOINT}`, data, { requesting_user }),

  delete: (ingredient_id: number, requesting_user: number) =>
    api.delete<PreferedIngredientsDelete>(`${settings.PREFERED_INGREDIENTS_ENDPOINT}`, { ingredient_id, requesting_user }),
};