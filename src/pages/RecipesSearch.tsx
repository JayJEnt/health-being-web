import React, { useEffect, useMemo, useRef, useState } from 'react';

import { recipesApi } from '../api/endpoints/public/recipes';
import type { DietTypeCreate } from '../api/models/diet_type';
import type { Recipe } from '../api/models/recipe';
import styles from './RecipesSearch.module.css';

interface ExtendedRecipe extends Recipe {
  diet_type?: DietTypeCreate[] | null;
}

const RecipesSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [dietType, setDietType] = useState('');
  const [results, setResults] = useState<ExtendedRecipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [columns, setColumns] = useState(3);

  const loadRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await recipesApi.getAll();
      if (Array.isArray(res)) {
        setResults(
          (res as Partial<ExtendedRecipe>[]).map((r) => ({
            ...r,
            owner_id: r.owner_id ?? '',
            description: r.description ?? '',
            instructions: r.instructions ?? [],
            diet_type: r.diet_type ?? null,
          })) as ExtendedRecipe[],
        );
      }
    } catch (err) {
      console.error('Failed to load recipes', err);
      setError('Failed to load recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadRecipes();
  }, []);

  // Recipe filtering
  const filtered = useMemo(() => {
    if (!query && !dietType) return results;

    return results.filter((recipe) => {
      // Text filtering
      if (query) {
        const q = query.toLowerCase();
        const searchableText = [recipe.title, recipe.description, ...(recipe.instructions || [])]
          .join(' ')
          .toLowerCase();

        if (!searchableText.includes(q)) {
          return false;
        }
      }

      // Diet type filtering
      if (dietType && recipe.diet_type) {
        const matchingDiet = recipe.diet_type.some(
          (dt: DietTypeCreate) => dt.diet_name.toLowerCase() === dietType.toLowerCase(),
        );
        if (!matchingDiet) {
          return false;
        }
      }

      return true;
    });
  }, [results, query, dietType]);

  // displayed holds the items currently shown in the masonry. We append copies
  // of `filtered` to `displayed` when the sentinel is visible to create a loop.
  const [displayed, setDisplayed] = useState<Recipe[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  // only allow automatic appends after the user has actually scrolled
  const [hasUserScrolled, setHasUserScrolled] = useState(false);

  // Fill the page with recipes on initial load and when filters change
  useEffect(() => {
    // Repeat recipes 20 times on initial load to fill the page
    const repeatedRecipes = Array(20).fill(filtered).flat();
    setDisplayed(repeatedRecipes);
  }, [filtered]);

  // Infinite scroll: append another copy of the filtered items whenever
  // the sentinel element becomes visible (creates looping/repeat behavior)
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Load more when item is 50% visible
          if (entry.isIntersecting && hasUserScrolled && !loadingMore && filtered.length > 0) {
            setLoadingMore(true);
            // Add 10 copies of recipes at once for better infinite effect
            const newBatch = Array(10).fill(filtered).flat() as Recipe[];
            setDisplayed((prev: Recipe[]) => [...prev, ...newBatch]);
            // Shorter delay for smoother operation
            setTimeout(() => setLoadingMore(false), 150);
          }
        });
      },
      {
        root: null,
        // Start loading when user is 150px from the bottom
        rootMargin: '150px',
        // 50% visibility of the element is enough
        threshold: 0.5,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [filtered, loadingMore, hasUserScrolled]);

  // detect first user scroll so we don't auto-load on initial render when the
  // sentinel might already be visible in short viewports
  useEffect(() => {
    if (hasUserScrolled) return;
    const onScroll = () => {
      const scrolled = window.scrollY > 0 || document.documentElement.scrollTop > 0;
      if (scrolled) {
        setHasUserScrolled(true);
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hasUserScrolled]);

  // simple distribution into N columns to mimic masonry structure using plain markup
  const columnsItems = useMemo(() => {
    const cols: Recipe[][] = Array.from({ length: columns }, () => []);
    displayed.forEach((item, idx) => {
      cols[idx % columns].push(item);
    });
    return cols;
  }, [displayed, columns]);

  return (
    <main>
      <header className={styles.searchBar}>
        <div className={styles.searchControls}>
          <div className={styles.searchField}>
            <input
              id="search"
              className={styles.searchInput}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, ingredients or description..."
              aria-label="Search recipes"
            />
          </div>

          <div className={styles.filtersRow}>
            <div className={styles.filterField}>
              <select
                id="columns"
                className={styles.searchSelect}
                value={String(columns)}
                onChange={(e) => setColumns(Number(e.target.value))}
                aria-label="Number of columns"
              >
                <option value="1">1 column</option>
                <option value="2">2 columns</option>
                <option value="3">3 columns</option>
                <option value="4">4 columns</option>
              </select>
            </div>

            <div className={styles.filterField}>
              <select
                id="diet"
                className={styles.searchSelect}
                value={dietType}
                onChange={(e) => setDietType(e.target.value)}
                aria-label="Filter by diet type"
              >
                <option value="">All diets</option>
                <option value="weganskie">Vegan</option>
                <option value="wegetarianskie">Vegetarian</option>
                <option value="ketogeniczne">Ketogenic</option>
                <option value="bezglutenowe">Gluten-free</option>
                <option value="paleo">Paleo</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.resultsContainer}>
        {loading && (
          <div className={styles.message}>
            <p>Loading recipes...</p>
          </div>
        )}

        {error && (
          <div className={styles.message}>
            <p className={styles.error}>{error}</p>
            <button onClick={() => void loadRecipes()} className={styles.retryButton}>
              Try again
            </button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className={styles.message}>
            <p>No recipes found matching your search criteria</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          /* Pinterest-style grid */
          <div
            role="list"
            aria-label="Recipe grid"
            className={styles.grid}
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {columnsItems.map((col, colIdx) => (
              <div key={colIdx} role="listitem" aria-label={`Column ${colIdx + 1}`}>
                {col.map((recipe) => (
                  <article
                    key={recipe.id}
                    className={styles.recipeCard}
                    aria-labelledby={`title-${recipe.id}`}
                    tabIndex={0}
                  >
                    <img
                      src={`/api/recipes/${recipe.id}/image`}
                      alt={recipe.title}
                      className={styles.recipeImage}
                    />
                    <div className={styles.recipeOverlay}>
                      <h2 id={`title-${recipe.id}`} className={styles.recipeTitle}>
                        {recipe.title}
                      </h2>
                      <p className={styles.recipeDescription}>{recipe.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Watched element for infinite scrolling */}
        <div
          ref={sentinelRef}
          style={{
            height: 20,
            margin: '20px 0',
            textAlign: 'center',
            fontSize: '14px',
            color: '#666',
          }}
        >
          {loadingMore ? 'Loading more recipes...' : ''}
        </div>
      </section>
    </main>
  );
};

export default RecipesSearch;
