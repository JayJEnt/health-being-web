type DescriptionInputProps = {
	description: string;
	onChange: (e: string) => void;
};

const DescriptionInput: React.FC<DescriptionInputProps> = ({ description, onChange }) => {
	return (
		<div>
			<label className="block text-lg font-semibold mb-1" htmlFor="description">
				Description
			</label>

			<textarea
				id="description"
				rows={4}
				placeholder="Write a short description..."
				className="w-full border rounded px-3 py-2"
				value={description}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
};

export default DescriptionInput;
