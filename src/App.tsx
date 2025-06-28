import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.tsx"; // NavBar Component
import Home from "./components/Home/Home.tsx"; // HomePageComponent
import RecipePage from "./components/Recipe/Recipe.tsx";
import RecipeSubmitPage from "./components/Recipe/RecipeSubmitPage.tsx";
import UserProfile from "./components/User/UserProfile.tsx";
function App() {
  return (
    <div className={`grid grid-cols-[auto_1fr] gap-4 min-h-screen`}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/recipe/submit" element={<RecipeSubmitPage />} />
        <Route path="/user" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
