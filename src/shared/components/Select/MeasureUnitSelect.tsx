import React from "react";

import { MeasureUnit as MU } from "../../models/enum_utils";
import type { MeasureUnit } from "../../models/enum_utils";

type MeasureUnitSelectProps = {
    value: { measureUnit: MeasureUnit };
    onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const MeasureUnitSelect: React.FC<MeasureUnitSelectProps> = ({ value, onSelect }) => {
    return (
        <div className="flex flex-col gap-1 w-28">
            <label className="text-xs sm:text-sm font-medium text-slate-700" htmlFor="measure-unit">
                Measure unit
            </label>
            <select
                value={value.measureUnit ?? MU.unit}
                onChange={onSelect}
            >
                {(Object.values(MU) as MeasureUnit[]).map((u) => {
                    const label = u === MU.unit ? "unit" : u.replace(/\.$/, "");
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