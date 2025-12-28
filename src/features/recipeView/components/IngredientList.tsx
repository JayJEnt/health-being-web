import type { IngredientQuantity } from "../../../shared/models/ingredient";

type IngredientListProps = {
	ingredientList: IngredientQuantity[];
};

const IngredientList: React.FC<IngredientListProps> = ({ ingredientList }) => {
	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-xl font-semibold">Ingredients</h2>

			<ul className="space-y-3">
				{ingredientList.map((ingredient) => (
					<li key={ingredient.name} className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
						<span className="font-medium">
							{ingredient.name} {ingredient.amount} {ingredient.measure_unit}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default IngredientList;
