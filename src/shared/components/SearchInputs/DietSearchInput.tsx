import { useState } from "react";
import { dietApi } from "../../api/endpoints/public/diet";
import { useDebouncedSearch } from "../../hooks/useDebounceSearchParams";
import type { DietResponse } from "../../models/diet";
import { AsyncState } from "../AsyncState/AsyncState";
import GenericButton from "../Buttons/Button";

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

			<AsyncState
				isLoading={loading}
				hasNoResults={!!(results.length === 0 && query.trim())}
				error={error}
			>
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
			</AsyncState>
		</div>
	);
};

export default DietSearchInput;
