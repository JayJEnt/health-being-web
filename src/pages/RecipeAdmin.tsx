import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import type { RecipeResponse } from "../types/recipe";
import { api } from "../api/api";
import { settings } from "../config";
import RecipeOverview from "../components/Recipe/RecipeOverview";
import IngredientsInput from "../components/Recipe/IngredientsInput";
import DietTypeInput from "../components/Recipe/DietTypeInput";
import RecipeSteps from "../components/Recipe/RecipeSteps";

export type RecipeEditPayload = Omit<RecipeResponse, "id">;

const EMPTY_EDIT: RecipeEditPayload = {
    title: "",
    owner_id: 0,
    description: "",
    instructions: [],
    diet_type: [],
    ingredients: [],
};

const RecipePageAdmin: React.FC = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [newRecipe, setNewRecipe] = useState<RecipeEditPayload>(EMPTY_EDIT);

    const originalRef = useRef<RecipeResponse | null>(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const fetchedRecipe = await api.get<RecipeResponse>(
                    `${settings.API_BASE_URL}${settings.RECIPES_BASE_ENDPOINT}/${id}`,
                );
                setRecipe(fetchedRecipe);

                const fetchedImage = await api.get<File>(
                    `${settings.API_BASE_URL}${settings.IMAGES_DOWNLOAD_ENDPOINT}${id}`,
                );
                const url = URL.createObjectURL(fetchedImage);
                setImageUrl(url);
                return () => URL.revokeObjectURL(url);
            } catch (err) {
                console.error("Nie udało się pobrać przepisu:", err);
            }
        };
        if (id) fetchRecipe();
    }, [id]);

    const handleEdit = () => {
        if (!recipe) return;
        originalRef.current = recipe;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _, ...editable } = recipe;
        setNewRecipe(editable);
        setIsEditing(true);
    };

    const handleCancel = () => {
        if (originalRef.current) {
            setRecipe(originalRef.current);
        }
        setNewRecipe(EMPTY_EDIT);
        setIsEditing(false);
        originalRef.current = null;
    };

    const handleSave = async () => {
        if (!id || !originalRef.current) return;
        setIsSaving(true);
        try {
            const editResponse = await api.put<RecipeResponse>(
                `${settings.API_BASE_URL}${settings.RECIPES_BASE_ENDPOINT}/${id}`,
                newRecipe,
            );
            if (!editResponse) return;
            setRecipe(editResponse);

            setIsEditing(false);
            originalRef.current = null;
        } catch (err) {
            console.error("Error saving recipe", err);
            setRecipe(originalRef.current);
        } finally {
            setIsSaving(false);
        }
    };

    if (!recipe) return <p className="p-8 text-lg">Loading...</p>;

    if (isEditing) {
        return (
            <div className="min-h-screen p-6 bg-light-main-bg dark:bg-dark-main-bg">
                <div className="grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <img
                            src={imageUrl ?? "/PlaceHolder.png"}
                            alt="Recipe"
                            className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow border"
                        />

                        <div className="flex justify-between items-center">
                            <input
                                className="text-3xl font-bold bg-transparent border-none focus:outline-none w-full"
                                value={newRecipe.title}
                                onChange={(e) =>
                                    setNewRecipe((prev) => ({ ...prev, title: e.target.value }))
                                }
                            />
                            <div className="flex gap-2">
                                <button
                                    disabled={isSaving}
                                    className="bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-600 disabled:opacity-60"
                                    onClick={handleSave}
                                >
                                    {isSaving ? "Saving..." : "Save"}
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
                                setNewRecipe((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                        />

                        <DietTypeInput recipe={newRecipe} setRecipe={setNewRecipe} />
                        <RecipeSteps recipe={newRecipe} setRecipe={setNewRecipe} />
                    </div>

                    <IngredientsInput recipe={newRecipe} setRecipe={setNewRecipe} />
                </div>
            </div>
        );
    }

    return (
        <RecipeOverview
            recipe={recipe}
            imageUrl={imageUrl}
            handleEdit={handleEdit}
        />
    );
};

export default RecipePageAdmin;
