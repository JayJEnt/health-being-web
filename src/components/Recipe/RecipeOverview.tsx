import type { RecipeResponse } from "../../types/recipe";

type Props = {
    recipe: RecipeResponse;
    imageUrl: string | null;
    handleEdit?: () => void;
};

const RecipeOverview: React.FC<Props> = ({ recipe, imageUrl, handleEdit }) => {
    return (
        <div className="min-h-screen p-6 bg-light-main-bg dark:bg-dark-main-bg">
            <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <img
                        src={imageUrl ? imageUrl : "/PlaceHolder.png"}
                        alt="Zdjęcie przepisu"
                        className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow border"
                    />
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold">{recipe.title}</h1>
                        {handleEdit && (
                            <button
                                onClick={handleEdit}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Edit
                            </button>
                        )}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {recipe.description}
                    </p>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">Diet types:</h2>
                        <ul className="flex flex-wrap gap-2">
                            {recipe.diet_type?.map((diet, index) => (
                                <li
                                    key={index}
                                    className="px-3 py-1 bg-green-100 dark:bg-green-800 text-sm rounded-full"
                                >
                                    {diet.diet_name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex items-center justify-between px-5 py-4">
                        <h2 className="text-xl font-semibold">Instructions</h2>
                        <span
                            className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium
                     text-gray-700 dark:text-gray-200"
                        >
                            {recipe.instructions?.length ?? 0} steps
                        </span>
                    </div>

                    <hr className="border-t border-gray-200 dark:border-gray-700" />

                    {recipe.instructions && recipe.instructions.length > 0 && (
                        <ol className="px-5 py-4 space-y-4">
                            {recipe.instructions.map((step, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span
                                        className="flex-none w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-semibold
                       grid place-items-center mt-0.5"
                                    >
                                        aria-label={`Krok ${index + 1}`}v{index + 1}
                                    </span>
                                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                                        {step}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">Ingredients:</h2>
                    <ul className="space-y-3">
                        {recipe.ingredients?.map((ingredient) => (
                            <li
                                key={ingredient.name}
                                className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow"
                            >
                                <span className="font-medium">{ingredient.name}</span> –{" "}
                                {ingredient.amount} {ingredient.measure_unit}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default RecipeOverview;
