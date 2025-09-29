import { useState, useCallback } from "react";
import { ingredientsApi } from "../../api/endpoints/public/ingredients";
import { useDebouncedSearch } from "../../hooks/useDebounceSearchParams";
import type { RecipeCreate } from "../../api/models/recipe";
import type { Dispatch, SetStateAction } from "react";
import type { IngredientQuantity, Ingredient } from "../../api/models/ingredient";
import type { RecipeEditPayload } from "../../pages/Recipe";
import { MeasureUnit as MeasuerUnitsValues } from "../../api/models/enum_utils";
import type { MeasureUnit } from "../../api/models/enum_utils";


type Props<T extends RecipeCreate | RecipeEditPayload> = {
    recipe: T;
    setRecipe: Dispatch<SetStateAction<T>>;
};

const IngredientsInput = <T extends RecipeCreate | RecipeEditPayload>({
    recipe,
    setRecipe,
}: Props<T>) => {
    const [newIngredient, setNewIngredient] = useState<IngredientQuantity>({
        name: "",
        amount: 0,
        measure_unit: MeasuerUnitsValues.unit as MeasureUnit,
    });
    const [selected, setSelected] = useState<Ingredient | null>(null);

    const MEASURE_OPTIONS: { label: string; value: MeasureUnit }[] = [
        { label: "kg", value: MeasuerUnitsValues.kilogram },
        { label: "g", value: MeasuerUnitsValues.gram },
        { label: "l", value: MeasuerUnitsValues.liter },
        { label: "ml", value: MeasuerUnitsValues.milliliter },
        { label: "unit", value: MeasuerUnitsValues.unit },
    ];

    const fetchIngredient = useCallback(
        async (q: string, signal: AbortSignal) => {
            return ingredientsApi.getByName(q, signal)
        },
        [],
    );

    const { data, loading, error } = useDebouncedSearch<Ingredient>({
        query: newIngredient.name,
        fetcher: fetchIngredient,
        delay: 300,
        minLength: 1,
    });

    const onSelect = (ing: Ingredient) => {
        setSelected(ing);
        setNewIngredient((prev) => ({ ...prev, name: ing.name }));
    };

    const onNameChange = (val: string) => {
        setNewIngredient((prev) => ({ ...prev, name: val }));
        if (selected) setSelected(null);
    };

    const canAdd = !!selected && newIngredient.amount > 0;

    const onAdd = () => {
        if (!selected) return;

        setRecipe((prev) => {
            if (!prev) return prev;

            return {
                ...prev,
                ingredients: [
                    ...prev.ingredients,
                    {
                        name: selected.name,
                        amount: newIngredient.amount,
                        measure_unit: newIngredient.measure_unit,
                    },
                ],
            };
        });

        setSelected(null);
        setNewIngredient({
            name: "",
            amount: 0,
            measure_unit: MeasuerUnitsValues.unit,
        });
    };

    const clearSelection = () => {
        setSelected(null);
    };

    const deleteIngredient = (index: number) => {
        setRecipe((prev) => {
            if (!prev) return prev;

            const filteredIngredients = prev.ingredients.filter(
                (_, i) => index !== i,
            );

            return {
                ...prev,
                ingredients: filteredIngredients,
            };
        });
    };

    if (!recipe) return null;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>

            <div className="space-y-2 mb-3">
                {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-3 items-center text-sm">
                        <span className="font-medium">{ingredient.name}</span>
                        <span>{ingredient.amount}</span>
                        <span>{ingredient.measure_unit}</span>
                        <button
                            type="button"
                            onClick={() => deleteIngredient(index)}
                            className="ml-2 text-red-600 hover:text-red-800 font-bold px-2 rounded"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-2 items-center">
                <div className="relative flex-1 min-w-[200px]">
                    <input
                        type="text"
                        placeholder="Search ingredient"
                        value={newIngredient.name}
                        onChange={(e) => onNameChange(e.target.value)}
                        readOnly={!!selected}
                        className={`border rounded px-3 py-2 w-full ${selected ? "bg-gray-100 cursor-default" : ""}`}
                    />
                    {selected && (
                        <button
                            type="button"
                            onClick={clearSelection}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-700 hover:underline"
                        >
                            Change
                        </button>
                    )}
                </div>

                <input
                    type="number"
                    placeholder="Amount"
                    value={newIngredient.amount}
                    onChange={(e) =>
                        setNewIngredient((prev) => ({
                            ...prev,
                            amount: e.target.value === "" ? 0 : e.target.valueAsNumber,
                        }))
                    }
                    className="border rounded px-3 py-2 w-28"
                />

                <select
                    value={newIngredient.measure_unit}
                    onChange={(e) =>
                        setNewIngredient((prev) => ({
                            ...prev,
                            measure_unit: e.target.value as MeasureUnit,
                        }))
                    }
                    className="border rounded px-3 py-2"
                >
                    {MEASURE_OPTIONS.map((opt) => (
                        <option key={opt.label} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                <button
                    type="button"
                    disabled={!canAdd}
                    onClick={onAdd}
                    className={`px-4 py-2 rounded text-white ${canAdd ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}`}
                >
                    Add
                </button>
            </div>

            {!selected && newIngredient.name.trim() !== "" && (
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
                            onClick={() => onSelect(data)}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                        >
                            {data.name}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default IngredientsInput;
