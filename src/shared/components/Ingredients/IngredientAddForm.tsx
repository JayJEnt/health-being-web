import { useMemo, useState } from "react";

import { ApiError } from "../../api/client";
import type { MeasureUnit } from "../../api/models/enum_utils";
import { MeasureUnit as MU } from "../../api/models/enum_utils";
import type { IngredientQuantity } from "../../api/models/ingredient";
import IngredientPicker, { type IngredientSelection } from "../Ingredients/IngredientPicker";

type IngredientsAddFormProps = {
	onAdd: (row: IngredientQuantity) => void | Promise<void>;
	onError?: (msg: string | null) => void;
};

export function IngredientsAddForm({ onAdd, onError }: IngredientsAddFormProps) {
	const [selection, setSelection] = useState<IngredientSelection>({
		ingredient: null,
		name: "",
		amount: 0,
		measure_unit: MU.unit as MeasureUnit,
	});

	const [adding, setAdding] = useState(false);

	const canAdd = useMemo(
		() => !!selection.ingredient && Number.isFinite(selection.amount) && selection.amount > 0,
		[selection.ingredient, selection.amount],
	);

	const handleAdd = async (): Promise<void> => {
		if (!canAdd || adding) return;

		setAdding(true);
		onError?.(null);

		const row: IngredientQuantity = {
			name: selection.name.trim(),
			amount: selection.amount,
			measure_unit: selection.measure_unit,
		};

		try {
			await onAdd(row);
			setSelection({
				ingredient: null,
				name: "",
				amount: 0,
				measure_unit: MU.unit as MeasureUnit,
			});
		} catch (err: unknown) {
			const msg = err instanceof ApiError ? err.message : "Unexpected error";
			onError?.(msg);
		} finally {
			setAdding(false);
		}
	};

	return (
		<div>
			<IngredientPicker value={selection} onChange={setSelection} disabled={adding} />

			<button
				type="button"
				disabled={!canAdd || adding}
				onClick={() => void handleAdd()}
				className={`mt-2 px-4 py-2 rounded text-white ${
					!canAdd || adding ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
				}`}
				aria-busy={adding}
			>
				{adding ? "Adding…" : "Add"}
			</button>
		</div>
	);
}
