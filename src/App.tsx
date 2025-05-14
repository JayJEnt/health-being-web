import { useState } from "react";
import { PageProvider } from "./hooks/PageContext.tsx"; //Provider for usePage Hook
import NavBar from "./components/NavBar/NavBar.tsx"; // NavBar Component
import Home from "./components/Home/Home.tsx"; // HomePageComponent

function App() {
	const [theme, setTheme] = useState("light"); //variable to change theme from light to dark mode
	return (
		<PageProvider>
			<div className={`${theme} grid grid-cols-[auto_1fr] gap-4 min-h-screen`}>
				<NavBar />
				<Home />
			</div>
		</PageProvider>
	);
}

export default App;
