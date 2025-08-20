import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.tsx";
import Home from "./pages/Home.tsx";
import RecipePage from "./pages/Recipe.tsx";
import RecipePageAdmin from "./pages/RecipeAdmin.tsx";
import RecipeSubmitPage from "./pages/RecipeSubmitPage.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import LoginPage from "./pages/Login.tsx";
import RegisterPage from "./pages/Register.tsx";
import UsersList from "./pages/UsersList.tsx";
import { useAuth } from "./auth/useAuth.ts";
function App() {
    const { user, status } = useAuth();
    const isAuthenticated = status === "authenticated";
    const isAdmin = user?.role === "admin";

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return (
        <div className={`grid grid-cols-[auto_1fr] gap-4 min-h-screen`}>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/recipe/:id"
                    element={isAdmin ? <RecipePageAdmin /> : <RecipePage />}
                />
                <Route
                    path="/recipe/submit"
                    element={isAuthenticated ? <RecipeSubmitPage /> : <LoginPage />}
                />
                <Route
                    path="/user"
                    element={isAuthenticated ? <UserProfile /> : <LoginPage />}
                />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/users_list" element={<UsersList />} />
            </Routes>
        </div>
    );
}

export default App;
