import { useEffect, useState } from "react";

import { ingredientRefrigeratorApi } from "../../shared/api/endpoints/user_role/ingredient_refrigerator";
import type { IngredientQuantity } from "../../shared/api/models/ingredient";
import type {
	IngredientRefrigeratorCreate,
	IngredientRefrigeratorResponse,
} from "../../shared/api/models/ingredient_refrigerator";
import IngredientsInput from "../../shared/components/Inputs/IngredientsInput";

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
		<div className="w-full flex justify-center py-6 bg-white">
			<IngredientsInput items={productsList} onAdd={onAdd} onDelete={onDelete} />

			<div className="flex items-start gap-0">
				{/* ================= KOMORA ================= */}
				<div className="relative w-[376px] h-[646px] mr-[-14px] z-20">
					{/* GÓRNA BELKA */}
					<div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 w-[360px] h-6 bg-gradient-to-b from-slate-900 to-slate-800 shadow-[0_8px_16px_rgba(0,0,0,.45)]">
						<div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/25" />
					</div>
					{/* KORPUS */}
					<div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-[348px] h-[620px] bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 border-l-4 border-r-4 border-slate-600 shadow-2xl overflow-hidden">
						<div className="absolute inset-2 bg-gradient-to-br from-slate-300 to-slate-200 shadow-[inset_0_10px_18px_rgba(0,0,0,.20)]" />
						<div className="absolute inset-[12px] bg-gradient-to-br from-slate-200 to-slate-100 border border-slate-300 shadow-[inset_0_8px_14px_rgba(0,0,0,.16)]" />
					</div>
					{/* DOLNA BELKA */}
					<div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 w-[360px] h-8">
						<div className="absolute inset-x-0 top-0 h-9 bg-gradient-to-t from-slate-900 to-slate-800 shadow-[0_-10px_18px_rgba(0,0,0,.5)]">
							<div className="absolute inset-x-0 top-[6px] h-[2px] bg-black/30" />
							<div className="absolute inset-x-0 top-[10px] h-[2px] bg-white/20" />
						</div>
						{/* nóżki */}
						<div className="absolute left-7 -bottom-[16px] w-8 h-[32px] bg-slate-900 shadow-[0_6px_10px_rgba(0,0,0,.55)]" />
						<div className="absolute right-7 -bottom-[16px] w-8 h-[32px] bg-slate-900 shadow-[0_6px_10px_rgba(0,0,0,.55)]" />
					</div>
				</div>
				{/* =============== ZAWIAS =============== */}
				<div className="relative w-[10px] h-[620px] mt-[6px] z-0">
					<div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-500 to-slate-800 shadow-[inset_0_0_8px_rgba(0,0,0,.45)]" />
				</div>
				{/* ================= DRZWI ================= */}
				<div className="relative w-[348px] h-[620px] mt-[6px] ml-[-2px] z-30 bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 border-4 border-slate-600 shadow-2xl overflow-hidden">
					<div className="absolute inset-2 bg-gradient-to-br from-slate-300 to-slate-200 shadow-[inset_0_10px_18px_rgba(0,0,0,.20)]" />
				</div>
			</div>
		</div>
	);
};

export default Fridge;
