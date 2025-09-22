import { useState, useCallback } from "react";
import { api } from "../../api/api";
import { settings } from "../../config";
import { useDebouncedSearch } from "../../hooks/useDebounceSearchParams";
import type { Dispatch, SetStateAction } from "react";
import type { RecipeCreate } from "../../types/recipe";
import type { DietType } from "../../types/diet_type";
import type { RecipeEditPayload } from "../../pages/Recipe";

type Props<T extends RecipeCreate | RecipeEditPayload> = {
    recipe: T;
    setRecipe: Dispatch<SetStateAction<T>>;
};

const DietTypeInput = <T extends RecipeCreate | RecipeEditPayload>({
    recipe,
    setRecipe,
}: Props<T>) => {
    const [newDietType, setNewDietType] = useState<string>("");

    const fetchDiet = useCallback(
        async (q: string, signal: AbortSignal) => {
            const url = `${settings.API_BASE_URL}${settings.DIET_TYPES_ENDPOINT}`;
            return api.get<DietType>(url, {
                params: { diet_name: q },
                signal,
            });
        },
        []
    );

    const { data, loading, error } = useDebouncedSearch<DietType>({
        query: newDietType,
        fetcher: fetchDiet,
        delay: 300,
        minLength: 1,
    });

    const addDietType = (diet: DietType) => {
        setRecipe({
            ...recipe,
            diet_type: [...(recipe.diet_type ?? []), diet],
        });
        setNewDietType("");
    };

    const removeDietType = (index: number) => {
        setRecipe((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                diet_type: prev.diet_type?.filter((_, i) => i !== index) ?? [],
            };
        });
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Diet Types</h2>

            <div className="flex flex-wrap gap-2 mb-3">
                {recipe.diet_type?.map((diet, index) => (
                    <span
                        key={index}
                        className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                        {diet.diet_name}
                        <button
                            type="button"
                            onClick={() => removeDietType(index)}
                            className="ml-2 text-blue-600 hover:text-blue-900 font-bold"
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>

            <div className="flex gap-2 relative">
                <input
                    type="text"
                    placeholder="Search diet type..."
                    value={newDietType}
                    onChange={(e) => setNewDietType(e.target.value)}
                    className="flex-1 border rounded px-3 py-2"
                />
            </div>

            {newDietType.trim() !== "" && (
                <div className="mt-2 border rounded shadow-sm max-h-60 overflow-auto bg-white">
                    {loading && (
                        <div className="px-3 py-2 text-sm text-gray-500">Loading...</div>
                    )}
                    {error && (
                        <div className="px-3 py-2 text-sm text-red-500">
                            {error.message}
                        </div>
                    )}
                    {data && (
                        <button
                            type="button"
                            onClick={() => addDietType(data)}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                        >
                            {data.diet_name}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default DietTypeInput;
