import * as Icons from "../../assets/icons.ts"; //Icons List
import HomeCarousel from "./HomeCarousel.tsx"; //Carousel Component

const Home: React.FC = () => {
	const user = "Jan"; //Username variable (static for a moment, will be fetech from api later)
	return (
		<div
			className="flex flex-col p-8
        bg-light-main-bg dark:bg-dark-main-bg"
		>
			<div className="flex mb-8 border border-gray-400 rounded-md w-64 h-auto ">
				<Icons.MagnifyingGlassIcon className="w-6 m-2" />
				<input type="text" placeholder="Search a recipe" />
			</div>

			<h1
				className="lg:text-5xl
                text-light-main-text dark:bg-dark-main-text "
			>
				Witaj, {user}
			</h1>

			<div>
				<span>Favourite recipes</span>
				<HomeCarousel />
			</div>
		</div>
	);
};

export default Home;
