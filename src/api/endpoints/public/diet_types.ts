import { api } from "../../client";
import { settings } from "../../../config";
import type { DietTypeResponse } from "../../models/diet_type";

let dietTypesCache: DietTypeResponse[] | null = null;
let dietTypesCachePromise: Promise<DietTypeResponse[]> | null = null;

export const dietTypeApi = {
  getByName: (diet_name: string, signal?: AbortSignal) =>
    api.get<DietTypeResponse>(
      `${settings.DIET_TYPES_ENDPOINT}`,
      { diet_name },
      { signal }
    ),

  getById: (id: number) =>
    api.get<DietTypeResponse>(`${settings.DIET_TYPES_ENDPOINT}`, { id }),

  getAll: () => {
    if (dietTypesCache) {
      return Promise.resolve(dietTypesCache);
    }
    if (dietTypesCachePromise) {
      return dietTypesCachePromise;
    }
    dietTypesCachePromise = api
      .get<DietTypeResponse[]>(`${settings.DIET_TYPES_ENDPOINT}`)
      .then((data) => {
        dietTypesCache = data;
        dietTypesCachePromise = null;
        return data;
      });
    return dietTypesCachePromise;
  },

  _clearCache: () => {
    dietTypesCache = null;
    dietTypesCachePromise = null;
  },
};
