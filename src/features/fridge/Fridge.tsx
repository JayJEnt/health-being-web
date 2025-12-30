import { useEffect, useState } from "react";
import { ingredientRefrigeratorApi } from "../../shared/api/endpoints/user_role/ingredient_refrigerator";
import type { IngredientQuantity } from "../../shared/models/ingredient";
import type {
	IngredientRefrigeratorCreate,
	IngredientRefrigeratorResponse,
} from "../../shared/models/ingredient_refrigerator";
import fridgeImage from "./assets/fridge.jpg";
import RefrigeEditForm from "./components/FridgeAddForm";
import FridgeList from "./components/FridgeList";

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
			name: ingredient.name,
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
		<div
			className="relative w-[760px] h-[650px] bg-no-repeat bg-center bg-contain"
			style={{ backgroundImage: `url(${fridgeImage})` }}
		>
			<div className="absolute top-[8%] left-[9%] w-[38%] h-[78%] overflow-y-auto p-2">
				<FridgeList ingredientList={productsList} onRemove={onDelete} />
			</div>

			<div className="absolute top-[12%] right-[10%] w-[34%] h-[70%] overflow-y-auto p-2">
				<RefrigeEditForm onChange={onAdd} />
			</div>
		</div>
	);
};

export default Fridge;
