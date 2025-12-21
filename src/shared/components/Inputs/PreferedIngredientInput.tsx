import type { Dispatch, SetStateAction } from "react";
import { useCallback, useState } from "react";

import { ingredientApi } from "../../api/endpoints/public/ingredient";
import { ingredientPreferenceApi } from "../../api/endpoints/user_role/ingredient_preference";
import { useDebouncedSearch } from "../../hooks/useDebounceSearchParams";
import { type Preference, Preference as PreferenceValues } from "../../models/enum_utils";
import type { Ingredient } from "../../models/ingredient";
import type {
	IngredientPreferenceCreate,
	IngredientPreferenceResponse,
} from "../../models/ingredient_preference";
import GenericButton from "../Generic/Button";

type Props = {
	preferedIngredients: IngredientPreferenceResponse[];
	setPreferedIngredients: Dispatch<SetStateAction<IngredientPreferenceResponse[]>>;
};

const PreferedIngredientInput: React.FC<Props> = ({
	preferedIngredients,
	setPreferedIngredients,
}) => {
	const [query, setQuery] = useState("");

	const [preference, setPreference] = useState<Preference>(PreferenceValues.like);
	const options = Object.values(PreferenceValues);

	const fetchIngredient = useCallback(async (q: string, signal: AbortSignal) => {
		return ingredientApi.getByName(q, signal);
	}, []);

	const { data, loading, error, reset } = useDebouncedSearch<Ingredient>({
		query,
		fetcher: fetchIngredient,
		delay: 300,
		minLength: 1,
	});

	const addPreferedIngredient = async (ingredient: Ingredient, pref: Preference) => {
		try {
			const fetchData: IngredientPreferenceCreate = {
				name: ingredient.name,
				preference: pref,
			};

			const res = await ingredientPreferenceApi.create(fetchData);
			const newIngredient: IngredientPreferenceResponse = {
				name: res.name,
				preference: res.preference,
				ingredient_id: res.id,
			};

			setPreferedIngredients((prev) => [...prev, newIngredient]);
		} catch (err) {
			console.log(err);
		}
		reset();
		setQuery("");
	};

	const removePreferedIngredient = async (id: number) => {
		try {
			await ingredientPreferenceApi.delete(id);
			setPreferedIngredients((prev) =>
				prev.filter((ingredient) => ingredient.ingredient_id !== id),
			);
		} catch (err) {
			console.error("Error removing ingredient:", err);
		}
	};
	return (
		<div>
			Prefred Ingredients
			{preferedIngredients && preferedIngredients.length > 0 && (
				<div className="flex flex-wrap gap-2 mt-3">
					{preferedIngredients.map((ingredient) => (
						<span
							key={ingredient.ingredient_id}
							className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium dark:bg-green-800 dark:text-green-100 shadow"
						>
							<span className="mr-2">
								{ingredient.name} <span className="italic text-xs">({ingredient.preference})</span>
							</span>
							<GenericButton
								type="button"
								onClick={() => void removePreferedIngredient(ingredient.ingredient_id)}
								className="ml-1 text-green-600 hover:text-green-800 dark:text-green-200 dark:hover:text-white font-bold"
							>
								×
							</GenericButton>
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
				<select
					className="border"
					value={preference}
					onChange={(e) => setPreference(e.target.value as Preference)}
				>
					{options.map((opt) => (
						<option key={opt} value={opt}>
							{opt[0].toUpperCase() + opt.slice(1)}
						</option>
					))}
				</select>
			</div>
			<div className="mt-2 text-sm">
				{loading && <div>Loading...</div>}
				{error && <div className="text-red-600">{error.message}</div>}
				{!loading && !error && data && (
					<GenericButton
						type="button"
						onClick={() => void addPreferedIngredient(data, preference)}
						className="mt-2 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
					>
						Add {data.name}
					</GenericButton>
				)}
			</div>
		</div>
	);
};

export default PreferedIngredientInput;
