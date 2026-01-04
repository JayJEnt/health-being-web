import { useState } from "react";

import { ingredientApi } from "../../api/endpoints/public/ingredient";
import { useDebouncedSearch } from "../../hooks/useDebounceSearchParams";

import type { IngredientResponse } from "../../models/ingredient";
import { AsyncState } from "../AsyncState/AsyncState";
import GenericButton from "../Buttons/Button";

type IngredientSearchInputProps = {
	onSelect: (name: string) => void;
};

const IngredientSearchInput: React.FC<IngredientSearchInputProps> = ({ onSelect }) => {
	const [query, setQuery] = useState("");

	const { data, loading, error } = useDebouncedSearch<IngredientResponse[] | null>({
		query: query.trim(),
		fetcher: ingredientApi.getByPhrase,
	});

	const results: IngredientResponse[] = data ?? [];

	const handleSelect = (ingredient: IngredientResponse) => {
		onSelect(ingredient.name);
		setQuery("");
	};

	return (
		<div className="relative">
			<input
				type="text"
				placeholder="Search ingredients..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white shadow-[0_1px_2px_rgba(15,23,42,.15)] focus:outline-none focus:ring-1 focus:ring-black focus:border-black disabled:bg-slate-100"
			/>
			<AsyncState
				isLoading={loading}
				hasNoResults={!!(results.length === 0 && query.trim())}
				error={error}
			>
				{results.length > 0 && (
					<ul className="absolute top-full left-0 mt-1 w-full border rounded bg-white max-h-48 overflow-y-auto z-10">
						{results.map((ingredient) => (
							<GenericButton
								key={ingredient.name}
								className="block w-full text-left px-3 py-2 hover:bg-gray-100"
								onClick={() => handleSelect(ingredient)}
							>
								{ingredient.name}
							</GenericButton>
						))}
					</ul>
				)}
			</AsyncState>
		</div>
	);
};

export default IngredientSearchInput;
