import DietSearchInput from "../../../../shared/components/SearchInputs/DietSearchInput";
import type { DietCreate } from "../../../../shared/models/diet";
import DietEditorList from "../Lists/DietEditorList";

type DietEditFormProps = {
	dietList: DietCreate[];
	onChange: (dietList: DietCreate[]) => void;
};

const DietEditForm: React.FC<DietEditFormProps> = ({ dietList, onChange }) => {
	const addDiet = (diet: DietCreate) => {
		onChange([...dietList, diet]);
	};

	const removeDiet = (index: number) => {
		onChange(dietList.filter((_, i) => i !== index));
	};

	return (
		<div>
			<h2 className="text-xl font-semibold mb-2">Diets</h2>

			<DietEditorList dietList={dietList} onRemove={removeDiet} />

			<div className="mt-3">
				<DietSearchInput onSelect={addDiet} />
			</div>
		</div>
	);
};

export default DietEditForm;
