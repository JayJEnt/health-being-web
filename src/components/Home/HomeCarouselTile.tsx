type HomeCarouselTileProps = {
	img: string;
	name: string;
	kcal: number;
};

const HomeCarouselTile: React.FC<HomeCarouselTileProps> = ({ img, name, kcal }) => {
	return (
		<div
			className="flex flex-col w-48 rounded-lg border
            bg-light-carousel-tile-bg dark:bg-dark-carousel-tile-bg"
		>
			<img
				className="w-auto rounded-lg 
                border border-amber-300"
				src={img}
				alt="Recipe"
			/>
			<span
				className="
            text-light-main-text dark:text-dark-main-text"
			>
				{name}
			</span>
			<span>{kcal} kcal</span>
		</div>
	);
};

export default HomeCarouselTile;
