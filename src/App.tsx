import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.tsx";
import Home from "./pages/Home.tsx";
import RecipePage from "./pages/Recipe.tsx";
import RecipePageAdmin from "./pages/RecipeAdmin.tsx";
import RecipeSubmitPage from "./pages/RecipeSubmitPage.tsx";
import UserProfile from "./pages/UserProfile.tsx";
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
            </Routes>
        </div>
    );
}

export default App;
