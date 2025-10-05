import { useState, useCallback } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useDebouncedSearch } from "../../hooks/useDebounceSearchParams";
import { preferedDietTypeApi } from "../../api/endpoints/user_role/prefered_diet_type";
import { dietTypeApi } from "../../api/endpoints/public/diet_types";
import type {
    PreferedRecipeTypeResponse,
    PreferedRecipeTypeCreate,
} from "../../api/models/prefered_diet_type";
import type { DietTypeResponse } from "../../api/models/diet_type";

type Props = {
    preferedDietTypes: PreferedRecipeTypeResponse[];
    setPreferedDietTypes: Dispatch<SetStateAction<PreferedRecipeTypeResponse[]>>;
};

const PreferedDietTypesInput: React.FC<Props> = ({
    preferedDietTypes,
    setPreferedDietTypes,
}) => {
    const [query, setQuery] = useState("");

    const fetchDietType = useCallback(async (q: string, signal: AbortSignal) => {
        return dietTypeApi.getByName(q, signal);
    }, []);

    const { data, loading, error, reset } = useDebouncedSearch<DietTypeResponse>({
        query,
        fetcher: fetchDietType,
        delay: 300,
        minLength: 1,
    });

    const addPreferedDietType = async (dietType: DietTypeResponse) => {
        try {
            const fetchData: PreferedRecipeTypeCreate = {
                diet_name: dietType.diet_name,
            };

            const res = await preferedDietTypeApi.create(fetchData);
            setPreferedDietTypes((prev) => [
                ...prev,
                { diet_name: res.diet_name, type_id: res.id },
            ]);
        } catch (err) {
            console.log(err);
        }
        reset();
        setQuery("");
    };

    const removePreferedDietType = async (id: number) => {
        try {
            await preferedDietTypeApi.delete(id);
            setPreferedDietTypes((prev) =>
                prev.filter((dietType) => dietType.type_id !== id),
            );
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
                            key={dietType.type_id}
                            className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium dark:bg-purple-800 dark:text-purple-100 shadow"
                        >
                            {dietType.diet_name}
                            <button
                                type="button"
                                onClick={() => removePreferedDietType(dietType.type_id)}
                                className="ml-2 text-purple-600 hover:text-purple-800 dark:text-purple-200 dark:hover:text-white font-bold"
                            >
                                ×
                            </button>
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
                    <button
                        type="button"
                        onClick={() => addPreferedDietType(data)}
                        className="mt-2 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Add {data.diet_name}
                    </button>
                )}
            </div>
        </div>
    );
};

export default PreferedDietTypesInput;
