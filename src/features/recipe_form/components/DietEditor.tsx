import DietList from "../../../shared/components/Diet/DietList";
import DietSearchInput from "../../../shared/components/Diet/DietSearchInput";

import type { DietCreate } from "../../../shared/models/diet";

type DietsEditorProps = {
	dietList: DietCreate[];
	onChange: (dietList: DietCreate[]) => void;
};

const DietsEditor = ({ dietList, onChange }: DietsEditorProps) => {
	const addDietType = (diet: DietCreate) => {
		onChange([...dietList, diet]);
	};

	const removeDietType = (index: number) => {
		onChange(dietList.filter((_, i) => i !== index));
	};

	return (
		<div>
			<h2 className="text-xl font-semibold mb-2">Diets</h2>

			<DietList diets={dietList} onRemove={removeDietType} />

			<div className="mt-3">
				<DietSearchInput onSelect={addDietType} />
			</div>
		</div>
	);
};

export default DietsEditor;
