import { useState } from "react";
import type { Category as CategoryType } from "../../../../shared/models/enum_utils";
import { Category } from "../../../../shared/models/enum_utils";

type CategoryInputProps = {
	onChange: (category: CategoryType) => void;
};

const CategoryInput: React.FC<CategoryInputProps> = ({ onChange }) => {
	const [query, setQuery] = useState<string>("");
	const options = Object.values(Category) as CategoryType[];

	const trySubmit = (value: string) => {
		const trimmed = value.trim();
		if (!trimmed) return false;
		const match = options.find((o) => o === trimmed);
		if (match) {
			onChange(match);
			setQuery("");
			return true;
		}
		return false;
	};

	return (
		<div>
			<input
				id="category"
				list="category-list"
				type="text"
				placeholder="Search categories..."
				className="w-full border rounded px-3 py-2"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onBlur={(e) => trySubmit(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						trySubmit(query);
					}
				}}
			/>

			<datalist id="category-list">
				{options.map((option) => (
					<option key={option} value={option} />
				))}
			</datalist>
		</div>
	);
};

export default CategoryInput;
