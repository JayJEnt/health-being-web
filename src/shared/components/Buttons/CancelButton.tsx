type Props = {
	onClick?: () => void;
	className?: string;
	disabled?: boolean;
};

const CancelButton: React.FC<Props> = ({
	onClick = () => {},
	className = "",
	disabled = false,
}) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`ml-2 font-bold px-2 rounded text-red-600 hover:text-red-800 disabled:text-gray-400 ${className}`}
			disabled={disabled}
		>
			×
		</button>
	);
};

export default CancelButton;
