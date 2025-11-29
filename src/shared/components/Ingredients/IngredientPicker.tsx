import { useCallback, useMemo } from "react";

import { ingredientApi } from "../../api/endpoints/public/ingredient";
import type { MeasureUnit } from "../../api/models/enum_utils";
import { MeasureUnit as MU } from "../../api/models/enum_utils";
import type { Ingredient } from "../../api/models/ingredient";
import { useDebouncedSearch } from "../../hooks/useDebounceSearchParams";

export type IngredientSelection = {
	ingredient: Ingredient | null;
	name: string;
	amount: number;
	measure_unit: MeasureUnit;
};

type Props = {
	value: IngredientSelection;
	onChange: (next: IngredientSelection) => void;
	disabled?: boolean;
};

export default function IngredientPicker({ value, onChange, disabled }: Props) {
	const fetcher = useCallback(async (q: string) => {
		const query = (q ?? "").trim();
		if (!query) return null;
		return ingredientApi.getByPhrase(query);
	}, []);

	const safeQuery = (value.name ?? "").toString();

	const { data, loading, error } = useDebouncedSearch<Ingredient | Ingredient[] | null>({
		query: safeQuery,
		fetcher,
		delay: 300,
		minLength: 1,
	});

	const results: Ingredient[] = useMemo(() => {
		if (!data) return [];
		return Array.isArray(data) ? data : [data];
	}, [data]);

	const onName = (name: string) => onChange({ ...value, name, ingredient: null });

	const onAmount: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const n = e.target.valueAsNumber;
		onChange({ ...value, amount: Number.isNaN(n) ? 0 : n });
	};

	const onUnit: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
		onChange({ ...value, measure_unit: (e.target.value as MeasureUnit) ?? MU.unit });
	};

	const onSelect = (ing: Ingredient) => {
		onChange({ ...value, ingredient: ing, name: ing.name });
	};

	const clear = () => onChange({ ...value, ingredient: null });

	return (
		<div className="flex flex-wrap gap-2 items-center">
			<div className="relative flex-1 min-w-[220px]">
				<input
					type="text"
					placeholder="Search ingredient"
					value={value.name ?? ""}
					onChange={(e) => onName(e.target.value)}
					readOnly={!!value.ingredient}
					disabled={disabled}
					className={`border rounded px-3 py-2 w-full ${value.ingredient ? "bg-gray-100 cursor-default" : ""}`}
				/>
				{value.ingredient && (
					<button
						type="button"
						onClick={clear}
						className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-700 hover:underline"
					>
						Change
					</button>
				)}
			</div>

			<input
				type="number"
				placeholder="Amount"
				value={Number.isFinite(value.amount) ? value.amount : 0}
				onChange={onAmount}
				disabled={disabled}
				className="border rounded px-3 py-2 w-28"
			/>

			<select
				value={value.measure_unit ?? MU.unit}
				onChange={onUnit}
				disabled={disabled}
				className="border rounded px-3 py-2"
			>
				{(Object.values(MU) as MeasureUnit[]).map((u) => {
					const label = u === MU.unit ? "unit" : u.replace(/\.$/, "");
					return (
						<option key={u || "unit"} value={u}>
							{label}
						</option>
					);
				})}
			</select>

			{!value.ingredient && safeQuery.trim() !== "" && (
				<div className="mt-2 border rounded shadow-sm max-h-60 overflow-auto bg-white w-full">
					{loading && <div className="px-3 py-2 text-sm text-gray-500">Loading...</div>}
					{error && <div className="px-3 py-2 text-sm text-red-500">{error.message}</div>}

					{!loading && !error && results.length === 0 && (
						<div className="px-3 py-2 text-sm text-gray-500">No results</div>
					)}

					{results.map((ing) => (
						<button
							key={ing.name}
							type="button"
							onClick={() => onSelect(ing)}
							className="block w-full text-left px-3 py-2 hover:bg-gray-100"
						>
							{ing.name}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
