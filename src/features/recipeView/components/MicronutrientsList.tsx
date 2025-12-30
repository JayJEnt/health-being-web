import type { MicronutrientsTotal } from "../../../shared/models/utils";

type MicronutrientsTotalProps = {
	micronutrientsList: MicronutrientsTotal;
};

const Row: React.FC<{ label: string; value: number; unit: string }> = ({ label, value, unit }) => (
	<div className="flex justify-between items-center py-1">
		<span className="text-sm text-slate-600">{label}</span>
		<span className="text-sm font-medium text-slate-900">
			{value} {` ${unit}`}
		</span>
	</div>
);

const MicronutrientsList: React.FC<MicronutrientsTotalProps> = ({ micronutrientsList }) => {
	const micro = micronutrientsList;

	return (
		<div className="w-full max-w-sm bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-lg p-3 shadow-sm">
			<h2 className="text-xl font-semibold mb-2">Micronutrients</h2>

			<div className="grid grid-cols-2 gap-x-4 gap-y-1">
				<div>
					<Row label="Calories" value={micro.calories} unit="kcal" />
					<Row label="Protein" value={micro.protein} unit="g" />
					<Row label="Fat" value={micro.fat} unit="g" />
				</div>
				<div>
					<Row label="Carbs" value={micro.carbon} unit="g" />
					<Row label="Fiber" value={micro.fiber} unit="g" />
					<Row label="Sugar" value={micro.sugar} unit="g" />
					<Row label="Salt" value={micro.salt} unit="g" />
				</div>
			</div>
		</div>
	);
};

export default MicronutrientsList;
