import { useState, useCallback } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useDebouncedSearch } from "../../hooks/useDebounceSearchParams";
import { api } from "../../api/api";
import { settings } from "../../config";
import type {
    PreferedRecipeTypeGet,
    CreatePreferedRecipeType,
} from "../../types/prefered_diet_type";
import type { DietType } from "../../types/diet_type";

type Props = {
    preferedDietTypes: PreferedRecipeTypeGet[];
    setPreferedDietTypes: Dispatch<SetStateAction<PreferedRecipeTypeGet[]>>;
};

const PreferedDietTypesInput: React.FC<Props> = ({
    preferedDietTypes,
    setPreferedDietTypes,
}) => {
    const [query, setQuery] = useState("");

    const fetchDietType = useCallback(async (q: string, signal: AbortSignal) => {
        const url = `${settings.API_BASE_URL}${settings.DIET_TYPES_NAME_ENDPOINT}${encodeURIComponent(q)}`;
        return api.get<DietType>(url, { signal });
    }, []);

    const { data, loading, error, reset } = useDebouncedSearch<DietType>({
        query,
        fetcher: fetchDietType,
        delay: 300,
        minLength: 1,
    });

    const addPreferedDietType = async (dietType: DietType) => {
        try {
            const fetchData: CreatePreferedRecipeType = {
                diet_name: dietType.diet_name,
            };

            const res = await api.postJson<PreferedRecipeTypeGet>(
                `${settings.API_BASE_URL}${settings.PREFERED_DIET_TYPES_ENDPOINT}`,
                fetchData,
            );
            setPreferedDietTypes((prev) => [...prev, res]);
        } catch (err) {
            console.log(err);
        }
        reset();
        setQuery("");
    };

    const removePreferedDietType = async (id: number) => {
        try {
            await api.delete(
                `${settings.API_BASE_URL}${settings.PREFERED_DIET_TYPES_ENDPOINT}/${id}`,
            );
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
            {preferedDietTypes && (
                <div>
                    {preferedDietTypes?.map((dietType) => (
                        <div key={dietType.type_id}>
                            {dietType.type_id}
                            <button
                                onClickCapture={() => removePreferedDietType(dietType.type_id)}
                            >
                                {dietType.diet_types}x
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
