import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { recipeApi } from '../api/endpoints/public/recipe';
import { recipeApi as recipeApiUser } from '../api/endpoints/user_role/recipe';
import type { RecipeFilter, RecipeOverview } from '../api/models/recipe';
import { useAuth } from '../auth/useAuth';
import ButtonComponent from '../components/GenericComponents/ButtonComponent';
import LoadingComponent from '../components/Loading/LoadingComponent';
import { settings } from '../config';

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
        const res: RecipeOverview[] = await (user
          ? recipeApiUser.deepSearch(searchPhrase ?? '', filters)
          : recipeApi.search(searchPhrase ?? ''));
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
        console.error('Failed to load recipes', err);
        setError('Failed to load recipes. Please try again later.');
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
            ? await recipeApiUser.deepSearch(searchPhrase || '', filters)
            : await recipeApi.search(searchPhrase || '');
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
        rootMargin: '100px',
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
        {/* Loading */}
        {loading && <LoadingComponent>Fetching recipes...</LoadingComponent>}

        {/* Error */}
        {error && (
          <div className="py-8 text-center">
            <p className="mb-4 text-red-600">{error}</p>
            <ButtonComponent
              handler={() => loadRecipes}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Try again
            </ButtonComponent>
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

            {/* Loading */}
            {loadingMore && <LoadingComponent>Fetching recipes...</LoadingComponent>}

            {/* Sentinel element for infinite scroll */}
            <div ref={sentinelRef} className="h-20 w-full" aria-hidden="true" />
          </>
        )}
      </section>
    </main>
  );
};

export default RecipesSearch;
