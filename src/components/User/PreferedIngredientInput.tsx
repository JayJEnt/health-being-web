import { useState, useCallback } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useDebouncedSearch } from "../../hooks/useDebounceSearchParams";
import { api } from "../../api/api";
import { settings } from "../../config";
import type {
    PreferedIngredients,
    CreatePreferedIngredients,
} from "../../types/prefered_ingredients";
import type { Ingredient } from "../../types/ingredient";

type Props = {
    preferedIngredients: PreferedIngredients[];
    setPreferedIngredients: Dispatch<SetStateAction<PreferedIngredients[]>>;
};

const PreferedIngredientInput: React.FC<Props> = ({
    preferedIngredients,
    setPreferedIngredients,
}) => {
    const [query, setQuery] = useState("");

    const options = ["like", "dislike", "allergic"] as const;
    type Preference = (typeof options)[number];
    const [preference, setPreference] = useState<Preference>("like");

    const fetchIngredient = useCallback(
        async (q: string, signal: AbortSignal) => {
            const url = `${settings.API_BASE_URL}${settings.INGREDIENTS_NAME_ENDPOINT}${encodeURIComponent(q)}`;
            return api.get<Ingredient>(url, { signal });
        },
        [],
    );

    const { data, loading, error, reset } = useDebouncedSearch<Ingredient>({
        query,
        fetcher: fetchIngredient,
        delay: 300,
        minLength: 1,
    });

    const addPreferedIngredient = async (
        ingredient: Ingredient,
        pref: Preference,
    ) => {
        try {
            const fetchData: CreatePreferedIngredients = {
                name: ingredient.name,
                preference: pref,
            };

            const res = await api.postJson<PreferedIngredients>(
                `${settings.API_BASE_URL}${settings.PREFERED_INGREDIENTS_ENDPOINT}`,
                fetchData,
            );
            setPreferedIngredients((prev) => [...prev, res]);
        } catch (err) {
            console.log(err);
        }
        reset();
        setQuery("");
    };

    const removePreferedIngredient = async (id: number) => {
        try {
            await api.delete(
                `${settings.API_BASE_URL}${settings.PREFERED_INGREDIENTS_ENDPOINT}/${id}`,
            );
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
            {preferedIngredients && (
                <div>
                    {preferedIngredients?.map((ingredient) => (
                        <div key={ingredient.ingredient_id}>
                            {ingredient.preference}

                            <button
                                onClickCapture={() =>
                                    removePreferedIngredient(ingredient.ingredient_id)
                                }
                            >
                                x
                            </button>
                        </div>
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
                {loading && <div>Ładowanie…</div>}
                {error && <div className="text-red-600">{error.message}</div>}
                {!loading && !error && data && (
                    <button
                        type="button"
                        onClick={() => addPreferedIngredient(data, preference)}
                        className="mt-2 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Add {data.name}
                    </button>
                )}
            </div>
        </div>
    );
};

export default PreferedIngredientInput;
