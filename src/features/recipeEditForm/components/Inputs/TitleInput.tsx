type TitleInputProps = {
	title: string;
	onChange: (e: string) => void;
};

const TitleInput: React.FC<TitleInputProps> = ({ title, onChange }) => {
	return (
		<div>
			<label className="block text-lg font-semibold mb-1" htmlFor="title">
				Title
			</label>

			<input
				id="title"
				type="text"
				placeholder="e.g. Pasta Carbonara"
				className="w-full border rounded px-3 py-2"
				value={title}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
};

export default TitleInput;
