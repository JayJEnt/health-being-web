import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { RecipeResponse } from "../types/recipe";
import { api } from "../api/api";
import { settings } from "../config";
import RecipeOverview from "../components/Recipe/RecipeOverview";

const RecipePage: React.FC = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const recipePromise = api.get<RecipeResponse>(
                    `${settings.API_BASE_URL}${settings.RECIPES_BASE_ENDPOINT}/${id}`,
                    { timeout: 9000 }
                );
                const imagePromise = api.downloadBlob(
                    `${settings.API_BASE_URL}${settings.IMAGES_DOWNLOAD_ENDPOINT}${id}`,
                    { timeout: 9000 }
                );

                const [fetchedRecipe, fetchedImage] = await Promise.all([recipePromise, imagePromise]);
                setRecipe(fetchedRecipe);
                const url = URL.createObjectURL(fetchedImage);
                setImageUrl(url);
            } catch (err) {
                console.error("Couldn't fetch recipe or image:", err);
            }
        };
        fetchRecipe();
    }, [id]);

    if (!recipe) return <p className="p-8 text-lg">Loading...</p>;

    return <RecipeOverview recipe={recipe} imageUrl={imageUrl} />;
};

export default RecipePage;
