import { useState } from "react";
import { imagesApi } from "../../shared/api/endpoints/user_role/images";
import { recipeApi } from "../../shared/api/endpoints/user_role/recipe";
import SubmitButton from "../../shared/components/Buttons/SubmitButton";
import ImageInput from "../../shared/components/Inputs/ImageInput";
import type { DietCreate } from "../../shared/models/diet";
import type { Category } from "../../shared/models/enum_utils";
import type { IngredientQuantity } from "../../shared/models/ingredient";
import { EMPTY_RECIPE, type RecipeCreate, type RecipeResponse } from "../../shared/models/recipe";
import CategoryEditForm from "./components/Editors/CategoryEditor";
import DietEditForm from "./components/Editors/DietEditor";
import IngredientEditForm from "./components/Editors/IngredientEditor";
import InstructionEditForm from "./components/Editors/InstructionsEditor";
import DescriptionInput from "./components/Inputs/DescriptionInput";
import TitleInput from "./components/Inputs/TitleInput";

const RecipeEditForm: React.FC = () => {
	let recipe: RecipeCreate = EMPTY_RECIPE;

	const [image, setImage] = useState<File | null>(null);

	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [instructions, setInstructions] = useState<string[]>([]);
	const [diet, setDiet] = useState<DietCreate[]>([]);
	const [ingredient, setIngredient] = useState<IngredientQuantity[]>([]);
	const [category, setCategory] = useState<Category[]>([]);

	async function uploadImage(image: File, recipeId: number) {
		const formData = new FormData();
		formData.append("file", image);

		const imageResponse = await imagesApi.upload(String(recipeId), formData);
		console.log("Image uploaded", imageResponse);
	}

	async function uploadRecipe(recipe: RecipeCreate): Promise<RecipeResponse> {
		console.log("Creating recipe", recipe);

		const recipeResponse = await recipeApi.create(recipe);
		console.log("Recipe created", recipeResponse);

		return recipeResponse;
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		// TODO: Add form validation (to rethink)
		recipe = { ...recipe, title, description, instructions, diet, ingredient, category };

		try {
			const recipeResponse: RecipeResponse = await uploadRecipe(recipe);

			if (image) await uploadImage(image, recipeResponse.id);

			console.log("Recipe and image uploaded", recipeResponse);
		} catch (err) {
			console.log("Occured error while submitting recipe or image", err);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-8">
			<ImageInput setImage={setImage} />

			<TitleInput title={title} onChange={setTitle} />
			<DescriptionInput description={description} onChange={setDescription} />
			<DietEditForm dietList={diet} onChange={setDiet} />
			<CategoryEditForm categoryList={category} onChange={setCategory} />
			<IngredientEditForm ingredientList={ingredient} onChange={setIngredient} />
			<InstructionEditForm instructionList={instructions} onChange={setInstructions} />

			<SubmitButton>Submit Recipe</SubmitButton>
		</form>
	);
};

export default RecipeEditForm;
