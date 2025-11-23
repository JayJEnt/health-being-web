import { settings } from "../../../config";
import { api } from "../../client";

export const imagesApi = {
	download: (recipe_id: string) =>
		api.download<Blob>(`${settings.IMAGES_DOWNLOAD_ENDPOINT}`, { recipe_id }),
};
