import { useState } from "react";
import { dietApi } from "../../api/endpoints/public/diet";
import { useDebouncedSearch } from "../../hooks/useDebounceSearchParams";
import type { DietResponse } from "../../models/diet";
import GenericButton from "../Generic/Button";

type DietSearchInputProps = {
	onSelect: (diet: DietResponse) => void;
};

const DietSearchInput: React.FC<DietSearchInputProps> = ({ onSelect }) => {
	const [query, setQuery] = useState("");

	const { data, loading, error } = useDebouncedSearch<DietResponse[] | null>({
		query: query.trim(),
		fetcher: dietApi.getByPhrase,
	});

	const results: DietResponse[] = data ?? [];

	const handleSelect = (diet: DietResponse) => {
		onSelect(diet);
		setQuery("");
	};

	return (
		<div className="relative">
			<input
				type="text"
				placeholder="Search diets..."
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
					{results.map((diet) => (
						<GenericButton
							key={diet.name}
							className="block w-full text-left px-3 py-2 hover:bg-gray-100"
							onClick={() => handleSelect(diet)}
						>
							{diet.name}
						</GenericButton>
					))}
				</ul>
			)}
		</div>
	);
};

export default DietSearchInput;
