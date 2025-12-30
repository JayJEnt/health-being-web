import CancelButton from "../../../../shared/components/Buttons/CancelButton";
import type { DietCreate } from "../../../../shared/models/diet";

type DietEditorListProps = {
	dietList: DietCreate[];
	onRemove: (index: number) => void;
};

const DietEditorList: React.FC<DietEditorListProps> = ({ dietList, onRemove }) => {
	return (
		<div className="flex flex-wrap gap-2">
			{dietList.map((diet, index) => (
				<span
					key={diet.name}
					className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
				>
					{diet.name}
					<CancelButton onClick={() => onRemove(index)} />
				</span>
			))}
		</div>
	);
};

export default DietEditorList;
