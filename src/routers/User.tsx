import { Route, Routes } from "react-router-dom";

import RecipeSubmitPage from "../pages/recipes/RecipeSubmit.tsx";
import UserProfile from "../pages/UserProfile.tsx";

function UserRoutes() {
	return (
		<Routes>
			<Route index element={<UserProfile />} />
			<Route path="recipe/submit" element={<RecipeSubmitPage />} />
		</Routes>
	);
}

export default UserRoutes;
