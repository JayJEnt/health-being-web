import { useState } from "react";

const dietOptions = [
  "wegetariańska",
  "wegańska",
  "niskowęglowodanowa",
  "keto",
  "standardowa",
];
const allergyOptions = ["orzechy", "laktoza", "gluten", "jaja", "ryby"];
const genderOptions = ["mężczyzna", "kobieta", "inne"];
const goalOptions = ["utrata masy", "utrzymanie", "przyrost masy"];

const UserProfile: React.FC = () => {
  const [age, setAge] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [gender, setGender] = useState<string>("");
  const [dietType, setDietType] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [goal, setGoal] = useState<string>("");

  const toggleSelection = (
    value: string,
    list: string[],
    setList: (v: string[]) => void,
  ) => {
    setList(
      list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      age,
      height,
      weight,
      gender,
      dietType,
      allergies,
      goal,
    };
    console.log("Wysłane dane użytkownika:", data);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Ustawienia użytkownika</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block font-medium mb-1">Wiek</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Wzrost (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Waga (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Płeć</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">-- Wybierz --</option>
          {genderOptions.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">
          Preferencje dietetyczne
        </label>
        <div className="flex flex-wrap gap-2">
          {dietOptions.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => toggleSelection(option, dietType, setDietType)}
              className={`px-3 py-1 rounded-full text-sm border ${
                dietType.includes(option)
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Alergie</label>
        <div className="flex flex-wrap gap-2">
          {allergyOptions.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => toggleSelection(option, allergies, setAllergies)}
              className={`px-3 py-1 rounded-full text-sm border ${
                allergies.includes(option)
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Cel</label>
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">-- Wybierz --</option>
          {goalOptions.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
        >
          Zapisz ustawienia
        </button>
      </div>
    </form>
  );
};

export default UserProfile;
