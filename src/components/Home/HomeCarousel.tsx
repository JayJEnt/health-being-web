import HomeCarouselTile from "./HomeCarouselTile";
import TilesArray from "./TilesArray.ts";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
const HomeCarousel: React.FC = () => {
	const [currentTile, setCurrentTile] = useState(0);
	const tilesArray = TilesArray;
	const carouselTiles = [
		tilesArray[(currentTile - 1 + tilesArray.length) % tilesArray.length],
		tilesArray[currentTile],
		tilesArray[(currentTile + 1) % tilesArray.length],
	];

	const handleCarouselLeft = () => {
		setCurrentTile(
			(prev) => (prev - 1 + tilesArray.length) % tilesArray.length
		);
	};

	const handleCarouselRight = () => {
		setCurrentTile((prev) => (prev + 1) % tilesArray.length);
	};
	return (
		<div className="flex flex-row gap-4">
			<ArrowLeftIcon onClick={() => handleCarouselLeft()} className="h-6" />
			{carouselTiles.map((tile, index) => (
				<HomeCarouselTile
					key={index}
					img={tile.img}
					name={tile.name}
					kcal={tile.kcal}
				/>
			))}
			<ArrowRightIcon onClick={() => handleCarouselRight()} className="h-6" />
		</div>
	);
};

export default HomeCarousel;
