import { useState } from "react";
import RecipeSteps from "../features/recipe/RecipeSteps";
import { imagesApi } from "../shared/api/endpoints/user_role/images";
import { recipeApi } from "../shared/api/endpoints/user_role/recipe";
import type { IngredientQuantity } from "../shared/api/models/ingredient";
import type { RecipeCreate } from "../shared/api/models/recipe";
import DietTypeInput from "../shared/components/Inputs/DietTypeInput";
import ImageInput from "../shared/components/Inputs/ImageInput";
import IngredientsInput from "../shared/components/Inputs/IngredientsInput";

const RecipeSubmitPage: React.FC = () => {
	const [recipe, setRecipe] = useState<RecipeCreate>({
		title: "",
		description: "",
		instructions: [],
		diet: [],
		ingredient: [],
		category: "Snack",
	});
	const [ingredients, setIngredients] = useState<IngredientQuantity[]>([]);
	const [image, setImage] = useState<File | null>(null);

	function onIngredientsAdd(ingredientQuantity: IngredientQuantity) {
		setIngredients((prev) => [...prev, ingredientQuantity]);
	}

	function onIngredientsDelete(index: number) {
		setIngredients((prev) => prev.filter((_, i) => i !== index));
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!recipe) return;

		try {
			setRecipe((prev) => ({ ...prev, ingredients: ingredients }));
			const recipeResponse = await recipeApi.create(recipe);
			if (!recipeResponse) return;
			if (image) {
				const formData = new FormData();
				formData.append("file", image);

				const imageResponse = await imagesApi.upload(String(recipeResponse.id), formData);
				console.log("Image uploaded", imageResponse);
			}

			console.log("Recipe uploaded", recipeResponse);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div className="max-w-3xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Submit a Recipe</h1>

			<form className="flex flex-col gap-8" onSubmit={void handleSubmit}>
				<ImageInput setImage={setImage} />
				<div>
					<label htmlFor="title" className="block text-lg font-semibold mb-1">
						Recipe Title
					</label>
					<input
						id="title"
						type="text"
						value={recipe.title}
						onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
						className="w-full border rounded px-3 py-2"
						placeholder="e.g. Pasta Carbonara"
					/>
				</div>

				<div>
					<label htmlFor="description" className="block text-lg font-semibold mb-1">
						Description
					</label>
					<textarea
						id="description"
						rows={4}
						value={recipe.description}
						onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
						className="w-full border rounded px-3 py-2"
						placeholder="Write a short description..."
					/>
				</div>
				<DietTypeInput recipe={recipe} setRecipe={setRecipe} />
				<IngredientsInput
					items={ingredients}
					onAdd={onIngredientsAdd}
					onDelete={onIngredientsDelete}
				/>
				<RecipeSteps recipe={recipe} setRecipe={setRecipe} />

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
