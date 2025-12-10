import { useEffect, useState } from "react";

import { ingredientRefrigeratorApi } from "../../shared/api/endpoints/user_role/ingredient_refrigerator";
import type { IngredientQuantity } from "../../shared/api/models/ingredient";
import type {
	IngredientRefrigeratorCreate,
	IngredientRefrigeratorResponse,
} from "../../shared/api/models/ingredient_refrigerator";
import { IngredientsAddForm } from "../../shared/components/Ingredients/IngredientAddForm";
import IngredientsList from "../../shared/components/Ingredients/IngredientsList";

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
			<IngredientsList items={productsList} onDelete={onDelete} />
			<IngredientsAddForm onAdd={onAdd} />
			<div className="w-full max-w-[760px] px-2 sm:px-4 lg:px-0 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-2 lg:gap-0">
				{/* ================= KOMORA ================= */}
				<div className="relative w-[260px] sm:w-[320px] md:w-[348px] lg:w-[376px] h-[480px] sm:h-[560px] md:h-[620px] lg:h-[646px] lg:mr-[-14px] z-20 scale-95 sm:scale-100">
					{/* GÓRNA BELKA */}
					<div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-[360px] h-6 bg-gradient-to-b from-slate-900 to-slate-800 shadow-[0_8px_16px_rgba(0,0,0,.45)]">
						<div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/25" />
					</div>

					{/* KORPUS */}
					<div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-[348px] h-[calc(100%-32px)] bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 border-l-4 border-r-4 border-slate-600 shadow-2xl overflow-hidden">
						<div className="absolute inset-2 bg-gradient-to-br from-slate-300 to-slate-200 shadow-[inset_0_10px_18px_rgba(0,0,0,.20)]" />
						<div className="absolute inset-[10px] sm:inset-[12px] bg-gradient-to-br from-slate-200 to-slate-100 border border-slate-300 shadow-[inset_0_8px_14px_rgba(0,0,0,.16)]">
							{/* Górna półka */}
							<div className="absolute top-[12px] sm:top-[16px] left-3 right-3 h-[100px] sm:h-[120px] md:h-[140px] bg-gradient-to-b from-slate-100 to-slate-200 border-2 border-white rounded-lg shadow-lg" />

							{/* Separator 1 */}
							<div className="absolute top-[122px] sm:top-[144px] md:top-[164px] left-2 right-2 h-3 bg-gradient-to-b from-slate-300 to-slate-200 shadow-md" />

							{/* Środkowa sekcja z szufladami */}
							<div className="absolute top-[138px] sm:top-[160px] md:top-[180px] left-3 right-3 h-[110px] sm:h-[130px] md:h-[140px] bg-gradient-to-b from-slate-100 to-slate-200 border-2 border-white rounded-lg shadow-lg">
								{/* Kontener na dwie małe szuflady */}
								<div className="absolute bottom-2 left-3 right-3 flex justify-between gap-2">
									{/* Lewa szuflada */}
									<div className="w-[48%] h-[60px] sm:h-[80px] md:h-[100px] bg-gradient-to-br from-slate-200 to-slate-100 border-2 border-white rounded-lg shadow-md relative">
										<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 sm:w-12 md:w-14 h-4 sm:h-5 bg-slate-300 rounded-full border border-slate-400 shadow-inner" />
									</div>

									{/* Prawa szuflada */}
									<div className="w-[48%] h-[60px] sm:h-[80px] md:h-[100px] bg-gradient-to-br from-slate-200 to-slate-100 border-2 border-white rounded-lg shadow-md relative">
										<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 sm:w-12 md:w-14 h-4 sm:h-5 bg-slate-300 rounded-full border border-slate-400 shadow-inner" />
									</div>
								</div>
							</div>

							{/* Separator 2 */}
							<div className="absolute top-[260px] sm:top-[300px] md:top-[328px] left-2 right-2 h-3 bg-gradient-to-b from-slate-300 to-slate-200 shadow-md" />

							{/* Dolna duża szuflada */}
							<div className="absolute top-[282px] sm:top-[320px] md:top-[350px] left-3 right-3 bottom-3 bg-gradient-to-br from-slate-200 to-slate-100 border-2 border-white rounded-lg shadow-lg">
								<div className="absolute top-[34px] sm:top-[44px] md:top-[50px] left-1/2 -translate-x-1/2 w-20 sm:w-24 h-6 sm:h-7 bg-slate-300 rounded-full border border-slate-400 shadow-inner" />
							</div>
						</div>
					</div>

					{/* DOLNA BELKA */}
					<div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-[360px] h-8">
						<div className="absolute inset-x-0 top-0 h-9 bg-gradient-to-t from-slate-900 to-slate-800 shadow-[0_-10px_18px_rgba(0,0,0,.5)]">
							<div className="absolute inset-x-0 top-[6px] h-[2px] bg-black/30" />
							<div className="absolute inset-x-0 top-[10px] h-[2px] bg-white/20" />
						</div>
						{/* nóżki */}
						<div className="absolute left-6 sm:left-7 -bottom-[16px] w-7 sm:w-8 h-[28px] sm:h-[32px] bg-slate-900 shadow-[0_6px_10px_rgba(0,0,0,.55)]" />
						<div className="absolute right-6 sm:right-7 -bottom-[16px] w-7 sm:w-8 h-[28px] sm:h-[32px] bg-slate-900 shadow-[0_6px_10px_rgba(0,0,0,.55)]" />
					</div>
				</div>

				{/* =============== ZAWIAS =============== */}
				<div className="relative w-[6px] sm:w-[8px] md:w-[10px] h-[480px] sm:h-[560px] md:h-[620px] mt-[6px] z-0 hidden lg:block">
					<div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-500 to-slate-800 shadow-[inset_0_0_8px_rgba(0,0,0,.45)]" />
				</div>

				{/* ================= DRZWI LODÓWKI ================= */}
				<div className="relative mt-4 lg:mt-[6px] lg:ml-[-2px] z-30 w-[260px] sm:w-[320px] md:w-[348px] h-[480px] sm:h-[560px] md:h-[620px] bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 border-4 border-slate-600 shadow-2xl overflow-hidden">
					<div className="absolute inset-2 bg-gradient-to-br from-slate-300 to-slate-200 shadow-[inset_0_10px_18px_rgba(0,0,0,.20)]">
						<div className="absolute inset-[8px] sm:inset-[10px] bg-gradient-to-br from-slate-100 to-white border-2 border-white rounded-xl shadow-[inset_0_4px_12px_rgba(0,0,0,.12)]">
							{/* PÓŁKI NA DRZWIACH */}

							{/* Górna mała półka */}
							<div className="absolute top-3 left-3 right-3 h-[70px] sm:h-[85px] md:h-[90px] bg-gradient-to-b from-white to-slate-50 border-2 border-slate-200 rounded-lg shadow-md">
								<div className="absolute bottom-0 left-0 right-0 h-7 sm:h-8 bg-gradient-to-b from-slate-100 to-slate-200 border-t-2 border-slate-300 rounded-b-lg" />
							</div>

							{/* Druga półka */}
							<div className="absolute top-[86px] sm:top-[100px] md:top-[108px] left-3 right-3 h-[95px] sm:h-[110px] md:h-[120px] bg-gradient-to-b from-white to-slate-50 border-2 border-slate-200 rounded-lg shadow-md">
								<div className="absolute bottom-0 left-0 right-0 h-7 sm:h-8 bg-gradient-to-b from-slate-100 to-slate-200 border-t-2 border-slate-300 rounded-b-lg" />
							</div>

							{/* Trzecia półka */}
							<div className="absolute top-[188px] sm:top-[225px] md:top-[243px] left-3 right-3 h-[95px] sm:h-[110px] md:h-[120px] bg-gradient-to-b from-white to-slate-50 border-2 border-slate-200 rounded-lg shadow-md">
								<div className="absolute bottom-0 left-0 right-0 h-7 sm:h-8 bg-gradient-to-b from-slate-100 to-slate-200 border-t-2 border-slate-300 rounded-b-lg" />
							</div>

							{/* Dolna duża półka */}
							<div className="absolute top-[290px] sm:top-[350px] md:top-[378px] left-3 right-3 bottom-3 bg-gradient-to-b from-white to-slate-50 border-2 border-slate-200 rounded-lg shadow-md">
								<div className="absolute bottom-0 left-0 right-0 h-7 sm:h-8 bg-gradient-to-b from-slate-100 to-slate-200 border-t-2 border-slate-300 rounded-b-lg" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Fridge;
