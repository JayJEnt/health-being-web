import RecipeEditForm from "../../features/recipeEditForm/RecipeEditForm";

const RecipeSubmitPage: React.FC = () => {
	return (
		<div className="max-w-3xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Submit a Recipe</h1>

			<RecipeEditForm />
		</div>
	);
};

export default RecipeSubmitPage;
