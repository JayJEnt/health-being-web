import { useEffect, useState } from "react";

import { ingredientRefrigeratorApi } from "../../api/endpoints/user_role/ingredient_refrigerator";
import type { IngredientQuantity } from "../../api/models/ingredient";
import type {
	IngredientRefrigeratorCreate,
	IngredientRefrigeratorResponse,
} from "../../api/models/ingredient_refrigerator";
import IngredientsInput from "../Ingredients/IngredientsInput";

const Fridge: React.FC = () => {
	const [productsList, setProductsList] = useState<IngredientRefrigeratorResponse[]>([]);

	useEffect(() => {
		async function fetchProductsList() {
			try {
				const fetchResponse = await ingredientRefrigeratorApi.getAll();
				setProductsList(fetchResponse);
			} catch (err) {
				console.log(err);
			}
		}
		void fetchProductsList();
	}, []);

	const onAdd = async (ingredient: IngredientQuantity) => {
		const payload: IngredientRefrigeratorCreate = {
			name: ingredient.name.trim(),
			amount: ingredient.amount,
			measure_unit: ingredient.measure_unit,
		};
		const created = await ingredientRefrigeratorApi.create(payload);
		if (created) {
			setProductsList((prev) => [
				...prev,
				{
					name: created.name,
					amount: created.amount,
					measure_unit: created.measure_unit,
					ingredient_id: created.id,
				},
			]);
		}
	};

	const onDelete = async (index: number) => {
		const target = productsList[index];
		if (!target) return;
		const ok = await ingredientRefrigeratorApi.delete(target.ingredient_id);
		if (ok) {
			setProductsList((prev) => prev.filter((_, i) => i !== index));
		}
	};

	return (
		<div className="border w-60 lg:col-start-2 p-2">
			<div className="flex flex-col gap-2 mt-4">
				<IngredientsInput items={productsList} onAdd={onAdd} onDelete={onDelete} />
			</div>
		</div>
	);
};

export default Fridge;
