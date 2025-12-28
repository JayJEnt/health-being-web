import {
	MeasureUnit,
	type MeasureUnit as MeasureUnitType,
} from "../../../../shared/models/enum_utils";

type MeasureUnitSelectProps = {
	value: { measureUnit: MeasureUnitType };
	onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const MeasureUnitSelect: React.FC<MeasureUnitSelectProps> = ({ value, onSelect }) => {
	return (
		<div className="flex flex-col gap-1 w-28">
			<label className="text-xs sm:text-sm font-medium text-slate-700" htmlFor="measure-unit">
				Measure unit
			</label>

			<select value={value.measureUnit ?? MeasureUnit.unit} onChange={onSelect}>
				{/* TODO: Change Measure units to reduce mapping complexity */}
				{(Object.values(MeasureUnit) as MeasureUnitType[]).map((u) => {
					const label = u === MeasureUnit.unit ? "unit" : u.replace(/\.$/, "");
					return (
						<option key={u || "unit"} value={u}>
							{label}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default MeasureUnitSelect;
