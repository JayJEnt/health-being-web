import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.tsx";
import Home from "./pages/Home.tsx";
import RecipePage from "./pages/Recipe.tsx";
import RecipePageAdmin from "./pages/RecipeAdmin.tsx";
import RecipeSubmitPage from "./pages/RecipeSubmitPage.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import LoginPage from "./pages/Login.tsx";
import RegisterPage from "./pages/Register.tsx";
import { useIsAdmin } from "./hooks/useIsAdmin";
import { isLoggedIn } from "./utils";
import UsersList from "./pages/UsersList.tsx";

function App() {
    const { isAdmin, loading } = useIsAdmin();
    const loggedIn = isLoggedIn();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`grid grid-cols-[auto_1fr] gap-4 min-h-screen`}>
            <NavBar loggedIn={loggedIn} isAdmin={isAdmin} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/recipe/:id"
                    element={isAdmin ? <RecipePageAdmin /> : <RecipePage />}
                />
                <Route
                    path="/recipe/submit"
                    element={loggedIn ? <RecipeSubmitPage /> : <LoginPage />}
                />
                <Route
                    path="/user"
                    element={loggedIn ? <UserProfile /> : <LoginPage />}
                />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/users_list" element={<UsersList />} />
            </Routes>
        </div>
    );
}

export default App;
