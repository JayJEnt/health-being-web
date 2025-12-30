import { useMemo, useState } from "react";
import AddButton from "../../../shared/components/Buttons/AddButton";
import CancelButton from "../../../shared/components/Buttons/CancelButton";
import IngredientSearchInput from "../../../shared/components/SearchInputs/IngredientSearchInput";
import AmountSelect from "../../../shared/components/Selects/AmountSelect";
import MeasureUnitSelect from "../../../shared/components/Selects/MeasureUnitSelect";
import type { MeasureUnit } from "../../../shared/models/enum_utils";
import { MeasureUnit as MeasureUnitValue } from "../../../shared/models/enum_utils";
import type { IngredientQuantity } from "../../../shared/models/ingredient";

type RefrigeAddFormProps = {
	onChange: (ingredient: IngredientQuantity) => void;
};

const RefrigeAddForm: React.FC<RefrigeAddFormProps> = ({ onChange }) => {
	const [ingredientName, setIngredientName] = useState<string>("");
	const [amount, setAmount] = useState<number>(0);
	const [measureUnit, setMeasureUnit] = useState<MeasureUnit>(MeasureUnitValue.unit);

	const [adding, setAdding] = useState(false);
	const canAdd = useMemo(
		() => !!ingredientName && Number.isFinite(amount) && amount > 0,
		[ingredientName, amount],
	);

	const resetStates = () => {
		setIngredientName("");
		setAmount(0);
		setMeasureUnit("");
	};

	const addIngredient = (ingredient: IngredientQuantity) => {
		if (!canAdd || adding) return;

		setAdding(true);
		onChange(ingredient);

		resetStates();
		setAdding(false);
	};

	return (
		<div>
			<h3 className="text-sm sm:text-base font-semibold mb-4 text-center text-slate-800">
				Add New Ingredient
			</h3>

			<div className="flex flex-col gap-3">
				{ingredientName ? (
					<div>
						<label
							className="text-xs sm:text-sm font-medium text-slate-700"
							htmlFor="selected-ingredient"
						>
							Selected ingredient
						</label>

						<div className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white shadow-[0_1px_2px_rgba(15,23,42,.15)] focus:outline-none focus:ring-1 focus:ring-black focus:border-black disabled:bg-slate-100">
							{ingredientName}
							<CancelButton onClick={() => resetStates()} />
						</div>
					</div>
				) : (
					<div>
						<label
							className="text-xs sm:text-sm font-medium text-slate-700"
							htmlFor="search-ingredient"
						>
							Search ingredient
						</label>

						<IngredientSearchInput onSelect={setIngredientName} />
					</div>
				)}

				<div className="grid grid-cols-2 items-center gap-4">
					<AmountSelect amount={amount} onSelect={setAmount} />

					<MeasureUnitSelect
						value={{ measureUnit: measureUnit }}
						onSelect={(e) => setMeasureUnit(e.target.value as MeasureUnit)}
					/>
				</div>

				<AddButton
					disabled={!canAdd || adding}
					onClick={() => addIngredient({ name: ingredientName, amount, measure_unit: measureUnit })}
				/>
			</div>
		</div>
	);
};

export default RefrigeAddForm;
