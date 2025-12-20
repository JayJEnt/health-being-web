import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { imagesApi } from "../../shared/api/endpoints/public/images";
import { recipeApi } from "../../shared/api/endpoints/public/recipe";
import { imagesApi as imagesApiUser } from "../../shared/api/endpoints/user_role/images";
import { recipeApi as recipesApiUser } from "../../shared/api/endpoints/user_role/recipe";
import GenericButton from "../../shared/components/Generic/Button";
import ImageInput from "../../shared/components/Inputs/ImageInput";
import IngredientsInput from "../../shared/components/Inputs/IngredientsInput";
import { useAuth } from "../../shared/hooks/useAuth";
import type { IngredientQuantity } from "../../shared/models/ingredient";
import type { RecipeResponse } from "../../shared/models/recipe";
import RecipeView from "./RecipeView";

export type RecipeEditPayload = Omit<RecipeResponse, "id">;

const EMPTY_EDIT: RecipeEditPayload = {
	title: "",
	author_id: 0,
	description: "",
	instructions: [],
	diet: [],
	ingredient: [],
	category: "Snack",
};

const RecipePage: React.FC = () => {
	const { user } = useAuth();
	const { id } = useParams();
	const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
	const [isLiked, setIsLiked] = useState<boolean>(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const [newImageFile, setNewImageFile] = useState<File | null>(null);
	const [newImagePreviewUrl, setNewImagePreviewUrl] = useState<string | null>(null);

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
				const recipePromise = recipeApi.getById(id);
				const imagePromise = imagesApi.download(id);

				const [fetchedRecipe, fetchedImage] = await Promise.all([recipePromise, imagePromise]);
				setRecipe(fetchedRecipe);
				const url = URL.createObjectURL(fetchedImage);
				objectUrlToRevoke = url;
				setImageUrl(url);
			} catch (err) {
				console.error("Couldn't fetch recipe or image:", err);
			}
		};
		void fetchRecipe();

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
			const saved = await recipesApiUser.update(id, newRecipe);
			if (!saved) throw new Error("Brak odpowiedzi z PUT");

			if (newImageFile) {
				const form = new FormData();
				form.append("file", newImageFile);
				await imagesApiUser.upload(id, form);
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

	const onIngredientsAdd = (ingredientQuantity: IngredientQuantity) => {
		setNewRecipe((prev) => ({
			...prev,
			ingredients: [...prev.ingredient, ingredientQuantity],
		}));
	};

	const onIngredientsDelete = (index: number) => {
		setNewRecipe((prev) => ({
			...prev,
			ingredients: prev.ingredient.filter((_, i) => i !== index),
		}));
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
								onChange={(e) => setNewRecipe((prev) => ({ ...prev, title: e.target.value }))}
							/>
							<div className="flex gap-2">
								<GenericButton type="button" disabled={isSaving} onClick={handleSave}>
									{isSaving ? "Saving..." : "Save"}
								</GenericButton>
								<GenericButton type="button" onClick={handleCancel}>
									Cancel
								</GenericButton>
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

						{/* <DietTypeInput recipe={newRecipe} setRecipe={setNewRecipe} /> */}
						{/* <RecipeSteps recipe={newRecipe} setRecipe={setNewRecipe} /> */}
					</div>

					<div className="flex flex-col gap-6">
						<IngredientsInput
							items={newRecipe.ingredient}
							onAdd={onIngredientsAdd}
							onDelete={onIngredientsDelete}
						/>

						<ImageInput setImage={setNewImageFile} />
					</div>
				</div>
			</div>
		);
	}

	return (
		<RecipeView
			recipe={recipe}
			imageUrl={imageUrl}
			isLiked={isLiked}
			setIsLiked={setIsLiked}
			handleEdit={user?.id === recipe.author_id ? handleEdit : undefined}
		/>
	);
};

export default RecipePage;
