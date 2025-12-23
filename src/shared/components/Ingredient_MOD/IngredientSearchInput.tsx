import { useState } from "react";

import { ingredientApi } from "../../api/endpoints/public/ingredient";
import { useDebouncedSearch } from "../../hooks/useDebounceSearchParams";

import type { IngredientResponse } from "../../models/ingredient";
import GenericButton from "../Generic/Button";

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
				placeholder="Search ingredient..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="w-full border rounded px-3 py-2"
			/>
			{loading && (
				<div className="absolute top-full left-0 mt-1 text-sm text-gray-500">Loading...</div>
			)}
			{error && (
				<div className="absolute top-full left-0 mt-1 text-sm text-red-500">Error occurred!</div>
			)}
			{!loading && !error && results.length === 0 && query.trim() && (
				<div className="px-3 py-2 text-sm text-gray-500">No results</div>
			)}
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
		</div>
	);
};

export default IngredientSearchInput;
