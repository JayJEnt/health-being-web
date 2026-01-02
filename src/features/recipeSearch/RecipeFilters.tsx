import type React from "react";
import GenericButton from "../../shared/components/Buttons/Button";
import type { RecipeFilter } from "../../shared/models/recipe";

export const filterLabels: Record<keyof RecipeFilter, string> = {
	allergies_off: "Exclude allergies",
	dislike_off: "Exclude dislikes",
	only_favourite_ingredients: "Favourite ingredients",
	only_favourite_diets: "Favourite diets",
	only_followed_authors: "Followed authors",
	only_owned_ingredients: "Owned ingredients",
};

interface RecipeFiltersProps {
	filters: RecipeFilter;
	setFilters: React.Dispatch<React.SetStateAction<RecipeFilter>>;
}

const RecipeFilters: React.FC<RecipeFiltersProps> = ({ filters, setFilters }) => {
	const handleClearFilters = () => {
		const resetFilters = {} as RecipeFilter;
		(Object.keys(filterLabels) as Array<keyof RecipeFilter>).forEach((key) => {
			resetFilters[key] = false;
		});
		setFilters(resetFilters);
	};

	return (
		<div className="sticky top-24 flex h-[calc(100vh-8rem)] flex-col">
			<div className="flex-1">
				<h3 className="mb-4 text-lg font-semibold text-gray-800">Advanced Filters</h3>
				<div className="flex flex-col gap-3">
					{(Object.keys(filterLabels) as Array<keyof RecipeFilter>).map((filterKey) => (
						<label
							key={filterKey}
							className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
						>
							<input
								type="checkbox"
								checked={filters[filterKey] ?? false}
								onChange={(e) => setFilters((prev) => ({ ...prev, [filterKey]: e.target.checked }))}
								className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
							/>
							<span className="text-sm text-gray-700">{filterLabels[filterKey]}</span>
						</label>
					))}
				</div>
			</div>
			<div className="mt-6 border-t border-gray-100 pt-4">
				<GenericButton
					onClick={handleClearFilters}
					className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					Clear All Filters
				</GenericButton>
			</div>
		</div>
	);
};

export default RecipeFilters;
