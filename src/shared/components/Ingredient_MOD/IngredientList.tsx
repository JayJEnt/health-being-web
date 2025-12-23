import type { IngredientQuantity } from "../../models/ingredient";
import GenericButton from "../Generic/Button";

type IngredientListProps = {
	ingredientList: IngredientQuantity[];
	onRemove: (index: number) => void;
};

const IngredientList: React.FC<IngredientListProps> = ({ ingredientList, onRemove }) => {
	return (
		<div className="flex flex-wrap gap-2">
			{ingredientList.map((ingredient, index) => (
				<span
					key={ingredient.name}
					className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
				>
					{ingredient.name}
					{ingredient.amount}
                    {ingredient.measure_unit}
					<GenericButton type="cancel" onClick={() => onRemove(index)} />
				</span>
			))}
		</div>
	);
};

export default IngredientList;