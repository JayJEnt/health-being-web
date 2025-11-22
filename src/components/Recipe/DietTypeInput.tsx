import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState } from 'react';

import { dietApi } from '../../api/endpoints/public/diet';
import type { DietResponse } from '../../api/models/diet';
import type { RecipeCreate } from '../../api/models/recipe';
import { useDebouncedSearch } from '../../hooks/useDebounceSearchParams';
import type { RecipeEditPayload } from '../../pages/Recipe';

type Props<T extends RecipeCreate | RecipeEditPayload> = {
  recipe: T;
  setRecipe: Dispatch<SetStateAction<T>>;
};

const DietTypeInput = <T extends RecipeCreate | RecipeEditPayload>({
  recipe,
  setRecipe,
}: Props<T>) => {
  const [newDietType, setNewDietType] = useState<string>('');

  const fetchDiet = useCallback(async (q: string, signal: AbortSignal) => {
    return dietApi.getByName(q, signal);
  }, []);

  const { data, loading, error } = useDebouncedSearch<DietResponse>({
    query: newDietType,
    fetcher: fetchDiet,
    delay: 300,
    minLength: 1,
  });

  const addDietType = (diet: DietResponse) => {
    setRecipe({
      ...recipe,
      diet: [...(recipe.diet ?? []), diet],
    });
    setNewDietType('');
  };

  const removeDietType = (index: number) => {
    setRecipe((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        diet: prev.diet?.filter((_, i) => i !== index) ?? [],
      };
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Diet Types</h2>

      <div className="flex flex-wrap gap-2 mb-3">
        {recipe.diet?.map((diet) => (
          <span
            key={diet.name}
            className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
          >
            {diet.name}
            <button
              type="button"
              onClick={() => removeDietType(recipe.diet?.indexOf(diet) ?? 0)}
              className="ml-2 text-blue-600 hover:text-blue-900 font-bold"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <div className="flex gap-2 relative">
        <input
          type="text"
          placeholder="Search diet type..."
          value={newDietType}
          onChange={(e) => setNewDietType(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
        />
      </div>

      {newDietType.trim() !== '' && (
        <div className="mt-2 border rounded shadow-sm max-h-60 overflow-auto bg-white">
          {loading && <div className="px-3 py-2 text-sm text-gray-500">Loading...</div>}
          {error && <div className="px-3 py-2 text-sm text-red-500">{error.message}</div>}
          {data && (
            <button
              type="button"
              onClick={() => addDietType(data)}
              className="block w-full text-left px-3 py-2 hover:bg-gray-100"
            >
              {data.name}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DietTypeInput;
