import { useEffect, useState } from "react";

import Fridge from "../features/fridge/Fridge.tsx";
import HomeCarousel from "../features/home/HomeCarousel.tsx";

import { tokenDataApi } from "../shared/api/endpoints/user_role/token_data.ts";
import type { User } from "../shared/api/models/user.ts";

const Home: React.FC = () => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await tokenDataApi.getUser();
				setUser(response);
			} catch (error) {
				console.error("Failed to fetch user:", error);
			}
		};

		void fetchUser();
	}, []);

	return (
		<div className="flex p-20">
			<div>
				<h1
					className="lg:text-5xl
            text-light-main-text dark:bg-dark-main-text "
				>
					Welcome, {user ? `${user.name.charAt(0).toUpperCase()}${user.name.slice(1)}!` : ""}
				</h1>

				<div className="p-20">
					<h2>Favourite recipes</h2>
					<HomeCarousel /** there will be api link passed down as an argument**/ />

					<span>Recently cooked</span>
					<HomeCarousel /** there will be api link passed down as an argument**/ />

					<span>From your igredients</span>
					<HomeCarousel /** there will be api link passed down as an argument**/ />
				</div>
			</div>

			{/* Right: Fridge */}
			<div className="ml-auto flex flex-row gap-4 items-center">
				<Fridge />
			</div>
		</div>
	);
};

export default Home;
