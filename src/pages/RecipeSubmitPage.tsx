import { useState } from 'react';

import { imagesApi } from '../api/endpoints/user_role/images';
import { recipeApi } from '../api/endpoints/user_role/recipe';
import type { RecipeCreate } from '../api/models/recipe';
import DietTypeInput from '../components/Recipe/DietTypeInput';
import ImageInput from '../components/Recipe/ImageInput';
import IngredientsInput from '../components/Recipe/IngredientsInput';
import RecipeSteps from '../components/Recipe/RecipeSteps';

const RecipeSubmitPage: React.FC = () => {
  const [recipe, setRecipe] = useState<RecipeCreate>({
    title: '',
    description: '',
    instructions: [],
    diet: [],
    ingredient: [],
    category: 'Snack',
  });
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipe) return;

    try {
      const recipeResponse = await recipeApi.create(recipe);
      if (!recipeResponse) return;
      if (image) {
        const formData = new FormData();
        formData.append('file', image);

        const imageResponse = await imagesApi.upload(String(recipeResponse.id), formData);
        console.log('Image uploaded', imageResponse);
      }

      console.log('Recipe uploaded', recipeResponse);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Submit a Recipe</h1>

      <form className="flex flex-col gap-8" onSubmit={void handleSubmit}>
        <ImageInput setImage={setImage} />
        <div>
          <label className="block text-lg font-semibold mb-1">Recipe Name</label>
          <input
            type="text"
            value={recipe.title}
            onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. Pasta Carbonara"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-1">Description</label>
          <textarea
            rows={4}
            value={recipe.description}
            onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
            className="w-full border rounded px-3 py-2"
            placeholder="Write a short description..."
          />
        </div>
        <DietTypeInput recipe={recipe} setRecipe={setRecipe} />
        <IngredientsInput recipe={recipe} setRecipe={setRecipe} />
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
