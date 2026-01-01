import RecipeOverviewCard from "../../shared/components/RecipeOverview/RecipeOverview";
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
					<RecipeOverviewCard
						title={recipe.title}
						description={recipe.description}
						image={imageUrl}
					/>
					<DietList dietList={recipe.diet} />
					<CategoryList categoryList={recipe.category} />
					<InstructionList instructionList={recipe.instructions} />
				</div>

				<MicronutrientsList micronutrientsList={recipe.micronutrients} />
				<IngredientList ingredientList={recipe.ingredient} />
			</div>
		</div>
	);
};
export default RecipeView;
