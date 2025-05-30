import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.tsx"; // NavBar Component
import Home from "./components/Home/Home.tsx"; // HomePageComponent
import RecipePage from "./components/Recipe/Recipe.tsx";

function App() {
	//@ts-ignore
	const [theme, setTheme] = useState("light"); //variable to change theme from light to dark mode
	return (
		<div className={`${theme} grid grid-cols-[auto_1fr] gap-4 min-h-screen`}>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/recipe/:id" element={<RecipePage />} />
			</Routes>
		</div>
	);
}

export default App;
