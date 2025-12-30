type Props = {
	onClick?: () => void;
	className?: string;
	disabled?: boolean;
};

const AddButton: React.FC<Props> = ({ onClick = () => {}, className = "", disabled = false }) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-slate-100 ${className}`}
			disabled={disabled}
		>
			Add
		</button>
	);
};

export default AddButton;
