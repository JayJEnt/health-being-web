import { useCallback } from "react";
import { useParams } from "react-router-dom";
import RecipeView from "../../features/recipeView/RecipeView";
import { recipeApi } from "../../shared/api/endpoints/public/recipe";
import { AsyncState } from "../../shared/components/AsyncState/AsyncState";
import { settings } from "../../shared/config";
import { useAsync } from "../../shared/hooks/useAsync";
import type { RecipeResponse } from "../../shared/models/recipe";

const RecipePage: React.FC = () => {
	const { id } = useParams();
	const safeId = id || ""; // TODO: Handle it more gracefully
	const imageUrl = `${settings.RECIPE_IMAGES_BASE_URL}/img_${safeId}`;

	const fetchRecipe = useCallback(() => recipeApi.getById(safeId), [safeId]);

	const { data: recipe, loading, error } = useAsync<RecipeResponse>(fetchRecipe);

	return (
		<AsyncState isLoading={loading} hasNoResults={!recipe} error={error}>
			{recipe && <RecipeView recipe={recipe} imageUrl={imageUrl} />}
		</AsyncState>
	);
};

export default RecipePage;
