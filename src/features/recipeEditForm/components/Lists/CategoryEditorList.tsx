import CancelButton from "../../../../shared/components/Buttons/CancelButton";
import type { Category } from "../../../../shared/models/enum_utils";

type CategoryEditorListProps = {
	categoryList: Category[];
	onRemove: (index: number) => void;
};

const CategoryEditorList: React.FC<CategoryEditorListProps> = ({ categoryList, onRemove }) => {
	return (
		<div className="flex flex-wrap gap-2">
			{categoryList.map((category, index) => (
				<span
					key={category}
					className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
				>
					{category}
					<CancelButton onClick={() => onRemove(index)} />
				</span>
			))}
		</div>
	);
};

export default CategoryEditorList;
