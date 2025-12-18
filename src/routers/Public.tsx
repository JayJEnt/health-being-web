import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/authorization/Login.tsx";
import RegisterPage from "../pages/authorization/Register.tsx";
import EmailCallbackPage from "../pages/callback/EmailCallback.tsx";
import GoogleCallbackPage from "../pages/callback/GoogleCallback.tsx";
import Home from "../pages/Home.tsx";
import RecipePage from "../pages/Recipe.tsx";
import RecipesSearch from "../pages/RecipesSearch.tsx";

function PublicRoutes() {
	return (
		<Routes>
			{/* Root route */}
			<Route index element={<Home />} />

			{/* Recipe routes */}
			<Route path="search/:phrase" element={<RecipesSearch />} />
			<Route path="recipe/:id" element={<RecipePage />} />

			{/* Callback routes */}
			<Route path="email_callback" element={<EmailCallbackPage />} />
			<Route path="google_callback" element={<GoogleCallbackPage />} />

			{/* Authorization routes */}
			<Route path="login" element={<LoginPage />} />
			<Route path="register" element={<RegisterPage />} />
		</Routes>
	);
}

export default PublicRoutes;
