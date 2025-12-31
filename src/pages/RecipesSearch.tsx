import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import RecipeFilters, { filterLabels } from "../features/recipe/RecipeFilters";
import { recipeApi } from "../shared/api/endpoints/public/recipe";
import { recipeApi as recipeApiUser } from "../shared/api/endpoints/user_role/recipe";
import GenericButton from "../shared/components/Buttons/Button";
import LoadingSpinner from "../shared/components/Loading/LoadingSpinner";
import RecipeOverviewCard from "../shared/components/RecipeOverview/RecipeOverview";
import { settings } from "../shared/config";
import { useAuth } from "../shared/hooks/useAuth";
import type { RecipeFilter, RecipeOverview } from "../shared/models/recipe";

const RecipesSearch: React.FC = () => {
	const { user } = useAuth();
	const { phrase } = useParams();
	const [results, setResults] = useState<RecipeOverview[]>([]);
	const [displayedRecipes, setDisplayedRecipes] = useState<RecipeOverview[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [isLoopingMode, setIsLoopingMode] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const sentinelRef = useRef<HTMLDivElement>(null);
	const isLoadingRef = useRef(false);

	const [filters, setFilters] = useState<RecipeFilter>(() => {
		const initial = {} as RecipeFilter;
		(Object.keys(filterLabels) as Array<keyof RecipeFilter>).forEach((key) => {
			initial[key] = false;
		});
		return initial;
	});

	const loadRecipes = useCallback(
		async (searchPhrase?: string) => {
			setLoading(true);
			setError(null);

			try {
				const res: RecipeOverview[] = await (user
					? recipeApiUser.deepSearch(searchPhrase ?? "", filters)
					: recipeApi.search(searchPhrase ?? ""));
				if (Array.isArray(res)) {
					setResults(res);
					setPage(1);

					const shouldLoop = res.length < settings.RECIPES_PAGE_SIZE && res.length > 0;
					setIsLoopingMode(shouldLoop);
					setDisplayedRecipes(res);

					if (shouldLoop) {
						setHasMore(true);
					} else {
						setHasMore(res.length === settings.RECIPES_PAGE_SIZE);
					}
				}
			} catch (err) {
				console.error("Failed to load recipes", err);
				setError("Failed to load recipes. Please try again later.");
			} finally {
				setLoading(false);
			}
		},
		[filters, user],
	);

	useEffect(() => {
		void loadRecipes(phrase);
	}, [phrase, loadRecipes]);

	const loadMore = useCallback(
		async (searchPhrase?: string) => {
			if (loadingMore || !hasMore || isLoadingRef.current) return;
			isLoadingRef.current = true;
			setLoadingMore(true);

			try {
				if (isLoopingMode) {
					await new Promise((resolve) => setTimeout(resolve, 500));
					setDisplayedRecipes((prev) => [...prev, ...results]);
				} else {
					const nextPage = page + 1;
					const res = user
						? await recipeApiUser.deepSearch(searchPhrase || "", filters)
						: await recipeApi.search(searchPhrase || "");
					if (Array.isArray(res)) {
						setResults((prev) => [...prev, ...res]);
						setDisplayedRecipes((prev) => [...prev, ...res]);
						setPage(nextPage);
						setHasMore(res.length === settings.RECIPES_PAGE_SIZE);
					}
				}
			} catch (err) {
				console.error("Failed to load more recipes", err);
			} finally {
				setLoadingMore(false);
				isLoadingRef.current = false;
			}
		},
		[loadingMore, hasMore, page, isLoopingMode, results, user, filters],
	);

	// Infinite scroll
	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel || displayedRecipes.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					void loadMore(phrase);
				}
			},
			{
				threshold: 0.1,
				rootMargin: "100px",
			},
		);

		observer.observe(sentinel);

		return () => {
			observer.disconnect();
		};
	}, [displayedRecipes, loadMore, phrase]);

	return (
		<div className="flex flex-col md:flex-row min-h-full">
			{user && (
				<aside className="w-full md:w-64 flex-shrink-0 border-r border-gray-200 bg-white p-6">
					<RecipeFilters filters={filters} setFilters={setFilters} />
				</aside>
			)}

			<section className="flex-1 px-4 py-6 md:px-8">
				{/* Loading */}
				{loading && <LoadingSpinner>Fetching recipes...</LoadingSpinner>}

				{/* Error */}
				{error && (
					<div className="py-8 text-center">
						<p className="mb-4 text-red-600">{error}</p>
						<GenericButton
							onClick={loadRecipes}
							className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
						>
							Try again
						</GenericButton>
					</div>
				)}

				{/* No results */}
				{!loading && !error && results.length === 0 && (
					<div className="py-8 text-center text-gray-600">
						<p>No recipes found matching your search criteria</p>
					</div>
				)}

				{/* Display found recipes */}
				{!loading && !error && displayedRecipes.length > 0 && (
					<>
						<ul
							aria-label="Recipe grid"
							className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
						>
							{displayedRecipes.map((recipe, index) => (
								<li key={`${recipe.id}-${index}`}>
									<RecipeOverviewCard
										title={recipe.title}
										description={recipe.description}
										image={`${settings.RECIPE_IMAGES_BASE_URL}/img_${recipe.id}`}
									/>
								</li>
							))}
						</ul>

						{/* Loading */}
						{loadingMore && <LoadingSpinner>Fetching recipes...</LoadingSpinner>}

						{/* Sentinel element for infinite scroll */}
						<div ref={sentinelRef} className="h-20 w-full" aria-hidden="true" />
					</>
				)}
			</section>
		</div>
	);
};

export default RecipesSearch;
