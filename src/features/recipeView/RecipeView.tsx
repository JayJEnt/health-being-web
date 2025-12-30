import type { RecipeResponse } from "../../shared/models/recipe";
import CategoryList from "./components/CategoryList";
import DietList from "./components/DietList";
import IngredientList from "./components/IngredientList";
import InstructionList from "./components/InstructionList";
import MicronutrientsList from "./components/MicronutrientsList";

type Props = {
	recipe: RecipeResponse;
	imageUrl: string;
};

const RecipeView: React.FC<Props> = ({ recipe, imageUrl }) => {
	return (
		<div className="min-h-screen p-6 bg-light-main-bg dark:bg-dark-main-bg">
			<div className="grid lg:grid-cols-3 gap-10">
				<div className="lg:col-span-2 flex flex-col gap-6">
					{/* TODO: Change img, title, description into one RecipeOverviewCard */}
					<img
						src={imageUrl}
						alt="Recipe"
						className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow border"
					/>
					<div className="flex justify-between">
						<h1 className="text-3xl font-bold">{recipe.title}</h1>
					</div>
					<p className="text-gray-700 dark:text-gray-300 leading-relaxed">{recipe.description}</p>

					<DietList dietList={recipe.diet}></DietList>
					<CategoryList categoryList={recipe.category}></CategoryList>
					<InstructionList instructionList={recipe.instructions}></InstructionList>
				</div>

				<MicronutrientsList micronutrientsList={recipe.micronutrients}></MicronutrientsList>
				<IngredientList ingredientList={recipe.ingredient} />
			</div>
		</div>
	);
};
export default RecipeView;
