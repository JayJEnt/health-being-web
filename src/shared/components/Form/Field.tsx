import type { FC } from "react";

type Props = {
	label: string;
	value: string;
	onChange: (v: string) => void;
	type?: string;
	placeholder?: string;
	autoComplete?: string;
};

const Field: FC<Props> = ({ label, value, onChange, type = "text", placeholder, autoComplete }) => (
	<label className="block">
		<span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
		<input
			type={type}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder}
			autoComplete={autoComplete}
			className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
		/>
	</label>
);

export default Field;
