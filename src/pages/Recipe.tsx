import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import type { RecipeResponse } from "../types/recipe";
import { api } from "../api/api";
import { settings } from "../config";

import RecipeOverview from "../components/Recipe/RecipeOverview";
import IngredientsInput from "../components/Recipe/IngredientsInput";
import DietTypeInput from "../components/Recipe/DietTypeInput";
import RecipeSteps from "../components/Recipe/RecipeSteps";
import ImageInput from "../components/Recipe/ImageInput";
import { useAuth } from "../auth/useAuth";

export type RecipeEditPayload = Omit<RecipeResponse, "id">;

const EMPTY_EDIT: RecipeEditPayload = {
    title: "",
    owner_id: 0,
    description: "",
    instructions: [],
    diet_type: [],
    ingredients: [],
};

const RecipePage: React.FC = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const [newImageFile, setNewImageFile] = useState<File | null>(null);
    const [newImagePreviewUrl, setNewImagePreviewUrl] = useState<string | null>(
        null,
    );

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [newRecipe, setNewRecipe] = useState<RecipeEditPayload>(EMPTY_EDIT);

    const originalRecipeRef = useRef<RecipeResponse | null>(null);
    const originalImageUrlRef = useRef<string | null>(null);

    useEffect(() => {
        if (!id) return;

        let objectUrlToRevoke: string | null = null;

        const fetchRecipe = async () => {
            try {
                const recipePromise = api.get<RecipeResponse>(
                    `${settings.API_BASE_URL}${settings.RECIPES_BASE_ENDPOINT}/${id}`,
                    { timeout: 9000 },
                );
                const imagePromise = api.downloadBlob(
                    `${settings.API_BASE_URL}${settings.IMAGES_DOWNLOAD_ENDPOINT}${id}`,
                    { timeout: 9000 },
                );

                const [fetchedRecipe, fetchedImage] = await Promise.all([
                    recipePromise,
                    imagePromise,
                ]);
                setRecipe(fetchedRecipe);
                const url = URL.createObjectURL(fetchedImage);
                objectUrlToRevoke = url;
                setImageUrl(url);
            } catch (err) {
                console.error("Couldn't fetch recipe or image:", err);
            }
        };
        fetchRecipe();

        return () => {
            if (objectUrlToRevoke) URL.revokeObjectURL(objectUrlToRevoke);
        };
    }, [id]);

    useEffect(() => {
        if (!newImageFile) {
            setNewImagePreviewUrl(null);
            return;
        }
        const url = URL.createObjectURL(newImageFile);
        setNewImagePreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [newImageFile]);

    const handleEdit = () => {
        if (!recipe) return;
        originalRecipeRef.current = recipe;
        originalImageUrlRef.current = imageUrl;

        setNewRecipe(recipe as RecipeEditPayload);

        setNewImageFile(null);
        setIsEditing(true);
    };

    const handleCancel = () => {
        if (originalRecipeRef.current) setRecipe(originalRecipeRef.current);
        if (originalImageUrlRef.current) setImageUrl(originalImageUrlRef.current);

        setNewRecipe(EMPTY_EDIT);
        setNewImageFile(null);
        setIsEditing(false);
        originalRecipeRef.current = null;
        originalImageUrlRef.current = null;
    };

    const handleSave = async () => {
        if (!id || !originalRecipeRef.current) return;
        setIsSaving(true);
        try {
            const saved = await api.put<RecipeResponse>(
                `${settings.API_BASE_URL}${settings.RECIPES_BASE_ENDPOINT}/${id}`,
                newRecipe,
            );
            if (!saved) throw new Error("Brak odpowiedzi z PUT");

            if (newImageFile) {
                const form = new FormData();
                form.append("file", newImageFile);
                await api.postMultipart(
                    `${settings.API_BASE_URL}${settings.IMAGES_UPLOAD_ENDPOINT}/${id}`,
                    form,
                );

                if (newImagePreviewUrl) setImageUrl(newImagePreviewUrl);
            }

            setRecipe(saved);
            setIsEditing(false);
            originalRecipeRef.current = null;
            originalImageUrlRef.current = null;
            setNewImageFile(null);
        } catch (err) {
            console.error("Error saving recipe", err);
            if (originalRecipeRef.current) setRecipe(originalRecipeRef.current);
            if (originalImageUrlRef.current) setImageUrl(originalImageUrlRef.current);
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
                            src={newImagePreviewUrl ?? imageUrl ?? "/PlaceHolder.png"}
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

                    <div className="flex flex-col gap-6">
                        <IngredientsInput recipe={newRecipe} setRecipe={setNewRecipe} />

                        <ImageInput setImage={setNewImageFile} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <RecipeOverview
            recipe={recipe}
            imageUrl={imageUrl}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
            handleEdit={user?.id === recipe.owner_id ? handleEdit : undefined}
        />
    );
};

export default RecipePage;
