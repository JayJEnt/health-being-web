import { Route, Routes } from "react-router-dom";

import RecipeSubmitPage from "../pages/recipes/RecipeSubmit.tsx";
import SettingsPage from "../pages/SettingsPage.tsx";
import UserProfile from "../pages/UserProfile.tsx";

function UserRoutes() {
	return (
		<Routes>
			<Route index element={<UserProfile />} />
			<Route path="recipe/submit" element={<RecipeSubmitPage />} />
			<Route path="settings" element={<SettingsPage />} />
		</Routes>
	);
}

export default UserRoutes;
