import { Route, Routes } from "react-router-dom";
import NavigationBar from "./features/navigation_bar/NavigationBar.tsx";
import ForgotPassPage from "./pages/authorization/ForgotPass.tsx";
import LoginPage from "./pages/authorization/Login.tsx";
import RegisterPage from "./pages/authorization/Register.tsx";
import EmailCallbackPage from "./pages/callback/EmailCallback.tsx";
import ForgotPassCallbackPage from "./pages/callback/ForgotPassCallback.tsx";
import GoogleCallbackPage from "./pages/callback/GoogleCallback.tsx";
import Home from "./pages/Home.tsx";
import RecipePage from "./pages/Recipe.tsx";
import RecipeSubmitPage from "./pages/RecipeSubmit.tsx";
import RecipesSearch from "./pages/RecipesSearch.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import UsersList from "./pages/UsersList.tsx";
import { useAuth } from "./shared/hooks/useAuth.ts";

function App() {
	const { status } = useAuth();
	const isAuthenticated = status === "authenticated";
	// const isAdmin = user?.role === "admin";

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	return (
		<div className="grid grid-cols-[auto_1fr] gap-4 min-h-screen">
			<NavigationBar />
			<main className="pt-16 absolute inset-0">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/search/:phrase" element={<RecipesSearch />} />
					<Route path="/recipe/:id" element={<RecipePage />} />
					<Route
						path="/recipe/submit"
						element={isAuthenticated ? <RecipeSubmitPage /> : <LoginPage />}
					/>
					<Route path="/user" element={isAuthenticated ? <UserProfile /> : <LoginPage />} />

					{/* Callback routes */}
					<Route path="/email_callback/:token" element={<EmailCallbackPage />} />
					<Route path="/google_callback" element={<GoogleCallbackPage />} />
					<Route path="/forgot_password_callback/:token" element={<ForgotPassCallbackPage />} />

					{/* Authorization routes */}
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/forgot_password" element={<ForgotPassPage />} />

					<Route path="/users_list" element={<UsersList />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
