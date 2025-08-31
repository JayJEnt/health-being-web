import { useState } from "react";
import type { RecipeCreate } from "../../types/recipe";
import type { SetStateAction, Dispatch } from "react";
import type { RecipeEditPayload } from "../../pages/RecipeAdmin";

type Props<T extends RecipeCreate | RecipeEditPayload> = {
    recipe: T;
    setRecipe: Dispatch<SetStateAction<T>>;
};

const RecipeSteps = <T extends RecipeCreate | RecipeEditPayload>({
    recipe,
    setRecipe,
}: Props<T>) => {
    const [newStep, setNewStep] = useState<string>("");

    const addStep = () => {
        if (newStep.trim() === "") return;
        setRecipe((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                instructions: [...prev.instructions, newStep],
            };
        });
        setNewStep("");
    };

    const deleteStep = (index: number) => {
        setRecipe((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                instructions: prev.instructions.filter((_, i) => i !== index),
            };
        });
    };

    if (recipe)
        return (
            <div>
                <h2 className="text-xl font-semibold mb-2">Recipe Steps</h2>

                <ol className="list-decimal list-inside space-y-1 mb-3 text-sm">
                    {recipe.instructions.map((step, index) => (
                        <li key={index} className="flex items-start justify-between gap-3">
                            <span className="flex-1">
                                {index + 1}. {step}
                            </span>
                            <button
                                type="button"
                                onClick={() => deleteStep(index)}
                                className="shrink-0 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-xs"
                                aria-label={`Delete step ${index + 1}`}
                                title="Delete step"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ol>

                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Add step"
                        value={newStep}
                        onChange={(e) => setNewStep(e.target.value)}
                        className="flex-1 border rounded px-3 py-2"
                    />
                    <button
                        type="button"
                        onClick={addStep}
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                        Add
                    </button>
                </div>
            </div>
        );
};

export default RecipeSteps;
