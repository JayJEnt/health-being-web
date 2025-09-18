import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { api } from "../api/api";
import { settings } from "../config";
import type { PreferedIngredientsGet } from "../types/prefered_ingredients";
import PreferedIngredientInput from "../components/User/PreferedIngredientInput";
import type { PreferedRecipeTypeGet } from "../types/prefered_diet_type";
import PreferedDietTypesInput from "../components/User/PreferedDietTypesInput";
import type { ActivityLevel, Silhouette } from "../types/enum_utils";
import {
    Silhouette as SilhouetteTypes,
    ActivityLevel as ActivityLevelValues,
} from "../types/enum_utils";
import type { UserData, UserDataCreate } from "../types/user_data";
import type { AxiosError } from "axios";

const UserProfile: React.FC = () => {
    const { user } = useAuth();

    const [personalData, setPersonalData] = useState<UserData | null>(null);
    const [preferedIngredients, setPreferedIngredients] = useState<
        PreferedIngredientsGet[]
    >([]);
    const [preferedDietTypes, setPreferedDietTypes] = useState<
        PreferedRecipeTypeGet[]
    >([]);

    const makeDefaultPersonalData = (uid: number): UserData => ({
        user_id: uid,
        age: null,
        height: null,
        weight: null,
        silhouette: SilhouetteTypes.ectomorph as Silhouette,
        activity_level: ActivityLevelValues.light as ActivityLevel,
    });

    useEffect(() => {
        if (!user?.id) return;

        (async () => {
            try {
                const personalDataUrl = `${settings.API_BASE_URL}${settings.USERSDATA_BASE_ENDPOINT}${user.id}`;
                const preferedIngredientsUrl = `${settings.API_BASE_URL}${settings.PREFERED_INGREDIENTS_ENDPOINT}`;
                const preferedDietTypesUrl = `${settings.API_BASE_URL}${settings.PREFERED_DIET_TYPES_ENDPOINT}`;

                const [pd, pi, dt] = await Promise.all([
                    api.get<UserData>(personalDataUrl).catch(() => null),
                    api
                        .get<PreferedIngredientsGet[]>(preferedIngredientsUrl)
                        .catch(() => []),
                    api
                        .get<PreferedRecipeTypeGet[]>(preferedDietTypesUrl)
                        .catch(() => []),
                ]);

                if (pd) {
                    setPersonalData(pd);
                } else {
                    setPersonalData(makeDefaultPersonalData(user.id));
                }

                setPreferedIngredients(pi ?? []);
                setPreferedDietTypes(dt ?? []);
            } catch (e) {
                console.error(e);
                setPersonalData(makeDefaultPersonalData(user.id));
            }
        })();
    }, [user?.id]);

    const setData = <K extends keyof UserData>(name: K, value: UserData[K]) => {
        setPersonalData((prev) => (prev ? { ...prev, [name]: value } : prev));
    };

    const toNumOrNull = (v: string): number | null =>
        v.trim() === "" ? null : Number(v);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!personalData) return;

        try {
            const changedData: UserDataCreate = personalData;

            await api.put<UserData>(
                `${settings.API_BASE_URL}${settings.USERSDATA_BASE_ENDPOINT}`,
                changedData,
            );
        } catch (err) {
            const error = err as AxiosError;

            if (error.response?.status === 404) {
                try {
                    const changedData: UserDataCreate = personalData;
                    await api.postJson<UserData>(
                        `${settings.API_BASE_URL}${settings.USERSDATA_BASE_ENDPOINT}`,
                        changedData,
                    );
                } catch (postErr) {
                    const postError = postErr as AxiosError;
                    console.error("POST after 404 failed:", postError.message);
                }
            } else {
                console.error("PUT failed:", error.message);
            }
        }
    };

    const activityOptions = Object.values(ActivityLevelValues);
    const silhouetteOptions = Object.values(SilhouetteTypes);

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
            <h2 className="text-2xl font-bold">User Settings</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label className="block font-medium mb-1">Age</label>
                    <input
                        type="number"
                        value={personalData?.age ?? ""}
                        onChange={(e) => setData("age", toNumOrNull(e.target.value))}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Height (cm)</label>
                    <input
                        type="number"
                        value={personalData?.height ?? ""}
                        onChange={(e) => setData("height", toNumOrNull(e.target.value))}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Weight (kg)</label>
                    <input
                        type="number"
                        value={personalData?.weight ?? ""}
                        onChange={(e) => setData("weight", toNumOrNull(e.target.value))}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>
            </div>

            <div>
                <label className="block font-medium mb-1">Activity Level</label>
                <select
                    value={personalData?.activity_level ?? ""}
                    onChange={(e) =>
                        setData(
                            "activity_level",
                            (e.target.value
                                ? (e.target.value as ActivityLevel)
                                : null) as ActivityLevel | null,
                        )
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
                    value={personalData?.silhouette ?? ""}
                    onChange={(e) =>
                        setData(
                            "silhouette",
                            (e.target.value
                                ? (e.target.value as Silhouette)
                                : null) as Silhouette | null,
                        )
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
