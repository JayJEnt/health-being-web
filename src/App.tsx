import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.tsx";
import Home from "./pages/Home.tsx";
import RecipePage from "./pages/Recipe.tsx";
import RecipePageAdmin from "./pages/RecipeAdmin.tsx";
import RecipeSubmitPage from "./pages/RecipeSubmitPage.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import LoginPage from "./pages/Login.tsx";
import RegisterPage from "./pages/Register.tsx";
function App() {
    const isAdmin = true;
    return (
        <div className={`grid grid-cols-[auto_1fr] gap-4 min-h-screen`}>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/recipe/:id"
                    element={isAdmin ? <RecipePageAdmin /> : <RecipePage />}
                />
                <Route path="/recipe/submit" element={<RecipeSubmitPage />} />
                <Route path="/user" element={<UserProfile />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </div>
    );
}

export default App;
