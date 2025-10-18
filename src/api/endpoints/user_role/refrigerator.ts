import { api } from '../../client';
import { settings } from '../../../config';
import type {
  RefrigeratorCreate,
  RefrigeratorCreateResponse,
  RefrigeratorResponse,
  RefrigeratorDelete,
} from '../../models/refrigerator';

export const refrigeratorApi = {
  getById: (ingredient_id: number) =>
    api.get<RefrigeratorResponse>(`${settings.REFRIGERATOR_ENDPOINT}`, { ingredient_id }),

  getAll: () => api.get<RefrigeratorResponse[]>(`${settings.REFRIGERATOR_ENDPOINT}`),

  create: (data: RefrigeratorCreate) =>
    api.post<RefrigeratorCreateResponse>(`${settings.REFRIGERATOR_ENDPOINT}`, data),

  delete: (ingredient_id: number) =>
    api.delete<RefrigeratorDelete>(`${settings.REFRIGERATOR_ENDPOINT}`, { ingredient_id }),
};

