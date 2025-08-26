import { useState } from "react";
import type { RecipeCreate } from "../types/recipe";
import type { IngredientQuantity } from "../types/ingredient";
import DietTypeInput from "../components/Recipe/DietTypeInput";
import IngredientsInput from "../components/Recipe/IngredientsInput";

const RecipeSubmitPage: React.FC = () => {
    const [recipe, setRecipe] = useState<RecipeCreate>({
        title: "",
        description: "",
        instructions: [],
        diet_type: [],
        ingredients: [],
    });

    const [newIngredientName, setNewIngredientName] = useState("");
    const [newIngredientAmount, setNewIngredientAmount] = useState<number>(0);
    const [newIngredientUnit, setNewIngredientUnit] = useState("sztuka");
    const [steps, setSteps] = useState<string[]>([]);
    const [newStep, setNewStep] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Submit a Recipe</h1>

            <form className="flex flex-col gap-8">
                <div>
                    <label className="block text-lg font-semibold mb-2">
                        Recipe Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {imagePreview && (
                        <div className="mt-4">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="max-w-xs max-h-48 object-cover rounded shadow-md"
                            />
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-1">
                        Recipe Name
                    </label>
                    <input
                        type="text"
                        value={recipe.title}
                        onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
                        className="w-full border rounded px-3 py-2"
                        placeholder="e.g. Pasta Carbonara"
                    />
                </div>

                <div>
                    <label className="block text-lg font-semibold mb-1">
                        Description
                    </label>
                    <textarea
                        rows={4}
                        value={recipe.description}
                        onChange={(e) =>
                            setRecipe({ ...recipe, description: e.target.value })
                        }
                        className="w-full border rounded px-3 py-2"
                        placeholder="Write a short description..."
                    />
                </div>
                <DietTypeInput recipe={recipe} setRecipe={setRecipe} />
                <IngredientsInput recipe={recipe} setRecipe={setRecipe} />
                <div>
                    <h2 className="text-xl font-semibold mb-2">Recipe Steps</h2>
                    <ol className="list-decimal list-inside space-y-1 mb-3 text-sm">
                        {steps.map((step, index) => (
                            <li key={index}>{step}</li>
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
                            onClick={(e) => {
                                e.preventDefault();
                                if (newStep.trim() === "") return;
                                setSteps([...steps, newStep]);
                                setNewStep("");
                            }}
                            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                        >
                            Add
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-blue-700 text-white font-semibold py-3 px-6 rounded hover:bg-blue-800 self-start"
                >
                    Submit Recipe
                </button>
            </form>
        </div>
    );
};

export default RecipeSubmitPage;
