import type { DietCreate } from "../../models/diet";
import GenericButton from "../Generic/Button";

type DietListProps = {
	diets: DietCreate[];
	onRemove: (index: number) => void;
};

const DietList: React.FC<DietListProps> = ({ diets, onRemove }) => {
	return (
		<div className="flex flex-wrap gap-2">
			{diets.map((diet, index) => (
				<span
					key={diet.name}
					className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
				>
					{diet.name}
					<GenericButton type="cancel" onClick={() => onRemove(index)} />
				</span>
			))}
		</div>
	);
};

export default DietList;
