import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { RecipePageResponse } from "../types/recipe";
import type { Ingredient, IngredientQuantity } from "../types/ingredient";
import { api } from "../api/api";
import { settings } from "../config";

type RecipeEditPayload = Omit<RecipePageResponse, "id">;

const RecipePageAdmin: React.FC = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<RecipePageResponse | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [ingredientsResponse, setIngredientsResponse] =
        useState<Ingredient | null>(null);

    const [newRecipe, setNewRecipe] = useState<RecipeEditPayload>({
        title: "",
        image_url: "",
        description: "",
        instructions: [],
        diet_type: [],
        ingredients: [],
    });

    const [newDietType, setNewDietType] = useState("");
    const [newIngredient, setNewIngredient] = useState<IngredientQuantity>({
        name: "",
        amount: 0,
        measure_unit: "",
    });

    useEffect(() => {
        if (!id) return;
        api

            .get<RecipePageResponse>(
                `${settings.API_BASE_URL}${settings.RECIPES_BASE_ENDPOINT}/${id}`,
            )

            .then((res) => setRecipe(res))
            .catch((err) => console.error("Error loading recipe", err));
    }, [id]);
    //TODO
    //Fix adding ingredients
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (newIngredient.name) {
                api

                    .get<Ingredient>(
                        `${settings.API_BASE_URL}${settings.INGREDIENTS_NAME_ENDPOINT}${newIngredient.name}`,
                    )

                    .then((res) => setIngredientsResponse(res))
                    .catch((err) =>
                        console.error("Error loading ingredient suggestions", err),
                    );
            }
        }, 1000);
        return () => clearTimeout(timeout);
    }, [newIngredient.name]);

    const handleEdit = () => {
        if (!recipe) return;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _, ...editable } = recipe;
        setNewRecipe(editable);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setNewRecipe({
            title: "",
            image_url: "",
            description: "",
            instructions: [],
            diet_type: [],
            ingredients: [],
        });
        setIsEditing(false);
    };

    const handleSave = () => {
        if (!id) return;
        api
            .put(
                `${settings.API_BASE_URL}${settings.RECIPES_BASE_ENDPOINT}/${id}`,
                newRecipe,
            )

            .then((res) => {
                console.log("Saved!", res);
                setRecipe(() => ({
                    ...newRecipe,
                    id: Number(id),
                }));
                setIsEditing(false);
            })
            .catch((err) => console.error("Error saving recipe", err));
    };

    const handleAddDietType = () => {
        const trimmed = newDietType.trim();
        if (
            !trimmed ||
            newRecipe.diet_type?.some(
                (d) => d.diet_name.toLowerCase() === trimmed.toLowerCase(),
            )
        )
            return;
        setNewRecipe({
            ...newRecipe,
            diet_type: [...(newRecipe.diet_type ?? []), { diet_name: trimmed }],
        });
        setNewDietType("");
    };

    if (!recipe) return <p className="p-8 text-lg">Loading...</p>;
    if (isEditing) {
        return (
            <div className="min-h-screen p-6 bg-light-main-bg dark:bg-dark-main-bg">
                <div className="grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <img
                            src={newRecipe.image_url || "/PlaceHolder.png"}
                            alt="Recipe"
                            className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow border"
                        />
                        <div className="flex justify-between items-center">
                            <input
                                className="text-3xl font-bold bg-transparent border-none focus:outline-none w-full"
                                value={newRecipe.title}
                                onChange={(e) =>
                                    setNewRecipe({ ...newRecipe, title: e.target.value })
                                }
                            />
                            <div className="flex gap-2">
                                <button
                                    className="bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                                <button
                                    className="bg-red-700 text-white px-4 py-2 rounded-xl hover:bg-red-600"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>

                        <textarea
                            className="text-gray-700 dark:text-gray-300 bg-transparent border-none focus:outline-none resize-none"
                            rows={3}
                            value={newRecipe.description}
                            onChange={(e) =>
                                setNewRecipe({ ...newRecipe, description: e.target.value })
                            }
                        />

                        <div>
                            <h2 className="text-xl font-semibold mb-2">Diet types:</h2>
                            <ul className="flex flex-wrap gap-2 mb-2">
                                {newRecipe.diet_type?.map((diet, index) => (
                                    <li
                                        key={index}
                                        className="px-3 py-1 bg-green-100 dark:bg-green-800 text-sm rounded-full flex items-center gap-2"
                                    >
                                        {diet.diet_name}
                                        <button
                                            className="bg-green-400 text-white rounded-full w-4 h-4 text-xs"
                                            onClick={handleAddDietType}
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
                                                ...(newRecipe.diet_type ?? []),
                                                { diet_name: newDietType.trim() },
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

                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-semibold">Ingredients:</h2>
                        <ul className="space-y-2">
                            {newRecipe.ingredients.map((ing, index) => (
                                <li
                                    key={index}
                                    className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow flex justify-between items-center"
                                >
                                    <span className="text-sm">
                                        <strong>{ing.name}</strong> – {ing.amount}{" "}
                                        {ing.measure_unit}
                                    </span>
                                    <button
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
                            <div className="relative w-full md:w-1/3">
                                <input
                                    className="border-b p-2 bg-transparent focus:outline-none w-full"
                                    placeholder="Name"
                                    value={newIngredient.name}
                                    onChange={(e) =>
                                        setNewIngredient({ ...newIngredient, name: e.target.value })
                                    }
                                    onFocus={() => { }}
                                    onBlur={() => {
                                        setTimeout(() => setIngredientsResponse(null), 100);
                                    }}
                                />
                                {ingredientsResponse && (
                                    <ul className="absolute left-0 top-full mt-1 bg-white dark:bg-gray-700 rounded shadow p-2 text-sm text-gray-800 dark:text-gray-200 z-20 w-full">
                                        <li
                                            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 rounded"
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => {
                                                setNewIngredient({
                                                    ...newIngredient,
                                                    name: ingredientsResponse.name,
                                                });
                                                setIngredientsResponse(null);
                                            }}
                                        >
                                            {ingredientsResponse.name}
                                        </li>
                                    </ul>
                                )}
                            </div>

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
                                value={newIngredient.measure_unit}
                                onChange={(e) =>
                                    setNewIngredient({
                                        ...newIngredient,
                                        measure_unit: e.target.value,
                                    })
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
                                        !newIngredient.measure_unit ||
                                        !newIngredient.amount
                                    )
                                        return;
                                    setNewRecipe({
                                        ...newRecipe,
                                        ingredients: [...newRecipe.ingredients, newIngredient],
                                    });
                                    setNewIngredient({ name: "", amount: 0, measure_unit: "" });
                                    setIngredientsResponse(null);
                                }}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 bg-light-main-bg dark:bg-dark-main-bg">
            <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <img
                        src={recipe.image_url || "/PlaceHolder.png"}
                        alt="Recipe"
                        className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow border"
                    />
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold">{recipe.title}</h1>
                        <button
                            className="bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
                            onClick={handleEdit}
                        >
                            Edit
                        </button>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                        {recipe.description}
                    </p>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">Diet types:</h2>
                        <ul className="flex flex-wrap gap-2">
                            {recipe.diet_type?.map((diet, index) => (
                                <li
                                    key={index}
                                    className="px-3 py-1 bg-green-100 dark:bg-green-800 text-sm rounded-full"
                                >
                                    {diet.diet_name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">Ingredients:</h2>
                    <ul className="space-y-3">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li
                                key={index}
                                className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow"
                            >
                                <span className="font-medium">{ingredient.name}</span> –{" "}
                                {ingredient.amount} {ingredient.measure_unit}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RecipePageAdmin;
