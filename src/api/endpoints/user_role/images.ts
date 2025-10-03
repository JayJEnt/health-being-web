import { api } from "../../client";
import { settings } from "../../../config";


export const imagesApi = {
  upload: (recipe_id: string, form: FormData) =>
    api.postMultipart<Blob>(`${settings.IMAGES_DOWNLOAD_ENDPOINT}`, form, { recipe_id }),
};