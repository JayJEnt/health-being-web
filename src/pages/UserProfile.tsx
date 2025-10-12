import { useEffect, useState } from 'react';

import { preferedDietTypeApi } from '../api/endpoints/user_role/prefered_diet_type';
import { preferedIngredientsApi } from '../api/endpoints/user_role/prefered_ingredients';
import { usersOwnerApi } from '../api/endpoints/user_role/users';
import type { ActivityLevel, Role, Silhouette } from '../api/models/enum_utils';
import {
  ActivityLevel as ActivityLevelValues,
  Silhouette as SilhouetteTypes,
} from '../api/models/enum_utils';
import type { PreferedRecipeTypeResponse } from '../api/models/prefered_diet_type';
import type { PreferedIngredientsResponse } from '../api/models/prefered_ingredients';
import type { User, UserCreate } from '../api/models/user';
import { useAuth } from '../auth/useAuth';
import PreferedDietTypesInput from '../components/User/PreferedDietTypesInput';
import PreferedIngredientInput from '../components/User/PreferedIngredientInput';

const UserProfile: React.FC = () => {
  const { user } = useAuth();

  const [personalData, setPersonalData] = useState<User | null>(null);
  const [preferedIngredients, setPreferedIngredients] = useState<PreferedIngredientsResponse[]>([]);
  const [preferedDietTypes, setPreferedDietTypes] = useState<PreferedRecipeTypeResponse[]>([]);

  const makeDefaultPersonalData = (
    id: number,
    username: string,
    email: string,
    role: Role,
  ): User => ({
    id: id,
    username: username,
    email: email,
    role: role,
    age: null,
    height: null,
    weight: null,
    silhouette: SilhouetteTypes.ectomorph as Silhouette,
    activity_level: ActivityLevelValues.light as ActivityLevel,
  });

  useEffect(() => {
    if (!user?.id) return;

    const load = async () => {
      try {
        const [pd, pi, dt] = await Promise.all([
          usersOwnerApi.get().catch(() => null),
          preferedIngredientsApi.getAll().catch(() => []),
          preferedDietTypeApi.getAll().catch(() => []),
        ]);

        setPersonalData(
          pd ?? makeDefaultPersonalData(user.id, user.username, user.email, user.role),
        );
        setPreferedIngredients(pi ?? []);
        setPreferedDietTypes(dt ?? []);
      } catch (e) {
        console.error(e);
        setPersonalData(makeDefaultPersonalData(user.id, user.username, user.email, user.role));
      }
    };

    void load();
  }, [user?.id]);

  const setData = <K extends keyof User>(name: K, value: User[K]) => {
    setPersonalData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const toNumOrNull = (v: string): number | null => (v.trim() === '' ? null : Number(v));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!personalData) return;

    const changedData: UserCreate = { ...personalData, password: 'pass' }; // added dummy password for pre-commit until we decide how to resolve this

    await usersOwnerApi.update(changedData);
  };

  const activityOptions = Object.values(ActivityLevelValues);
  const silhouetteOptions = Object.values(SilhouetteTypes);

  return (
    <form onSubmit={void handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">User Settings</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block font-medium mb-1">Age</label>
          <input
            type="number"
            value={personalData?.age ?? ''}
            onChange={(e) => setData('age', toNumOrNull(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Height (cm)</label>
          <input
            type="number"
            value={personalData?.height ?? ''}
            onChange={(e) => setData('height', toNumOrNull(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Weight (kg)</label>
          <input
            type="number"
            value={personalData?.weight ?? ''}
            onChange={(e) => setData('weight', toNumOrNull(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Activity Level</label>
        <select
          value={personalData?.activity_level ?? ''}
          onChange={(e) =>
            setData('activity_level', e.target.value ? (e.target.value as ActivityLevel) : null)
          }
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">— select —</option>
          {activityOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Body Type</label>
        <select
          value={personalData?.silhouette ?? ''}
          onChange={(e) =>
            setData('silhouette', e.target.value ? (e.target.value as Silhouette) : null)
          }
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">— select —</option>
          {silhouetteOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <PreferedIngredientInput
          preferedIngredients={preferedIngredients}
          setPreferedIngredients={setPreferedIngredients}
        />
        <PreferedDietTypesInput
          preferedDietTypes={preferedDietTypes}
          setPreferedDietTypes={setPreferedDietTypes}
        />
      </div>

      <div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
        >
          Save Settings
        </button>
      </div>
    </form>
  );
};

export default UserProfile;
