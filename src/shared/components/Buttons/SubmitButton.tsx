type Props = {
	onClick?: () => void;
	children?: React.ReactNode;
	className?: string;
	disabled?: boolean;
};

const SubmitButton: React.FC<Props> = ({
	onClick = () => {},
	children,
	className = "",
	disabled = false,
}) => {
	return (
		<button
			type="submit"
			onClick={onClick}
			className={`bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold px-6 py-2 rounded flex items-center justify-center ${className}`}
			disabled={disabled}
		>
			{children ? children : <p>"Submit"</p>}
		</button>
	);
};

export default SubmitButton;
