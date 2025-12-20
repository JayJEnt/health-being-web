import type { Dispatch, SetStateAction } from "react";
import { useCallback, useState } from "react";

import { dietApi } from "../../api/endpoints/public/diet";
import { dietFavouriteApi } from "../../api/endpoints/user_role/diet_favourite";
import { useDebouncedSearch } from "../../hooks/useDebounceSearchParams";
import type { DietResponse } from "../../models/diet";
import type { DietFavouriteCreate, DietFavouriteResponse } from "../../models/diet_favourite";
import GenericButton from "../Generic/Button";

type Props = {
	preferedDietTypes: DietFavouriteResponse[];
	setPreferedDietTypes: Dispatch<SetStateAction<DietFavouriteResponse[]>>;
};

const PreferedDietTypesInput: React.FC<Props> = ({ preferedDietTypes, setPreferedDietTypes }) => {
	const [query, setQuery] = useState("");

	const fetchDietType = useCallback(async (q: string, signal: AbortSignal) => {
		return dietApi.getByName(q, signal);
	}, []);

	const { data, loading, error, reset } = useDebouncedSearch<DietResponse>({
		query,
		fetcher: fetchDietType,
		delay: 300,
		minLength: 1,
	});

	const addPreferedDietType = async (dietType: DietResponse) => {
		try {
			const fetchData: DietFavouriteCreate = {
				name: dietType.name,
			};

			const res = await dietFavouriteApi.create(fetchData);
			setPreferedDietTypes((prev) => [...prev, { name: res.name, diet_id: res.id }]);
		} catch (err) {
			console.log(err);
		}
		reset();
		setQuery("");
	};

	const removePreferedDietType = async (id: number) => {
		try {
			await dietFavouriteApi.delete(id);
			setPreferedDietTypes((prev) => prev.filter((dietType) => dietType.diet_id !== id));
		} catch (err) {
			console.error("Error removing ingredient:", err);
		}
	};
	return (
		<div>
			Prefred Diet Types
			{preferedDietTypes && preferedDietTypes.length > 0 && (
				<div className="flex flex-wrap gap-2 mt-3">
					{preferedDietTypes.map((dietType) => (
						<span
							key={dietType.diet_id}
							className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium dark:bg-purple-800 dark:text-purple-100 shadow"
						>
							{dietType.name}
							<GenericButton
								type="cancel"
								onClick={() => void removePreferedDietType(dietType.diet_id)}
							/>
						</span>
					))}
				</div>
			)}
			<div className="gap-4 flex">
				<input
					className="border"
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</div>
			<div className="mt-2 text-sm">
				{loading && <div>Ładowanie…</div>}
				{error && <div className="text-red-600">{error.message}</div>}
				{!loading && !error && data && (
					<GenericButton
						type="button"
						onClick={() => void addPreferedDietType(data)}
						className="mt-2 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
					>
						Add {data.name}
					</GenericButton>
				)}
			</div>
		</div>
	);
};

export default PreferedDietTypesInput;
