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
                const fetchedRecipe = await api.get<RecipeResponse>(
                    `${settings.API_BASE_URL}${settings.RECIPES_BASE_ENDPOINT}/${id}`,
                );
                setRecipe(fetchedRecipe);
                const fetchedImage = await api.get<File>(
                    `${settings.API_BASE_URL}${settings.IMAGES_DOWNLOAD_ENDPOINT}${id}`,
                );
                const url = URL.createObjectURL(fetchedImage);
                setImageUrl(url);
            } catch (err) {
                console.error("Nie udało się pobrać przepisu:", err);
            }
        };
        fetchRecipe();
    }, [id]);

    if (!recipe) return <p className="p-8 text-lg">Loading...</p>;

    return <RecipeOverview recipe={recipe} imageUrl={imageUrl} />;
};

export default RecipePage;
