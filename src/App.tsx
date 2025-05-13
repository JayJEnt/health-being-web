import { useState } from "react";
import { PageProvider } from "./hooks/PageContext.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";
import Home from "./components/Home/Home.tsx";

function App() {
	const [theme, setTheme] = useState("light");
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
