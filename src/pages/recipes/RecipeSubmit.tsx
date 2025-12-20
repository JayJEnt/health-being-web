import { useState } from "react";
import DietsEditor from "../../features/recipe_form/components/DietEditor";
import InstructionsEditor from "../../features/recipe_form/components/InstructionsEditor";

import { imagesApi } from "../../shared/api/endpoints/user_role/images";
import { recipeApi } from "../../shared/api/endpoints/user_role/recipe";
import GenericButton from "../../shared/components/Generic/Button";
import ImageInput from "../../shared/components/Inputs/ImageInput";
import IngredientsInput from "../../shared/components/Inputs/IngredientsInput";
import type { DietCreate } from "../../shared/models/diet";
import type { IngredientQuantity } from "../../shared/models/ingredient";
import type { RecipeCreate } from "../../shared/models/recipe";

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
	const [instructions, setInstructions] = useState<string[]>([]);
	const [diet, setDiet] = useState<DietCreate[]>([]);

	function onIngredientsAdd(ingredientQuantity: IngredientQuantity) {
		setIngredients((prev) => [...prev, ingredientQuantity]);
	}

	function onIngredientsDelete(index: number) {
		setIngredients((prev) => prev.filter((_, i) => i !== index));
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const fullRecipe = { ...recipe, instructions, diet, ingredient: ingredients };
		if (!fullRecipe) return;

		try {
			console.log("Creating recipe", fullRecipe);
			const recipeResponse = await recipeApi.create(fullRecipe);
			console.log("Recipe created", recipeResponse);
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

			<form className="flex flex-col gap-8" onSubmit={handleSubmit}>
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
				<DietsEditor dietList={diet} onChange={setDiet} />
				<IngredientsInput
					items={ingredients}
					onAdd={onIngredientsAdd}
					onDelete={onIngredientsDelete}
				/>
				<InstructionsEditor instructions={instructions} onChange={setInstructions} />

				<GenericButton type="submit">Submit Recipe</GenericButton>
			</form>
		</div>
	);
};

export default RecipeSubmitPage;
