import { useState } from "react";

import RecipeSteps from "../features/recipe/RecipeSteps";

import { imagesApi } from "../shared/api/endpoints/user_role/images";
import { recipeApi } from "../shared/api/endpoints/user_role/recipe";
import GenericButton from "../shared/components/Generic/Button";
import GenericInputLabel from "../shared/components/Generic/InputLabel";
import DietTypeInput from "../shared/components/Inputs/DietTypeInput";
import ImageInput from "../shared/components/Inputs/ImageInput";
import IngredientsInput from "../shared/components/Inputs/IngredientsInput";
import type { IngredientQuantity } from "../shared/models/ingredient";
import type { RecipeCreate } from "../shared/models/recipe";

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

		try {
			const payload = { ...recipe, ingredient: ingredients };
			const recipeResponse = await recipeApi.create(payload);
			if (!recipeResponse) return;

			if (image) {
				const formData = new FormData();
				formData.append("file", image);
				await imagesApi.upload(String(recipeResponse.id), formData);
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
				<GenericInputLabel
					id="title"
					label="Recipe Title"
					labelVariant="lg"
					value={recipe.title}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setRecipe({ ...recipe, title: e.target.value })
					}
					placeholder="e.g. Pasta Carbonara"
				/>
				<div className="flex flex-col gap-1">
					<label htmlFor="description" className="text-lg font-semibold text-gray-700">
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

				<GenericButton type="submit">Submit Recipe</GenericButton>
			</form>
		</div>
	);
};

export default RecipeSubmitPage;
