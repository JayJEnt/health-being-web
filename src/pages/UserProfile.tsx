import { useEffect, useState } from "react";
import type { PersonalData, PersonalDataCreate } from "../types/personal_data";
import { useAuth } from "../auth/useAuth";
import { api } from "../api/api";
import { settings } from "../config";
import type { PreferedIngredients } from "../types/prefered_ingredients";
import PreferedIngredientInput from "../components/User/PreferedIngredientInput";
const UserProfile: React.FC = () => {
    const { user } = useAuth();

    // Dane z modeli
    const [personalData, setPersonalData] = useState<PersonalData | null>(null);
    const [preferedIngredients, setPreferedIngredients] = useState<
        PreferedIngredients[]
    >([]);
    useEffect(() => {
        if (!user?.id) return;

        (async () => {
            try {
                const personalDataUrl = `${settings.API_BASE_URL}${settings.USERSDATA_BASE_ENDPOINT}${user.id}`;
                const personalDataResponse =
                    await api.get<PersonalData>(personalDataUrl);

                if (personalDataResponse) setPersonalData(personalDataResponse);

                const preferedIngredientsUrl = `${settings.API_BASE_URL}${settings.PREFERED_INGREDIENTS_ENDPOINT}`;
                const preferedIngredientsReponse = await api.get<PreferedIngredients[]>(
                    preferedIngredientsUrl,
                );
                if (preferedIngredientsReponse) {
                    setPreferedIngredients(preferedIngredientsReponse);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    }, [user?.id]);

    const setData = <K extends keyof PersonalData>(
        name: K,
        value: PersonalData[K],
    ) => {
        setPersonalData((prev) => (prev ? { ...prev, [name]: value } : prev));
    };

    const toNumOrNull = (v: string): number | null =>
        v.trim() === "" ? null : Number(v);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!personalData) return;
        try {
            const changedData: PersonalDataCreate = personalData;
            const res = await api.put<PersonalData>(
                `${settings.API_BASE_URL}${settings.USERSDATA_BASE_ENDPOINT}${personalData?.user_id}`,
                changedData,
            );
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

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
                    onChange={(e) => setData("activity_level", e.target.value || null)}
                    className="w-full border px-3 py-2 rounded"
                >
                    <option value="Inactive">Inactive</option>
                    <option value="lightly active">Lightly Active</option>
                    <option value="moderately active">Moderately Active</option>
                    <option value="very active">Very Active</option>
                    <option value="super active">Super Active</option>
                </select>
            </div>

            <div>
                <label className="block font-medium mb-1">Body Type</label>
                <select
                    value={personalData?.silhouette ?? ""}
                    onChange={(e) => setData("silhouette", e.target.value || null)}
                    className="w-full border px-3 py-2 rounded"
                >
                    <option value="ectomorph">Ectomorph</option>
                    <option value="mesomorph">Mesomorph</option>
                    <option value="endomorph">Endomorph</option>
                </select>
            </div>

            <div>
                <PreferedIngredientInput
                    preferedIngredients={preferedIngredients}
                    setPreferedIngredients={setPreferedIngredients}
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
