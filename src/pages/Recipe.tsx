import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { RecipePageResponse } from "../types/recipe";
import { api } from "../api/api";
import { settings } from "../config";


const RecipePage: React.FC = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<RecipePageResponse | null>(null);

    async function loadRecipe() {
        try {
            const fetchedRecipe = await api.get<RecipePageResponse>(`${settings.API_BASE_URL}${settings.RECIPES_BASE_ENDPOINT}/${id}`);
            setRecipe(fetchedRecipe);
        } catch (err) {
            console.error("Nie udało się pobrać przepisu:", err);
        }
    }

    useEffect(() => {
        if (id) {
            loadRecipe();
        }
    }, [id]);

    if (!recipe) return <p className="p-8 text-lg">Loading...</p>;

    return (
        <div className="min-h-screen p-6 bg-light-main-bg dark:bg-dark-main-bg">
            <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <img
                        src="/PlaceHolder.png"
                        alt="Zdjęcie przepisu"
                        className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow border"
                    />

                    <h1 className="text-3xl font-bold">{recipe.title}</h1>

                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
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
                        {recipe.ingredients?.map((ingredient) => (
                            <li
                                key={ingredient.name}
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

export default RecipePage;
