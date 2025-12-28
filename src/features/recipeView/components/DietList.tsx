import type { DietCreate } from "../../../shared/models/diet";

type DietListProps = {
	dietList: DietCreate[] | null | undefined;
};

const DietList: React.FC<DietListProps> = ({ dietList }) => {
	if (!dietList) return;
	return (
		<div>
			<h2 className="text-xl font-semibold mb-2">Diets</h2>

			<ul className="flex flex-wrap gap-2">
				{dietList.map((diet) => (
					<li
						key={diet.name}
						className="px-3 py-1 bg-green-100 dark:bg-green-800 text-sm rounded-full"
					>
						{diet.name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default DietList;
