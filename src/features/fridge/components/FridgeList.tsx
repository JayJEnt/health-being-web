import CancelButton from "../../../shared/components/Buttons/CancelButton";
import type { IngredientQuantity } from "../../../shared/models/ingredient";

type FridgeListProps = {
	ingredientList: IngredientQuantity[];
	onRemove: (index: number) => void;
};

const FridgeList: React.FC<FridgeListProps> = ({ ingredientList, onRemove }) => {
	return (
		<div className="space-y-2 pt-1">
			{ingredientList.map((ingredient, index) => (
				<span
					key={ingredient.name}
					className="flex items-center justify-between text-sm px-4 py-2 rounded-lg bg-white shadow-[0_1px_4px_rgba(15,23,42,.25)]"
				>
					<span className="font-medium truncate">{ingredient.name}</span>

					<span className="ml-auto mr-3 whitespace-nowrap">
						{ingredient.amount} {ingredient.measure_unit}
					</span>

					<CancelButton onClick={() => onRemove(index)} />
				</span>
			))}
		</div>
	);
};

export default FridgeList;
