import CancelButton from "../../../../shared/components/Buttons/CancelButton";
import type { IngredientQuantity } from "../../../../shared/models/ingredient";

type IngredientEditorListProps = {
	ingredientList: IngredientQuantity[];
	onRemove: (index: number) => void;
};

const IngredientEditorList: React.FC<IngredientEditorListProps> = ({
	ingredientList,
	onRemove,
}) => {
	return (
		<div className="flex flex-wrap gap-2">
			{ingredientList.map((ingredient, index) => (
				<span
					key={ingredient.name}
					className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
				>
					{ingredient.name} {ingredient.amount} {ingredient.measure_unit}
					<CancelButton onClick={() => onRemove(index)} />
				</span>
			))}
		</div>
	);
};

export default IngredientEditorList;
