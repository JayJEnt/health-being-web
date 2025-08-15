import { useState } from "react";
import type { RecipePage } from "../types/recipe";
import type { IngredientQuantity } from "../types/ingredient";
import { api } from "../api/api";
import type { UploadImageResponse } from "../api/image";
const RecipeSubmitPage: React.FC = () => {
    const [recipe, setRecipe] = useState<RecipePage>({
        title: "",
        image_url: "",
        description: "",
        instructions: [],
        diet_type: [],
        ingredients: [],
    });

    const [newDietType, setNewDietType] = useState("");
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let imageUrl = recipe.image_url;

            if (image) {
                const formData = new FormData();
                formData.append("file", image);

                const uploadRes = await api.postMultipart<UploadImageResponse>(
                    "/images/upload",
                    formData,
                );

                imageUrl = uploadRes.url;
            }

            const fullRecipe: RecipePage = {
                ...recipe,
                image_url: imageUrl,
                instructions: steps,
            };

            await api.postJson("/recipes", fullRecipe);
            alert("Recipe submitted successfully!");
        } catch (err) {
            console.error("Error submitting recipe:", err);
            alert("Failed to submit recipe.");
        }
    };
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Submit a Recipe</h1>

            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
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

                <div>
                    <h2 className="text-xl font-semibold mb-2">Diet Types</h2>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {recipe.diet_type?.map((diet, index) => (
                            <span
                                key={index}
                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                            >
                                {diet.diet_name}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Add diet type"
                            value={newDietType}
                            onChange={(e) => setNewDietType(e.target.value)}
                            className="flex-1 border rounded px-3 py-2"
                        />
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                if (newDietType.trim() === "") return;
                                setRecipe({
                                    ...recipe,
                                    diet_type: [
                                        ...(recipe.diet_type ?? []),
                                        { diet_name: newDietType },
                                    ],
                                });
                                setNewDietType("");
                            }}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Add
                        </button>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
                    <div className="space-y-2 mb-3">
                        {recipe.ingredients.map((ingredient, index) => (
                            <div key={index} className="flex gap-3 text-sm">
                                <span className="font-medium">{ingredient.name}</span>
                                <span>{ingredient.amount}</span>
                                <span>{ingredient.measure_unit}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <input
                            type="text"
                            placeholder="Name"
                            value={newIngredientName}
                            onChange={(e) => setNewIngredientName(e.target.value)}
                            className="border rounded px-3 py-2 flex-1"
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            value={newIngredientAmount}
                            onChange={(e) => setNewIngredientAmount(Number(e.target.value))}
                            className="border rounded px-3 py-2 w-28"
                        />
                        <select
                            value={newIngredientUnit}
                            onChange={(e) => setNewIngredientUnit(e.target.value)}
                            className="border rounded px-3 py-2"
                        >
                            <option value="pieces">pieces</option>
                            <option value="grams">grams</option>
                            <option value="mililiters">mililitres</option>
                        </select>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                if (newIngredientName.trim() === "" || newIngredientAmount <= 0)
                                    return;

                                const newIngredient: IngredientQuantity = {
                                    name: newIngredientName,
                                    measure_unit: newIngredientUnit,
                                    amount: newIngredientAmount,
                                };

                                setRecipe({
                                    ...recipe,
                                    ingredients: [...recipe.ingredients, newIngredient],
                                });

                                setNewIngredientName("");
                                setNewIngredientAmount(0);
                                setNewIngredientUnit("pieces");
                            }}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Add
                        </button>
                    </div>
                </div>

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
