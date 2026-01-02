import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import placeholderImage from "../../assets/defaultFood.jpg";

export type RecipeOverviewCardProps = {
	title: string;
	description: string;
	image: string;
	onClick?: () => void; // Potentialy it could be always navigating to itself TBC
};

const RecipeOverviewCard: React.FC<RecipeOverviewCardProps> = ({
	title,
	description,
	image,
	onClick,
}) => {
	const [bgImage, setBgImage] = useState<string>(placeholderImage);

	useEffect(() => {
		const img = new Image();
		img.src = image;

		img.onload = () => setBgImage(image);
		img.onerror = () => setBgImage(placeholderImage);
	}, [image]);

	return (
		<motion.button
			type="button"
			onClick={onClick}
			className="relative w-full text-left overflow-hidden rounded-2xl shadow-lg group"
			initial="rest"
			whileHover="hover"
			animate="rest"
			style={{
				backgroundImage: `url(${bgImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			{/* Dark overlay for readability */}
			<div className="absolute inset-0 bg-black/20" />

			{/* Content */}
			<div className="relative h-full min-h-[280px] p-4 flex items-end">
				<motion.div
					className="text-white"
					variants={{
						rest: { y: 0 },
						hover: { y: -24 },
					}}
					transition={{ duration: 0.3, ease: "easeOut" }}
				>
					<h3 className="text-xl font-semibold leading-tight">{title}</h3>

					<motion.p
						className="mt-2 text-sm text-white/90 max-w-xs"
						variants={{
							rest: { opacity: 0, y: 8 },
							hover: { opacity: 1, y: 0 },
						}}
						transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
					>
						{description}
					</motion.p>
				</motion.div>
			</div>
		</motion.button>
	);
};

export default RecipeOverviewCard;
