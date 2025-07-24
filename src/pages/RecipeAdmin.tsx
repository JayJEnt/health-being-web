import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Recipe, Ingredient } from "../types/Recipe";

const RecipePageAdmin: React.FC = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newRecipe, setNewRecipe] = useState<Recipe>({
        id: 0,
        name: "",
        description: "",
        diet_type: [],
        ingredients: [],
    });
    const [newDietType, setNewDietType] = useState<string>("");
    const [newIngredient, setNewIngredient] = useState<Ingredient>({
        id: 0,
        name: "",
        unit: "",
        amount: 0,
        calories_per_100: 0,
        protein_per_100: 0,
        fat_per_100: 0,
        carbs_per_100: 0,
        fiber_per_100: 0,
        sugar_per_100: 0,
        salt_per_100: 0,
        vitamins: [],
    });

    useEffect(() => {
        axios
            .get(
                `https://fhreuwkryd.execute-api.eu-north-1.amazonaws.com/dev/recipes/${id}`,
            )
            .then((response) => setRecipe(response.data))
            .catch((error) => console.error("Error while fetching data!", error));
    }, [id]);

    if (!recipe) return <p className="p-8 text-lg">Loading...</p>;

    const handleEdit = () => {
        setNewRecipe(recipe);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setNewRecipe({
            id: 0,
            name: "",
            description: "",
            diet_type: [],
            ingredients: [],
        });
        setIsEditing(false);
    };

    if (isEditing)
        return (
            <div className="min-h-screen p-6 bg-light-main-bg dark:bg-dark-main-bg">
                <div className="grid lg:grid-cols-3 gap-10">
                    {/* LEWA KOLUMNA */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <img
                            src="/PlaceHolder.png"
                            alt="Zdjęcie przepisu"
                            className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow border"
                        />

                        {/* Tytuł + Save/Cancel */}
                        <div className="flex justify-between items-center">
                            <input
                                className="text-3xl font-bold bg-transparent border-none focus:outline-none w-full"
                                value={newRecipe.name}
                                onChange={(e) =>
                                    setNewRecipe({
                                        ...newRecipe,
                                        name: e.target.value,
                                    })
                                }
                            />
                            <div className="flex gap-2">
                                <button
                                    className="text-md bg-blue-700 p-4 py-2 rounded-2xl text-white hover:bg-blue-600"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Save
                                </button>
                                <button
                                    className="text-md bg-red-700 p-4 py-2 rounded-2xl text-white hover:bg-red-600"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>

                        {/* Opis */}
                        <textarea
                            className="text-gray-700 dark:text-gray-300 leading-relaxed bg-transparent border-none focus:outline-none resize-none"
                            rows={3}
                            value={newRecipe.description}
                            onChange={(e) =>
                                setNewRecipe({
                                    ...newRecipe,
                                    description: e.target.value,
                                })
                            }
                        />

                        {/* Diet types */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Diet types:</h2>
                            <ul className="flex flex-wrap gap-2 mb-2">
                                {newRecipe.diet_type.map((type, index) => (
                                    <li
                                        key={index}
                                        className="px-3 py-1 bg-green-100 dark:bg-green-800 text-sm rounded-full flex items-center gap-2"
                                    >
                                        {type}
                                        <button
                                            className="rounded-full bg-green-400 w-4 h-4 text-xs"
                                            onClick={() =>
                                                setNewRecipe({
                                                    ...newRecipe,
                                                    diet_type: newRecipe.diet_type.filter(
                                                        (_, i) => i !== index,
                                                    ),
                                                })
                                            }
                                        >
                                            ×
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-2">
                                <input
                                    className="border-b bg-transparent focus:outline-none px-2"
                                    value={newDietType}
                                    onChange={(e) => setNewDietType(e.target.value)}
                                    placeholder="Add diet type"
                                />
                                <button
                                    className="bg-blue-700 text-white px-4 py-1 rounded-xl hover:bg-blue-600"
                                    onClick={() => {
                                        if (!newDietType.trim()) return;
                                        setNewRecipe({
                                            ...newRecipe,
                                            diet_type: [
                                                ...(newRecipe.diet_type || []),
                                                newDietType.trim(),
                                            ],
                                        });
                                        setNewDietType("");
                                    }}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* PRAWA KOLUMNA – składniki */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-semibold">Ingredients:</h2>

                        <ul className="space-y-2">
                            {newRecipe.ingredients.map((ingredient, index) => (
                                <li
                                    key={index}
                                    className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow flex justify-between items-center"
                                >
                                    <span className="text-sm">
                                        <strong>{ingredient.name}</strong> – {ingredient.amount}{" "}
                                        {ingredient.unit}
                                    </span>
                                    <button
                                        type="button"
                                        className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                        onClick={() => {
                                            const updated = [...newRecipe.ingredients];
                                            updated.splice(index, 1);
                                            setNewRecipe({ ...newRecipe, ingredients: updated });
                                        }}
                                    >
                                        ×
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-col gap-2 md:flex-row md:items-end">
                            <input
                                className="border-b p-2 bg-transparent focus:outline-none w-full md:w-1/3"
                                placeholder="Name"
                                value={newIngredient.name}
                                onChange={(e) =>
                                    setNewIngredient({ ...newIngredient, name: e.target.value })
                                }
                            />
                            <input
                                type="number"
                                className="border-b p-2 bg-transparent focus:outline-none w-full md:w-1/6"
                                placeholder="Amount"
                                value={newIngredient.amount}
                                onChange={(e) =>
                                    setNewIngredient({
                                        ...newIngredient,
                                        amount: Number(e.target.value),
                                    })
                                }
                            />
                            <select
                                className="border-b p-2 bg-transparent focus:outline-none w-full md:w-1/6"
                                value={newIngredient.unit}
                                onChange={(e) =>
                                    setNewIngredient({ ...newIngredient, unit: e.target.value })
                                }
                            >
                                <option value="">Unit</option>
                                <option value="g">g</option>
                                <option value="ml">ml</option>
                                <option value="piece">piece</option>
                            </select>
                            <button
                                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={() => {
                                    if (
                                        !newIngredient.name ||
                                        !newIngredient.unit ||
                                        !newIngredient.amount
                                    )
                                        return;
                                    setNewRecipe({
                                        ...newRecipe,
                                        ingredients: [...newRecipe.ingredients, newIngredient],
                                    });
                                    setNewIngredient({
                                        id: 0,
                                        name: "",
                                        unit: "",
                                        amount: 0,
                                        calories_per_100: 0,
                                        protein_per_100: 0,
                                        fat_per_100: 0,
                                        carbs_per_100: 0,
                                        fiber_per_100: 0,
                                        sugar_per_100: 0,
                                        salt_per_100: 0,
                                        vitamins: [],
                                    });
                                }}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );

    return (
        <div className="min-h-screen p-6 bg-light-main-bg dark:bg-dark-main-bg">
            <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <img
                        src="/PlaceHolder.png"
                        alt="Zdjęcie przepisu"
                        className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow border"
                    />
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold">{recipe.name}</h1>
                        <button
                            className="px-4 py-2 text-sm font-medium bg-blue-700 text-white rounded-xl hover:bg-blue-600 transition-colors"
                            onClick={() => handleEdit()}
                        >
                            Edit
                        </button>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {recipe.description}
                    </p>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">Diet types:</h2>
                        <ul className="flex flex-wrap gap-2">
                            {recipe.diet_type.map((type, index) => (
                                <li
                                    key={index}
                                    className="px-3 py-1 bg-green-100 dark:bg-green-800 text-sm rounded-full"
                                >
                                    {type}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">Ingredients:</h2>
                    <ul className="space-y-3">
                        {recipe.ingredients.map((ingredient) => (
                            <li
                                key={ingredient.id}
                                className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow"
                            >
                                <span className="font-medium">{ingredient.name}</span> –{" "}
                                {ingredient.amount} {ingredient.unit}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RecipePageAdmin;
