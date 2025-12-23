import { useState } from "react";

import DietEditForm from "../../features/recipe_form/components/DietEditor";
import InstructionEditForm from "../../features/recipe_form/components/InstructionsEditor";
import IngredientEditForm from "./components/IngredientEditor";
import GenericButton from "../../shared/components/Generic/Button";
import ImageInput from "../../shared/components/Inputs/ImageInput";

import { imagesApi } from "../../shared/api/endpoints/user_role/images";
import { recipeApi } from "../../shared/api/endpoints/user_role/recipe";

import type { DietCreate } from "../../shared/models/diet";
import type { IngredientQuantity } from "../../shared/models/ingredient";
// import type { RecipeCreate } from "../../shared/models/recipe"; instead use EMPTY_EDIT
import type { Category } from "../../shared/models/enum_utils";

const RecipeEditForm: React.FC = () => {
	// Use Empty Recipe Object as Initial State => already used in View Page
	const recipe = {
		title: "",
		description: "",
		instructions: [], // done
		diet: [], // done
		ingredient: [], // done
		category: "BBQ", // need to adjust backend for multiple categories []
	};

	const [image, setImage] = useState<File | null>(null);

	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [instructions, setInstructions] = useState<string[]>([]);
	const [diet, setDiet] = useState<DietCreate[]>([]);
	const [ingredient, setIngredient] = useState<IngredientQuantity[]>([]);
	const [category, setCategory] = useState<Category>("BBQ"); // need to adjust backend for multiple categories
	// const [category, setCategory] = useState<Category[]>([]);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const fullRecipe = {
			...recipe,
			title,
			description,
			instructions,
			diet,
			ingredient,
			category,
		};
		// TODO: Add form validation

		try {
			console.log("Creating recipe", fullRecipe);
			const recipeResponse = await recipeApi.create(fullRecipe);
			console.log("Recipe created", recipeResponse);

			// Separet image upload component needed here (async)
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
						value={title}
						onChange={(e) => setTitle(e.target.value)}
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
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full border rounded px-3 py-2"
						placeholder="Write a short description..."
					/>
				</div>
				<DietEditForm dietList={diet} onChange={setDiet} />
				<IngredientEditForm ingredientList={ingredient} onChange={setIngredient} />
				<InstructionEditForm instructionList={instructions} onChange={setInstructions} />

				<GenericButton type="submit">Submit Recipe</GenericButton>
			</form>
		</div>
	);
};

export default RecipeEditForm;
