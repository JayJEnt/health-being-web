import { useEffect, useState } from "react";

import Fridge from "../features/fridge/Fridge.tsx";
import HomeCarousel from "../features/home/HomeCarousel.tsx";

import { tokenDataApi } from "../shared/api/endpoints/user_role/token_data.ts";
import type { User } from "../shared/models/user.ts";

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
		<div className="flex flex-col xl:flex-row p-4 sm:p-6 lg:p-20 gap-8 xl:gap-12">
			<div className="w-full xl:w-1/2">
				<h1
					className="
						text-2xl sm:text-3xl lg:text-5xl font-semibold
						text-light-main-text dark:text-dark-main-text
					"
				>
					Welcome, {user ? `${user.name.charAt(0).toUpperCase()}${user.name.slice(1)}!` : ""}
				</h1>

				<div className="mt-6 sm:mt-8 lg:mt-10 p-0 sm:p-4 lg:p-8 space-y-8">
					<section>
						<h2 className="text-lg sm:text-xl font-semibold mb-3">Favourite recipes</h2>
						<HomeCarousel />
					</section>

					<section>
						<span className="block text-base sm:text-lg font-semibold mb-3">Recently cooked</span>
						<HomeCarousel />
					</section>

					<section>
						<span className="block text-base sm:text-lg font-semibold mb-3">
							From your ingredients
						</span>
						<HomeCarousel />
					</section>
				</div>
			</div>

			<div className="w-full xl:w-1/2 flex justify-center xl:justify-end items-center">
				<Fridge />
			</div>
		</div>
	);
};

export default Home;
