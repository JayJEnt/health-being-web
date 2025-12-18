import { useState } from "react";

import { ApiError } from "../../api/client";
import type { IngredientQuantity } from "../../models/ingredient";
import { IngredientsAddForm } from "../Ingredients/IngredientAddForm";
import IngredientsList from "../Ingredients/IngredientsList";

type Props = {
	items: IngredientQuantity[];
	onAdd: (row: IngredientQuantity) => void | Promise<void>;
	onDelete: (index: number, row: IngredientQuantity) => void | Promise<void>;
	title?: string;
};

export default function IngredientsInput({ items, onAdd, onDelete, title = "Ingredients" }: Props) {
	const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	const handleDelete = async (index: number): Promise<void> => {
		if (deletingIndex !== null) return;
		const row = items[index];
		if (!row) return;

		setDeletingIndex(index);
		setErrorMsg(null);

		try {
			await onDelete(index, row);
		} catch (err: unknown) {
			setErrorMsg(err instanceof ApiError ? err.message : "Unexpected error");
		} finally {
			setDeletingIndex(null);
		}
	};

	return (
		<div>
			<IngredientsList
				items={items}
				onDelete={(i) => void handleDelete(i)}
				deletingIndex={deletingIndex}
				title={title}
			/>

			<IngredientsAddForm onAdd={onAdd} onError={setErrorMsg} />

			{errorMsg && <div className="mt-2 text-sm text-red-600">{errorMsg}</div>}
		</div>
	);
}
