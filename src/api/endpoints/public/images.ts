import { api } from "../../client";
import { settings } from "../../../config";


export const imagesApi = {
  download: (recipe_id: string) =>
    api.download<Blob>(`${settings.IMAGES_DOWNLOAD_ENDPOINT}`, { recipe_id }),
};