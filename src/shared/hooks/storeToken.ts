import { settings } from "../config";

export const storeToken = (token: string): void => {
	try {
		localStorage.setItem(
			settings.AUTH_TOKEN_KEY,
			JSON.stringify({
				access_token: token,
				token_type: "Bearer",
			}),
		);
	} catch (err) {
		throw new Error(`Failed to store token, ERROR: ${(err as Error).message}`);
	}
};
