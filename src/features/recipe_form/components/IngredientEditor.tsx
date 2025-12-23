import { useState } from "react";

import IngredientList from "../../../shared/components/Ingredient_MOD/IngredientList";
import MeasureUnitSelect from "../../../shared/components/Select/MeasureUnitSelect";

import type { IngredientQuantity } from "../../../shared/models/ingredient";
import type { MeasureUnit } from "../../../shared/models/enum_utils";
import GenericButton from "../../../shared/components/Generic/Button";
import IngredientSearchInput from "../../../shared/components/Ingredient_MOD/IngredientSearchInput";

type IngredientEditFormProps = {
	ingredientList: IngredientQuantity[];
	onChange: (ingredientList: IngredientQuantity[]) => void;
};

const IngredientEditForm: React.FC<IngredientEditFormProps> = ({ ingredientList, onChange }) => {
    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [measureUnit, setMeasureUnit] = useState<MeasureUnit>("");

	const addIngredient = (ingredient: IngredientQuantity) => {
		onChange([...ingredientList, ingredient]);
	};

	const removeIngredient = (index: number) => {
		onChange(ingredientList.filter((_, i) => i !== index));
	};

	return (
		<div>
			<h2 className="text-xl font-semibold mb-2">Ingredients</h2>

			<IngredientList ingredientList={ingredientList} onRemove={removeIngredient} />

			<div className="mt-3">
				<IngredientSearchInput onSelect={setName} />

                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-xs sm:text-sm font-medium text-slate-700" htmlFor="amount">
                        Amount
                    </label>
                    <input
                        type="number"
                        placeholder="e.g. 500"
                        value={Number.isFinite(amount) ? amount : 0}
                        onChange={(e) => setAmount(Number(e.target.value))}
                    />
                </div>

                <MeasureUnitSelect
                    value={{ measureUnit: measureUnit }}
                    onSelect={(e) => setMeasureUnit(e.target.value as MeasureUnit)}
                />

                <GenericButton
                    type="add"
                    onClick={() => addIngredient({ name, amount, measure_unit: measureUnit })}
                >
                    Add Ingredient
                </GenericButton>
			</div>
		</div>
	);
};

export default IngredientEditForm;
