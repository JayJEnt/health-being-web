import React, { useCallback, useEffect, useRef, useState } from 'react';

import { recipeApi } from '../api/endpoints/public/recipe';
import { recipeApi as recipeApiUser } from '../api/endpoints/user_role/recipe';
import type { RecipeFilter, RecipeOverview } from '../api/models/recipe';
import { useAuth } from '../auth/useAuth';
import { settings } from '../config';

const RecipesSearch: React.FC = () => {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
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

  // Deep search filters
  const filterLabels: Record<keyof RecipeFilter, string> = {
    allergies_off: 'Exclude allergies',
    dislike_off: 'Exclude dislikes',
    only_favourite_ingredients: 'Favourite ingredients',
    only_favourite_diets: 'Favourite diets',
    only_followed_authors: 'Followed authors',
    only_owned_ingredients: 'Owned ingredients',
  };

  const [filters, setFilters] = useState<RecipeFilter>(() =>
    Object.keys(filterLabels).reduce((acc, key) => ({ ...acc, [key]: false }), {} as RecipeFilter),
  );

  const loadRecipes = useCallback(
    async (searchPhrase?: string) => {
      setLoading(true);
      setError(null);
      try {
        let res: RecipeOverview[];

        // Use deep search if user is logged in, otherwise use public search
        if (user) {
          const deepSearchResult = await recipeApiUser.deep_search(searchPhrase || '', filters);
          res = Array.isArray(deepSearchResult) ? deepSearchResult : [deepSearchResult];
        } else {
          res = await recipeApi.getByPhrase(searchPhrase || '', {
            page: 1,
            limit: settings.RECIPES_PAGE_SIZE,
          });
        }

        if (Array.isArray(res)) {
          setResults(res);
          setPage(1);

          // If we have fewer results than settings.RECIPES_PAGE_SIZE, enable looping mode
          const shouldLoop = res.length < settings.RECIPES_PAGE_SIZE && res.length > 0;
          setIsLoopingMode(shouldLoop);

          if (shouldLoop) {
            // In looping mode, display multiple copies to fill the screen
            setDisplayedRecipes(res);
            setHasMore(true); // Always has more in looping mode
          } else {
            // In normal pagination mode
            setDisplayedRecipes(res);
            setHasMore(res.length === settings.RECIPES_PAGE_SIZE);
          }
        }
      } catch (err) {
        console.error('Failed to load recipes', err);
        setError('Failed to load recipes. Please try again later.');
      } finally {
        setLoading(false);
      }
    },
    [filters, user],
  );

  useEffect(() => {
    void loadRecipes();
  }, [loadRecipes]);

  // Debounce search input to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      void loadRecipes(query || undefined);
    }, 300); // Wait 300ms after last keystroke before searching

    return () => clearTimeout(timer);
  }, [query, loadRecipes]);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore || isLoadingRef.current) return;
    isLoadingRef.current = true;
    setLoadingMore(true);

    try {
      if (isLoopingMode) {
        // In looping mode: just append another copy of results (no API call)
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate loading delay
        setDisplayedRecipes((prev) => [...prev, ...results]);
      } else {
        // In normal pagination mode: fetch next page from backend
        const nextPage = page + 1;
        let res: RecipeOverview[];

        if (user) {
          const deepSearchResult = await recipeApiUser.deep_search(query || '', filters);
          res = Array.isArray(deepSearchResult) ? deepSearchResult : [deepSearchResult];
        } else {
          res = await recipeApi.getByPhrase(query || '', {
            page: nextPage,
            limit: settings.RECIPES_PAGE_SIZE,
          });
        }

        if (Array.isArray(res)) {
          setResults((prev) => [...prev, ...res]);
          setDisplayedRecipes((prev) => [...prev, ...res]);
          setPage(nextPage);
          setHasMore(res.length === settings.RECIPES_PAGE_SIZE);
        }
      }
    } catch (err) {
      console.error('Failed to load more recipes', err);
    } finally {
      setLoadingMore(false);
      isLoadingRef.current = false;
    }
  }, [loadingMore, hasMore, page, query, isLoopingMode, results, user, filters]);

  // Infinite scroll: load next page when sentinel is visible
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || displayedRecipes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          void loadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px', // Start loading before reaching the sentinel
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [displayedRecipes, loadMore]);

  return (
    <main>
      <header className="sticky top-0 z-10 w-full bg-white py-6 shadow-md">
        <div className="flex flex-col gap-4">
          <div className="px-8">
            <input
              id="search"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-4 text-lg
                         transition-all focus:border-blue-500 focus:bg-white focus:shadow-sm focus:outline-none
                         focus:ring-2 focus:ring-blue-100"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                // Search immediately on empty query to show all recipes
                if (!e.target.value) {
                  void loadRecipes();
                }
              }}
              placeholder="Search by name, ingredients or description..."
              aria-label="Search recipes"
            />
          </div>

          {/* Deep search filters - only visible for authenticated users */}
          {user && (
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
          )}
        </div>
      </header>

      <section className="container mx-auto px-4">
        {loading && (
          <div className="py-8 text-center text-gray-600">
            <p>Loading recipes...</p>
          </div>
        )}

        {error && (
          <div className="py-8 text-center">
            <p className="mb-4 text-red-600">{error}</p>
            <button
              onClick={() => void loadRecipes()}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && results.length === 0 && (
          <div className="py-8 text-center text-gray-600">
            <p>No recipes found matching your search criteria</p>
          </div>
        )}

        {!loading && !error && displayedRecipes.length > 0 && (
          <>
            <div
              role="list"
              aria-label="Recipe grid"
              className="mx-auto mt-8 grid max-w-7xl grid-cols-3 gap-6 p-4"
            >
              {displayedRecipes.map((recipe, index) => (
                <article
                  key={`${recipe.id}-${index}`}
                  className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl
                           transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
                           animate-fade-in"
                  style={{
                    animationDelay: `${(index % (isLoopingMode ? results.length : settings.RECIPES_PAGE_SIZE)) * 50}ms`,
                  }}
                  aria-labelledby={`title-${recipe.id}-${index}`}
                  tabIndex={0}
                >
                  <img
                    src={`/api/recipes/${recipe.id}/image`}
                    alt={recipe.title}
                    className="h-full w-full rounded-xl object-cover"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent
                                via-black/60 to-black/90 p-6 text-white opacity-0 transition-all duration-300
                                group-hover:opacity-100"
                  >
                    <h2
                      id={`title-${recipe.id}-${index}`}
                      className="mb-2 translate-y-5 text-xl font-semibold opacity-0 transition-all duration-300
                               group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      {recipe.title}
                    </h2>
                  </div>
                </article>
              ))}
            </div>

            {/* Loading indicator */}
            {loadingMore && (
              <div className="py-8 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                <p className="mt-2 text-sm text-gray-600">Loading more recipes...</p>
              </div>
            )}

            {/* Sentinel element for infinite scroll */}
            <div ref={sentinelRef} className="h-20 w-full" aria-hidden="true" />
          </>
        )}
      </section>
    </main>
  );
};

export default RecipesSearch;
