import type { Category } from "../../../../shared/models/enum_utils";
import CategoryInput from "../Inputs/CategoryInput";
import CategoryEditorList from "../Lists/CategoryEditorList";

type CategoryEditFormProps = {
	categoryList: Category[];
	onChange: (dietList: Category[]) => void;
};

const CategoryEditForm: React.FC<CategoryEditFormProps> = ({ categoryList, onChange }) => {
	const addCategory = (category: Category) => {
		onChange([...categoryList, category]);
	};

	const removeCategory = (index: number) => {
		onChange(categoryList.filter((_, i) => i !== index));
	};

	return (
		<div>
			<h2 className="text-xl font-semibold mb-2">Categories</h2>

			<CategoryEditorList categoryList={categoryList} onRemove={removeCategory} />

			<div className="mt-3">
				<CategoryInput onChange={addCategory}></CategoryInput>
			</div>
		</div>
	);
};

export default CategoryEditForm;
