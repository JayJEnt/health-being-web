import { useState } from "react";
import AddButton from "../../../../shared/components/Buttons/AddButton";
import CancelButton from "../../../../shared/components/Buttons/CancelButton";

import IngredientSearchInput from "../../../../shared/components/SearchInputs/IngredientSearchInput";
import type { MeasureUnit } from "../../../../shared/models/enum_utils";
import { MeasureUnit as MeasureUnitValue } from "../../../../shared/models/enum_utils";
import type { IngredientQuantity } from "../../../../shared/models/ingredient";
import IngredientEditorList from "../Lists/IngredientEditorList";
import AmountSelect from "../Selects/AmountSelect";
import MeasureUnitSelect from "../Selects/MeasureUnitSelect";

type IngredientEditFormProps = {
	ingredientList: IngredientQuantity[];
	onChange: (ingredientList: IngredientQuantity[]) => void;
};

const IngredientEditForm: React.FC<IngredientEditFormProps> = ({ ingredientList, onChange }) => {
	const [ingredientName, setIngredientName] = useState<string>("");
	const [amount, setAmount] = useState<number>(0);
	const [measureUnit, setMeasureUnit] = useState<MeasureUnit>(MeasureUnitValue.unit);

	const resetStates = () => {
		setIngredientName("");
		setAmount(0);
		setMeasureUnit("");
	};

	const addIngredient = (ingredient: IngredientQuantity) => {
		onChange([...ingredientList, ingredient]);
		resetStates();
	};

	const removeIngredient = (index: number) => {
		onChange(ingredientList.filter((_, i) => i !== index));
	};

	return (
		<div>
			<h2 className="text-xl font-semibold mb-2">Ingredients</h2>

			<IngredientEditorList ingredientList={ingredientList} onRemove={removeIngredient} />

			<div className="mt-3">
				{ingredientName ? (
					<div className="grid grid-cols-2 items-center gap-4">
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
						<div className="grid grid-cols-3 items-center gap-4">
							<AmountSelect amount={amount} onSelect={setAmount} />

							<MeasureUnitSelect
								value={{ measureUnit: measureUnit }}
								onSelect={(e) => setMeasureUnit(e.target.value as MeasureUnit)}
							/>

							<AddButton
								onClick={() =>
									addIngredient({ name: ingredientName, amount, measure_unit: measureUnit })
								}
							/>
						</div>
					</div>
				) : (
					<IngredientSearchInput onSelect={setIngredientName} />
				)}
			</div>
		</div>
	);
};

export default IngredientEditForm;
