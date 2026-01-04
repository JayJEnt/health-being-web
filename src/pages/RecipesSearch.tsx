import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { recipeApi } from "../shared/api/endpoints/public/recipe";
import { recipeApi as recipeApiUser } from "../shared/api/endpoints/user_role/recipe";
import { AsyncState } from "../shared/components/AsyncState/AsyncState";
import { LoadingSpinner } from "../shared/components/Loading/LoadingSpinner";
import RecipeOverviewCard from "../shared/components/RecipeOverview/RecipeOverview";
import { settings } from "../shared/config";
import { useAuth } from "../shared/hooks/useAuth";
import type { RecipeFilter, RecipeOverview } from "../shared/models/recipe";

const RecipesSearch: React.FC = () => {
	const { user } = useAuth();
	const { phrase } = useParams();
	const [results, setResults] = useState<RecipeOverview[]>([]);
	const [displayedRecipes, setDisplayedRecipes] = useState<RecipeOverview[]>([]);
	const [page, setPage] = useState<number>(1);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [isLoopingMode, setIsLoopingMode] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [loadingMore, setLoadingMore] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const sentinelRef = useRef<HTMLDivElement>(null);
	const isLoadingRef = useRef(false);
	const navigate = useNavigate();

	const filterLabels: Record<keyof RecipeFilter, string> = {
		allergies_off: "Exclude allergies",
		dislike_off: "Exclude dislikes",
		only_favourite_ingredients: "Favourite ingredients",
		only_favourite_diets: "Favourite diets",
		only_followed_authors: "Followed authors",
		only_owned_ingredients: "Owned ingredients",
	};

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
				if (err instanceof Error) {
					setError(err);
				} else {
					setError(new Error("Unknown error, please try again later."));
				}
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
		<main>
			{user && (
				<header className="sticky top-0 z-10 w-full bg-white py-6 shadow-md">
					{/* Deep search filters */}
					<div className="flex flex-col gap-4">
						<div className="px-8">
							<div className="mx-auto max-w-4xl rounded-lg border border-gray-200 bg-gray-50 p-4">
								<h3 className="mb-3 text-sm font-semibold text-gray-700">Advanced Filters</h3>
								<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
									{(Object.keys(filterLabels) as Array<keyof RecipeFilter>).map((filterKey) => (
										<label
											key={filterKey}
											className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
										>
											<input
												type="checkbox"
												checked={filters[filterKey] ?? false}
												onChange={(e) =>
													setFilters((prev) => ({ ...prev, [filterKey]: e.target.checked }))
												}
												className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
											/>
											<span>{filterLabels[filterKey]}</span>
										</label>
									))}
								</div>
							</div>
						</div>
					</div>
				</header>
			)}

			<section className="container mx-auto px-4">
				<AsyncState isLoading={loading} hasNoResults={results.length === 0} error={error}>
					{/* Results */}
					<ul
						aria-label="Recipe grid"
						className="mx-auto mt-8 grid max-w-7xl grid-cols-3 gap-6 p-4"
					>
						{displayedRecipes.map((recipe, index) => (
							<li key={`${recipe.id}-${index}`}>
								<RecipeOverviewCard
									title={recipe.title}
									description={recipe.description}
									image={`${settings.RECIPE_IMAGES_BASE_URL}/img_${recipe.id}`}
									onClick={() => navigate(`/recipe/${recipe.id}`)}
								/>
							</li>
						))}
					</ul>

					{/* Loading more*/}
					{loadingMore && <LoadingSpinner />}

					{/* Sentinel element for infinite scroll */}
					<div ref={sentinelRef} className="h-20 w-full" aria-hidden="true" />
				</AsyncState>
			</section>
		</main>
	);
};

export default RecipesSearch;
