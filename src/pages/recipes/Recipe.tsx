import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeView from "../../features/recipeView/RecipeView";
import { recipeApi } from "../../shared/api/endpoints/public/recipe";
import LoadingSpinner from "../../shared/components/Loading/LoadingSpinner";
import { settings } from "../../shared/config";
import type { RecipeResponse } from "../../shared/models/recipe";

const RecipePage: React.FC = () => {
	const { id } = useParams();
	const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
	const imageUrl = `${settings.RECIPE_IMAGES_BASE_URL}/img_${id}`;

	useEffect(() => {
		if (!id) return;

		const fetchRecipe = async () => {
			try {
				const fetchedRecipe = await recipeApi.getById(id);

				setRecipe(fetchedRecipe);
			} catch (err) {
				console.error("Couldn't fetch recipe:", err);
			}
		};

		void fetchRecipe();
	}, [id]);

	if (!recipe) return <LoadingSpinner />;
	return <RecipeView recipe={recipe} imageUrl={imageUrl} />;
};

export default RecipePage;
