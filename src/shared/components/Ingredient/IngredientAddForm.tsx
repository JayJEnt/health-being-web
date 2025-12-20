import { useMemo, useState } from "react";

import { ApiError } from "../../api/client";
import type { MeasureUnit } from "../../models/enum_utils";
import { MeasureUnit as MU } from "../../models/enum_utils";
import type { IngredientQuantity } from "../../models/ingredient";
import IngredientPicker, { type IngredientSelection } from "./IngredientPicker";

type Variant = "default" | "fridge";

type VariantStyles = {
	wrapper: string;
	title?: string;
	form: string;
	button: string;
};

const VARIANT_STYLES: Record<Variant, VariantStyles> = {
	default: {
		wrapper: "",
		title: undefined,
		form: "flex flex-col gap-3",
		button:
			"mt-2 px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed",
	},
	fridge: {
		wrapper: "",
		title: "text-sm sm:text-base font-semibold mb-4 text-center text-slate-800",
		form: "flex flex-col gap-3",
		button:
			"mt-2 w-full px-4 py-2.5 rounded-md text-sm sm:text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-[0_2px_4px_rgba(16,185,129,.4)]",
	},
};

type IngredientsAddFormProps = {
	onAdd: (row: IngredientQuantity) => void | Promise<void>;
	onError?: (msg: string | null) => void;
	variant?: Variant;
	className?: string;
};

export function IngredientsAddForm({
	onAdd,
	onError,
	variant = "default",
	className = "",
}: IngredientsAddFormProps) {
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

	const styles = VARIANT_STYLES[variant];

	return (
		<div className={`${styles.wrapper} ${className}`}>
			{styles.title && <h3 className={styles.title}>Add New Ingredient</h3>}

			<div className={styles.form}>
				<IngredientPicker
					value={selection}
					onChange={setSelection}
					disabled={adding}
					variant={variant}
				/>

				<button
					type="button"
					disabled={!canAdd || adding}
					onClick={() => void handleAdd()}
					className={styles.button}
					aria-busy={adding}
				>
					{adding ? "Adding…" : "Add Ingredient"}
				</button>
			</div>
		</div>
	);
}
